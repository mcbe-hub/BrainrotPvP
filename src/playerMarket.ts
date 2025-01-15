import * as server from '@minecraft/server'
import { ActionFormResponse, ModalFormData } from '@minecraft/server-ui'
import { ChestFormData } from './chestForm/forms'
import { get } from 'http'
import { getPolishItemName } from 'itemIdToPolish'
import { getMoney, payMoney } from 'buyShop'
import { addMoney } from 'main'
import { forceShow } from 'chat'

const world = server.world

interface IExchangeItem {
    itemId: string
    sellerId: string
    itemName?: string
    sellerName: string
    price: number
    lore: string[]
    amount: number
    listDate: number
    properties: { key: string, value: string | number | boolean | server.Vector3 }[]
    enchants?: {level: number, type: string}[]
}

interface IPayout {
    id: string
    amount: number
}
export function playerExchangeUi(player: server.Player, page: number = 0, items: IExchangeItem[] = fetchItems(), playerItems: boolean = false) {
    if(page == 0) payout(player)
    const ui = new ChestFormData("double")
    .pattern(["", "", "", "", "", "_________"], {_:{itemName: "", itemDesc: [], stackSize: 1, enchanted: false, texture: "textures/blocks/glass_green.png"}})
    if (page > 0) {
        ui.button(45, "§cPoprzednia Strona", ["§7Kliknij, aby przejść do poprzedniej strony"], "minecraft:red_dye", page)
    }
    if (items.length > 44 && items.length > (page + 1) * 44) {
        ui.button(53, "§aNastępna Strona", ["§7Kliknij, aby przejść do następnej strony"], "minecraft:lime_dye", page)
    }
    ui.button(47, "§6Wystaw Item!", ["§7Wystaw ten item, który obecnie trzymasz!"], "minecraft:hopper")
    if (playerItems) {
        ui.button(51, "§bWszystkie Itemy!", ["§7Zobacz wszystkie itemy!"], "minecraft:chest")
    } else {
        ui.button(51, "§bTwoje Itemy!", ["§7Zobacz wystawione przez siebie itemy!"], "minecraft:ender_chest")
    }
    let slot = 0
    const pageMultiplier = (page * 44)
    for (let i = 0 + pageMultiplier; i < pageMultiplier + 45 && i < items.length; i++) {
        const item = items[i]
        const desc = getItemLore(item)
        ui.button(slot, getItemName(item), desc, getItemTexture(item.itemId), item.amount, isEnchanted(item))
        slot++
    }
    forceShow(ui, player).then((data: ActionFormResponse) => {
        if (data.canceled) return
        const selection = data.selection
        if (selection < 44) {
            const item = items[selection + pageMultiplier]
            if (playerItems || item.sellerId == player.id) {
                manageListing(player, item)
            } else {
                buyItem(player, item)
            }
        } else {
            switch (selection) {
                case 45:
                    if (page > 0) playerExchangeUi(player, page - 1, items)
                    break;
                case 53:
                    if (items.length > 44) playerExchangeUi(player, page + 1, items)
                    break;
                case 47:
                    listItem(player)
                    break;
                case 51:
                    if (playerItems) {
                        playerExchangeUi(player)
                    } else {
                        playerExchangeUi(player, 0, getPlayerItems(player.id), true)
                    }
                    break;
                default:
                    playerExchangeUi(player, page)
                    break;
            }
        }
    })
}

