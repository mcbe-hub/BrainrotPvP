import * as server from '@minecraft/server';
const overworld = server.world.getDimension("overworld");
const generators = [
    {
        blockVolume: new server.BlockVolume({ x: 2074, y: -61, z: 2074 }, { x: 2064, y: -55, z: 2064 }),
        blocks: ["minecraft:diamond_ore", "minecraft:diamond_ore", "minecraft:diamond_ore", "minecraft:diamond_ore", "minecraft:diamond_block"]
    },
    {
        blockVolume: new server.BlockVolume({ x: 2060, y: -61, z: 2074 }, { x: 2050, y: -55, z: 2064 }),
        blocks: ["minecraft:gold_ore", "minecraft:gold_ore", "minecraft:gold_ore", "minecraft:gold_ore", "minecraft:gold_block"]
    },
    {
        blockVolume: new server.BlockVolume({ x: 2046, y: -61, z: 2074 }, { x: 2036, y: -55, z: 2064 }),
        blocks: ["minecraft:iron_ore", "minecraft:iron_ore", "minecraft:iron_ore", "minecraft:iron_ore", "minecraft:iron_block"]
    },
    {
        blockVolume: new server.BlockVolume({ x: 2032, y: -61, z: 2074 }, { x: 2022, y: -55, z: 2064 }),
        blocks: ["minecraft:coal_ore", "minecraft:coal_ore", "minecraft:coal_ore", "minecraft:coal_ore", "minecraft:coal_block"]
    },
];
export function setupGenerators() {
    for (const generator of generators) {
        server.system.runInterval(() => {
            let i = 0;
            for (const block of generator.blockVolume.getBlockLocationIterator()) {
                i++;
                server.system.runTimeout(() => {
                    overworld.setBlockType(block, generator.blocks[Math.floor(Math.random() * generator.blocks.length)]);
                }, i / 40);
            }
        }, Math.floor(Math.random() * 401) + 400);
    }
}
