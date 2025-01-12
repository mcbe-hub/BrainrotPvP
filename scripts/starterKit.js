import * as server from '@minecraft/server';
const overworld = server.world.getDimension('overworld');
const locations = [
    { x: -1997, y: 101, z: -1997 },
    { x: -2003, y: 101, z: -1997 },
    { x: -1997, y: 101, z: -2003 },
    { x: -2003, y: 101, z: -2003 },
];
export function setupStarterKits() {
    server.system.runInterval(() => {
        // @ts-ignore
        const barrelInventory = overworld.getBlock({ x: 0, y: -53, z: 0 }).getComponent("inventory").container;
        for (const location of locations) {
            // @ts-ignore
            const blockInventory = overworld.getBlock(location).getComponent("inventory").container;
            for (let i = 0; i < 27; i++) {
                blockInventory.setItem(i, barrelInventory.getItem(i));
            }
        }
    }, 200);
}