function listItem(player: server.Player) {
    const equippable = player.getComponent("equippable")
    const item = equippable.getEquipment(server.EquipmentSlot.Mainhand)
    if (item) {
        const ui = new ModalFormData()
        ui.title("§l§6Wystawianie itemu")
        ui.textField("§l§aCena", "0", "0")
        ui.show(player).then(data => {
            if(data.canceled) return
            const price = parseInt(data.formValues[0] as string)
            const properties: { key: string, value: string | number | boolean | server.Vector3 }[] = []
            item.getDynamicPropertyIds().forEach(id => {
                properties.push({ key: id, value: item.getDynamicProperty(id) })
            })
            const exchangeItem: IExchangeItem = {
                itemId: item.typeId,
                sellerId: player.id,
                sellerName: player.name,
                price: price,
                lore: item.getLore(),
                amount: item.amount,
                listDate: Date.now(),
                properties: properties
            }
            if(item.nameTag) exchangeItem.itemName = item.nameTag
            if(item.hasComponent("enchantable")) {
                const enchant = item.getComponent("enchantable")
                const enchants = enchant.getEnchantments()
                const customEnchants = []
                for(const enchantment of enchants) {
                    customEnchants.push({level: enchantment.level, type: enchantment.type.id})
                }
                exchangeItem.enchants = customEnchants
            }
            const ui = new ChestFormData("27")
            .title("Potwierdzenie Wystawienia")
            .pattern(["_________", "", "_________"], {_:{itemName: "", itemDesc: [], stackSize: 1, enchanted: false, texture: "textures/blocks/glass_green.png"}})
                .button(13, getItemName(exchangeItem), getItemLore(exchangeItem), item.typeId, item.amount, isEnchanted(exchangeItem))
                .button(11, "§aWystaw!", ["§7Kliknij, aby wystawić item za cenę §a" + price + "§7!"], "minecraft:lime_dye")
                .button(15, "§cAnuluj", ["§7Kliknij, aby anulować wystawianie itemu."], "minecraft:red_dye")
            ui.show(player).then(data => {
                if(data.canceled) return
                if(data.selection == 11) {
                    const items = fetchItems()
                    items.push(exchangeItem)
                    saveItems(items)
                    player.sendMessage("§aItem został wystawiony za cenę " + price)
                    equippable.setEquipment(server.EquipmentSlot.Mainhand, undefined)
                }
            })
        })
    } else {
        player.sendMessage("§cMusisz trzymać item w ręce aby go wystawić!")
    }
}

function getItemLore(item: IExchangeItem) {
    const desc: string[] = []
    desc.push(...item.lore)
    if (item.enchants && item.enchants.length > 0) {
        desc.push("")
        item.enchants.forEach(enchant => {
            desc.push(`§d${enchant.type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}: §5§l${toRomanNumerals(enchant.level)}`);
        })
    }
    desc.push("")
    desc.push(`§7Ilość: §a${item.amount}`)
    desc.push(`§7Cena: §a${item.price}`)
    desc.push(`§7Sprzedaje: §a${item.sellerName}`)
    desc.push(`§7Data wystawienia: §a${new Date(item.listDate).toLocaleString("pl-PL")}`)
    return desc
}

function isEnchanted(item: IExchangeItem) {
    return item.enchants && item.enchants.length > 0
}

function buyItem(player: server.Player, item: IExchangeItem) {
    const money = getMoney(player)
    if (money < item.price) {
        player.sendMessage("§cNie masz wystarczająco pieniędzy!")
        return
    }
    const ui = new ChestFormData("27")
    .title("Potwierdzenie Zakupu")
    .pattern(["_________", "", "_________"], {_:{itemName: "", itemDesc: [], stackSize: 1, enchanted: false, texture: "textures/blocks/glass_green.png"}})
    .button(13, getItemName(item), getItemLore(item), item.itemId, item.amount, isEnchanted(item))
    .button(11, "§aKup!", ["§7Kliknij, aby kupić item za cenę §a" + item.price + "§7!"], "minecraft:lime_dye")
    .button(15, "§cAnuluj", ["§7Kliknij, aby anulować zakup itemu."], "minecraft:red_dye")
    ui.show(player).then(data => {
        if(data.canceled) return
        if(data.selection == 11) {
            const items = fetchItems()
            const index = items.findIndex(i => i.sellerId === item.sellerId && i.listDate === item.listDate)
            if (index !== -1) {
                items.splice(index, 1)
            } else {
                player.sendMessage("§cPrzedmiot został już zakupiony!")
                return
            }
            payMoney(player, item.price)
            saveItems(items)
            world.sendMessage(`§a${player.name} §7kupił(a) od §a${item.sellerName} §7item §a${getItemName(item)} §7za §a${item.price}§7!`)
            player.getComponent("inventory").container.addItem(turnIntoItemStack(item))
            player.sendMessage("§aItem został zakupiony!")
            const seller = server.world.getEntity(item.sellerId) as server.Player
            if(seller) {
                seller.sendMessage(`§aSprzedałeś(aś) item §a${getItemName(item)} §7za §a${item.price}§7!`)
                addMoney(seller, item.price)
            } else {
                addPayout({id: item.sellerId, amount: item.price})
            }
        }
    })
}

function getPayouts(){
    const property = world.getDynamicProperty("payouts") as string
    let payouts: IPayout[] = []
    if(property) payouts = JSON.parse(property)
    return payouts
}

function savePayouts(payouts: IPayout[]){
    world.setDynamicProperty("payouts", JSON.stringify(payouts))
}

function addPayout(payout: IPayout){
    const payouts = getPayouts()
    payouts.push(payout)
    savePayouts(payouts)
}

