import * as server from '@minecraft/server'
import { ActionFormData, ModalFormData } from '@minecraft/server-ui'
import { addMoney } from 'main'

interface ShopItem {
    name: string
    id: string
    price: number
    icon: string
}

const items: ShopItem[] = [
    { name: 'Diamond', id: 'minecraft:diamond', price: 30, icon: 'textures/items/diamond' },
    { name: 'Emerald', id: 'minecraft:emerald', price: 20, icon: 'textures/items/emerald' },
    { name: 'Żelazo', id: 'minecraft:iron_ingot', price: 5, icon: 'textures/items/iron_ingot' },
    { name: 'Złoto', id: 'minecraft:gold_ingot', price: 10, icon: 'textures/items/gold_ingot' },
    { name: 'Netherite Scrap', id: 'minecraft:netherite_scrap', price: 5000, icon: 'textures/items/netherite_scrap' },
]


export function sellShopUi(player: server.Player) {
    const ui = new ActionFormData()
    .title('Sklep')
    
    for(const item of items) {
        ui.button(`${item.name} §8- §2${item.price}§l$`, item.icon)
    }
    ui.show(player).then((data) => {
        if(!data.canceled){
            const item = items[data.selection]
            sellItem(player, item)
        }
    })
}

function sellItem(player: server.Player, item: ShopItem) {
    const itemId = item.id
    const price = item.price
    const itemCnt = countItem(player, itemId)
    const ui = new ModalFormData()
    .title('Sprzedaż')
    .slider('Ilość', 1, itemCnt, 1, 0)
    .show(player).then((data) => {
        if(!data.canceled) {
            const amount = data.formValues[0] as number
            if(amount>itemCnt){
                player.sendMessage('Nie masz tyle tego przedmiotu')
                sellShopUi(player)
                return
            }
            const money = amount * price
            clearAmountOfItem(player, item.id, amount)
            player.sendMessage(`§aSprzedałeś §f${amount} ${item.name} §aza §l§6${money}$`) // Green bold text, white amount, gold money
            addMoney(player, money)
            sellShopUi(player)
        }
    })
}


function clearAmountOfItem(player: server.Player, item: string, amount: number) {
                    // @ts-ignore

    const inventory = player.getComponent("inventory").container
    for(let i = 0; i<inventory.size; i++) {
        const slot = inventory.getSlot(i)
        if(!slot.hasItem()) continue
        if(slot.getItem().typeId === item) {
            if(slot.amount <= amount) {
                amount -= slot.amount
                slot.setItem()
            } else {
                slot.amount -= amount
                break
            }
        }
    }
}

function countItem(player: server.Player, item: string): number {
                    // @ts-ignore

    const inventory = player.getComponent("inventory").container
    let count = 0
    for(let i = 0; i<inventory.size; i++) {
        const slot = inventory.getSlot(i)
        if(slot.hasItem() && slot.getItem().typeId === item) {
            count += slot.amount
        }
    }
    return count
}