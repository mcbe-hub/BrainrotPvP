import * as server from '@minecraft/server';
export function isCombatLog(player) {
    return player.getDynamicProperty("combatLog") < 600;
}
export function addCombatLog(player) {
    player.setDynamicProperty("combatLog", 0);
}
export function updateCombatLog(player) {
    player.setDynamicProperty("combatLog", player.getDynamicProperty("combatLog") + 1);
}
export function logOutDuringCombat(player) {
    if (isCombatLog(player)) {
        const inv = player.getComponent("inventory").container;
        const equipment = player.getComponent("equippable");
        const dimension = player.dimension;
        const location = player.location;
        const items = [];
        for (let i = 0; i < 36; i++) {
            const item = inv.getItem(i);
            if (item) {
                items.push(item);
            }
        }
        for (const slot of [server.EquipmentSlot.Chest, server.EquipmentSlot.Feet, server.EquipmentSlot.Head, server.EquipmentSlot.Legs, server.EquipmentSlot.Offhand]) {
            const item = equipment.getEquipment(slot);
            if (item) {
                items.push(item);
            }
        }
        server.system.run(() => {
            for (const item of items) {
                dimension.spawnItem(item, location);
            }
        });
    }
}