function payout(player: server.Player){
    const id = player.id
    const payouts = getPayouts()
    let totalPayout = 0
    for(const payout of payouts){
        if(payout.id == id){
            totalPayout += payout.amount
            payouts.splice(payouts.indexOf(payout), 1)
        }
    }
    if(totalPayout > 0){
        addMoney(player, totalPayout)
        player.sendMessage(`§aOtrzymałeś(aś) wypłatę za sprzedane itemy w wysokości §a${totalPayout}§a!`)
    } else {
        player.sendMessage("§7Nie masz żadnych wypłat do odebrania!")
    }
}

function manageListing(player: server.Player, item: IExchangeItem) {
    if(item.sellerId != player.id) {
        player.sendMessage("§cNie możesz zarządzać itemem, który nie jest twój!")
        return
    }
    const ui = new ChestFormData("27")
    .title("Zarządzanie Itemem")
    .pattern(["_________", "", "_________"], {_:{itemName: "", itemDesc: [], stackSize: 1, enchanted: false, texture: "textures/blocks/glass_green.png"}})
    .button(13, getItemName(item), getItemLore(item), item.itemId, item.amount, isEnchanted(item))
    .button(11, "§aUsuń!", ["§7Kliknij, aby usunąć item z listy!"], "minecraft:lime_dye")
    .button(15, "§cAnuluj", ["§7Kliknij, aby anulować zarządzanie itemem."], "minecraft:red_dye")
    ui.show(player).then(data => {
        if(data.canceled) return
        if(data.selection == 11) {
            const inv = player.getComponent("inventory").container
            if(inv.emptySlotsCount > 1) {
                const items = fetchItems()
                inv.addItem(turnIntoItemStack(item))
                const index = items.findIndex(i => i.sellerId === player.id && i.listDate === item.listDate)
                if (index !== -1) {
                    items.splice(index, 1)
                }
                saveItems(items)
                player.sendMessage("§aItem został usunięty z listy!")
            } else {
                player.sendMessage("§cNie masz miejsca w ekwipunku na ten item!")
            }
        }
    })
}

function turnIntoItemStack(exchangeItem: IExchangeItem){
    const item = new server.ItemStack(exchangeItem.itemId, exchangeItem.amount)
    item.setLore(exchangeItem.lore)
    exchangeItem.properties.forEach(prop => {
        item.setDynamicProperty(prop.key, prop.value)
    })
    if(exchangeItem.enchants) {
        const enchantable = item.getComponent("enchantable")
        if (item.hasComponent("enchantable")) {
            exchangeItem.enchants.forEach(enchant => {
                enchantable.addEnchantment({level: enchant.level, type: new server.EnchantmentType(enchant.type)})
            })
        }
    }
    if(exchangeItem.itemName) item.nameTag = exchangeItem.itemName
    return item
}

function getItemName(item: IExchangeItem) {
    if(item.itemName) return item.itemName
    const polishName = getPolishItemName(item.itemId)
    return polishName
}

function getPlayerItems(id: string, items: IExchangeItem[] = fetchItems()) {
    return items.filter(x => x.sellerId == id)
}


function fetchItems() {
    const itemArray: IExchangeItem[] = []
    for (const id of server.world.getDynamicPropertyIds()) {
        const split = id.split(";")
        if (split[0] == "exchange") {
            itemArray.push(...(JSON.parse(world.getDynamicProperty(id) as string) as IExchangeItem[]))
        }
    }
    return itemArray.sort((a, b) => b.listDate - a.listDate)
}

function saveItems(items: IExchangeItem[]) {
    for (const id of world.getDynamicPropertyIds()) {
        if (id.includes("exchange")) world.setDynamicProperty(id, undefined)
    }
    let cnt = 1
    while (items.length > 10 && items.length > 0) {
        const arr = items.splice(items.length - 10)
        world.setDynamicProperty("exchange;" + cnt, JSON.stringify(arr))
        cnt++
    }
    world.setDynamicProperty("exchange;" + cnt, JSON.stringify(items))
}

function toRomanNumerals(num: number): string {
    const romanMap: { [key: number]: string } = {
        1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
        6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X"
    };
    return romanMap[num] || num.toString();
}

function getItemTexture(id: string){
    if(id.includes("minecraft:")) return id
    const textureMap: { [key: string]: string } = {
        "rot:artefakt_kameramena": "textures/items/artefakt_kameramana.png",
        "custom:item2": "textures/items/custom_item2.png",
    };

    return textureMap[id] || "textures/items/default.png";
}