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
    { name: 'Złote Jabłko', id: 'minecraft:golden_apple', price: 10000, icon: 'textures/items/apple_golden' },
    { name: 'Obsydian', id: 'minecraft:obsidian', price: 2500, icon: 'textures/blocks/obsidian' },
    { name: 'Kryształy Endu', id: 'minecraft:end_crystal', price: 15000, icon: 'textures/items/end_crystal' },
    { name: 'Totem', id: 'minecraft:totem_of_undying', price: 100000, icon: 'textures/items/totem' },
    { name: 'Złote Jabłko Enchant', id: 'minecraft:enchanted_golden_apple', price: 100000, icon: 'textures/items/apple_golden' }
]

export function buyShopUi(player: server.Player) {
    const ui = new ActionFormData()
        .title('Sklep')

    for (const item of items) {
        const number = item.price

const formattedNumber = formatNumber(number)

        ui.button(`${item.name} §8- §2${formattedNumber}§l$`, item.icon)
    }
    ui.show(player).then((data) => {
        if (!data.canceled) {
            const item = items[data.selection]
            buyItem(player, item)
        }
    })
}

const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};




function buyItem(player: server.Player, item: ShopItem) {
    const maxAmountToBuy = Math.floor(getMoney(player) / item.price)
    const ui = new ModalFormData()
        .title('Kupno - ' + item.name)
        .slider('Ilość', 1, Math.min(64, maxAmountToBuy), 1, 0)
        .show(player).then((data) => {
            if (!data.canceled) {

                const amount = data.formValues[0] as number
                const price = amount * item.price
                if (payMoney(player, price)) {
                    // @ts-ignorets
                    player.getComponent("inventory").container.addItem(new server.ItemStack(item.id, amount))
                    player.sendMessage(`§aZakupiłeś §f${amount} ${item.name} §aza §l§6${price}$`) // Green bold text, white amount, gold money
                } else {
                    player.sendMessage('§cNie masz tyle pieniędzy')
                }
                buyShopUi(player)
            }
        })
}

export function getMoney(player: server.Player): number {
    return player.getDynamicProperty("money") as number
}

export function payMoney(player: server.Player, amount: number): boolean {
    const money = getMoney(player)
    if (money >= amount) {
        player.setDynamicProperty("money", money - amount)
        return true
    }
    return false
}