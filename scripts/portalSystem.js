import * as server from '@minecraft/server';
import { pvpOn } from 'combatStuff/pvpToggle';
import { spawnCenter } from 'main';
const dimension = server.world.getDimension('overworld');
const portals = [
    {
        id: "boxpvp",
        blockVolume: new server.BlockVolume({ x: -3, y: 50, z: -21 }, { x: 3, y: 60, z: -23 }),
        handler: boxPvP
    },
    {
        id: "safezone",
        blockVolume: new server.BlockVolume({ x: -3, y: 50, z: 21 }, { x: 3, y: 60, z: 25 }),
        handler: (player) => {
            player.teleport({ x: -2000, y: 101, z: -2000 });
        }
    },
    {
        id: "shop",
        blockVolume: new server.BlockVolume({ x: -21, y: 50, z: 3 }, { x: -23, y: 56, z: -3 }),
        handler: (player) => {
            player.teleport({ x: 4000, y: 100, z: 4000 });
        }
    },
    {
        id: "shopToSpawn",
        blockVolume: new server.BlockVolume({ x: 3950, y: 95, z: 3950 }, { x: 4050, y: 105, z: 4050 }),
        handler: (player) => {
            player.teleport(spawnCenter);
        }
    }
];
export function checkIfPlayerInPortal(player) {
    try {
        if (dimension.getBlock(player.location).typeId == "minecraft:structure_void") {
            for (const portal of portals) {
                if (portal.blockVolume.isInside(player.location)) {
                    portal.handler(player);
                    return;
                }
            }
        }
    }
    catch (error) {
    }
}
function boxPvP(player) {
    const x = Math.floor(Math.random() * 121) - 60 + 2000;
    const z = Math.floor(Math.random() * 121) - 60 + 2000;
    let check = false;
    player.teleport({ x: x, y: -60, z: z });
    server.system.runTimeout(() => {
        for (let i = -61; i < 0; i++) {
            const block = dimension.getBlock({ x: x, y: i, z: z });
            pvpOn(player);
            const blockBelow = block.below();
            // @ts-ignore
            if (block.isAir && blockBelow.isSolid) {
                player.teleport({ x: x, y: i, z: z });
                check = true;
                break;
            }
        }
    }, 20);
}
