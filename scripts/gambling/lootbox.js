import * as server from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';
import * as items from '../enchantedItems';
import { getPolishItemName } from 'itemIdToPolish';
const randomizationArray = [];
for (let i = 0; i < 75; i++) {
    randomizationArray.push(1);
}
for (let i = 0; i < 20; i++) {
    randomizationArray.push(2);
}
for (let i = 0; i < 150; i++) {
    randomizationArray.push(3);
}
export function openLootBox(player) {
    new ActionFormData()
        .title('Lootbox')
        .body('Lootboxy')
        .button('Otwórz')
        .button('Anuluj')
        .show(player).then((data) => {
        const onScreenDisplay = player.onScreenDisplay;
        if (data.canceled) {
            return;
        }
        if (data.selection != 0) {
            return;
        }
        const shuffledArray = [...randomizationArray].sort(() => Math.random() - 0.5);
        onScreenDisplay.setTitle('Otwieranie lootboxa!', { fadeInDuration: 10, fadeOutDuration: 10, stayDuration: 110 });
        for (let i = 0; i < 57; i++) {
            let delay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 94, 100][i];
            shuffledArray.unshift(shuffledArray.pop());
            let string = '';
            string += '§r§f⬇';
            string += '\n';
            for (let j = 0; j < 19; j++) {
                string += getColorSquare(shuffledArray[j]);
            }
            string += '\n';
            string += '§r§f⬆';
            server.system.runTimeout(() => {
                player.playSound("random.click");
                onScreenDisplay.updateSubtitle(string);
            }, delay);
        }
        server.system.runTimeout(() => {
            const rng = shuffledArray[9];
            const inventory = player.getComponent('inventory').container;
            const loc = player.getHeadLocation();
            let item;
            switch (rng) {
                case 1:
                    player.playSound("note.xylophone");
                    player.spawnParticle("rot:thumbsup", loc);
                    item = getRandomItem(commonLootbox);
                    break;
                case 2:
                    player.spawnParticle("rot:rare_drop", loc);
                    player.playSound("note.pling");
                    item = getRandomItem(rareLootbox);
                    break;
                case 3:
                    player.dimension.spawnParticle("rot:legendary_drop", loc);
                    player.playSound("random.totem");
                    item = getRandomItem(legendaryLootbox);
                    break;
            }
            player.sendMessage(`§aWylosowałeś ${getPolishItemName(item.typeId)} x${item.amount}`);
            inventory.addItem(item);
        }, 105);
    });
}
function getColorSquare(x) {
    switch (x) {
        case 1: return '§a■';
        case 2: return '§c■';
        case 3: return '§9■';
    }
}
function getRandomItem(lootbox) {
    const totalWeight = lootbox.items.reduce((acc, item) => acc + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of lootbox.items) {
        random -= item.weight;
        if (random <= 0) {
            return item.item;
        }
    }
}
const commonLootbox = {
    name: "Common",
    items: [
        { weight: 5, item: new server.ItemStack('minecraft:diamond', 64) },
        { weight: 10, item: new server.ItemStack('minecraft:emerald', 64) },
        { weight: 1, item: new server.ItemStack('minecraft:ancient_debris', 16) },
        { weight: 20, item: new server.ItemStack('minecraft:golden_apple', 5) },
        { weight: 15, item: new server.ItemStack('minecraft:golden_apple', 15) },
        { weight: 10, item: new server.ItemStack('minecraft:golden_apple', 32) },
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 2) },
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 4) },
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 6) },
        { weight: 3, item: new server.ItemStack('minecraft:totem_of_undying', 1) },
        { weight: 2, item: new server.ItemStack('minecraft:netherite_upgrade_smithing_template', 1) },
        { weight: 3, item: items.diamondBoots },
        { weight: 3, item: items.diamondChestplate },
        { weight: 3, item: items.diamondHelmet },
        { weight: 3, item: items.diamondLeggings },
        { weight: 3, item: items.diamondSword },
        { weight: 3, item: items.riptideTrident },
        { weight: 3, item: items.loyaltyTrident },
    ]
};
const rareLootbox = {
    name: "Rare",
    items: [
        { weight: 1, item: new server.ItemStack('minecraft:ancient_debris', 16) },
        { weight: 20, item: new server.ItemStack('minecraft:golden_apple', 5) },
        { weight: 15, item: new server.ItemStack('minecraft:golden_apple', 15) },
        { weight: 10, item: new server.ItemStack('minecraft:golden_apple', 32) },
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 2) },
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 4) },
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 6) },
        { weight: 3, item: new server.ItemStack('minecraft:totem_of_undying', 1) },
        { weight: 5, item: items.netheriteAxe },
        { weight: 5, item: items.netheriteBoots },
        { weight: 5, item: items.netheriteChestplate },
        { weight: 5, item: items.netheriteHelmet },
        { weight: 5, item: items.netheriteLeggings },
        { weight: 5, item: items.netheritePickaxe },
        { weight: 5, item: items.netheriteSword },
        { weight: 5, item: items.riptideTrident },
        { weight: 5, item: items.loyaltyTrident },
        { weight: 15, item: new server.ItemStack('minecraft:netherite_upgrade_smithing_template', 1) },
    ]
};
const legendaryLootbox = {
    name: "Legendary",
    items: [
        { weight: 1, item: new server.ItemStack('minecraft:enchanted_golden_apple', 32) },
    ]
};
