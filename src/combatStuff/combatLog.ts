import * as server from '@minecraft/server'
import * as exp from 'constants';

export function isCombatLog(player: server.Player): boolean {
    return (player.getDynamicProperty("combatLog") as number) < 600;
}

export function addCombatLog(player: server.Player) {
    player.setDynamicProperty("combatLog", 0)
}

export function updateCombatLog(player: server.Player) {
    player.setDynamicProperty("combatLog", (player.getDynamicProperty("combatLog") as number) + 1)
}

export function logOutDuringCombat(player: server.Player) {
    if (isCombatLog(player)) {
        const inv = player.getComponent("inventory").container
        const equipment = player.getComponent("equippable")
        const dimension = player.dimension
        const location = player.location
        const items: server.ItemStack[] = []
        for (let i = 0; i < 36; i++) {
            const item = inv.getItem(i)
            if (item) {
                items.push(item)
            }
        }
        for (const slot of [server.EquipmentSlot.Chest, server.EquipmentSlot.Feet, server.EquipmentSlot.Head, server.EquipmentSlot.Legs, server.EquipmentSlot.Offhand]) {
            const item = equipment.getEquipment(slot)
            if (item) {
                items.push(item)
            }
        }
        server.system.run(() => {
            for(const item of items){
                dimension.spawnItem(item, location)
            }
        })
    }
}