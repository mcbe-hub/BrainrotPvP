import { Player } from '@minecraft/server'

const defaultValues: ({
    identifier: string,
    value: string | number | boolean
})[] = [
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

export function joinSetup(player: Player) {
    for (const { identifier, value } of defaultValues) {
        if (player.getDynamicProperty(identifier) !== undefined) continue;
        player.setDynamicProperty(identifier, value);
    };

    player.setDynamicProperty("pvp", false);
};