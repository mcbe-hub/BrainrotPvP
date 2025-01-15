import { EquipmentSlot } from '@minecraft/server';
import { isCombatLog } from 'combatStuff/combatLog';
import { pvpOff } from 'combatStuff/pvpToggle';
const defaultValues = [
    {
        identifier: "elo",
        value: 1000
    },
    {
        identifier: "money",
        value: 0
    },
    {
        identifier: "totalMoney",
        value: 0
    },
    {
        identifier: "kills",
        value: 0
    },
    {
        identifier: "deaths",
        value: 0
    },
    {
        identifier: "combatLog",
        value: 600
    },
    {
        identifier: "playtime",
        value: 0
    },
    {
        identifier: "dailyClaimed",
        value: false
    },
    {
        identifier: "rank",
        value: "beta"
    }
];
export function joinSetup(player) {
    for (const { identifier, value } of defaultValues) {
        if (player.getDynamicProperty(identifier) !== undefined)
            continue;
        player.setDynamicProperty(identifier, value);
    }
    ;
    if (player.getDynamicProperty("antylog") != undefined || isCombatLog(player)) {
        player.sendMessage('§cClear za logout podczas walki!');
        player.getComponent("inventory").container.clearAll();
        const equipment = player.getComponent("equippable");
        for (const slot of [EquipmentSlot.Chest, EquipmentSlot.Feet, EquipmentSlot.Head, EquipmentSlot.Legs, EquipmentSlot.Offhand]) {
            equipment.setEquipment(slot, null);
        }
        player.setDynamicProperty("combatLog", 600);
        // @ts-ignore
        const cursor = player.getComponent("cursor_inventory").clear();
    }
    pvpOff(player);
}
;
