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
    {
        blockVolume: new server.BlockVolume({ x: -1995, y: 99, z: -2005 }, { x: -1984, y: 106, z: -2016 }),
        blocks: ["minecraft:oak_log"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -2005, y: 99, z: -2005 }, { x: -2016, y: 106, z: -2016 }),
        blocks: ["minecraft:stone"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -1995, y: 99, z: -1995 }, { x: -1984, y: 106, z: -1984 }),
        blocks: ["minecraft:iron_ore"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -2005, y: 99, z: -1995 }, { x: -2016, y: 106, z: -1984 }),
        blocks: ["minecraft:diamond_ore"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -1975, y: 99, z: -2025 }, { x: -1964, y: 106, z: -2036 }),
        blocks: ["minecraft:gold_ore"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -2025, y: 99, z: -2025 }, { x: -2036, y: 106, z: -2036 }),
        blocks: ["minecraft:lapis_ore"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -1975, y: 99, z: -1975 }, { x: -1964, y: 106, z: -1964 }),
        blocks: ["minecraft:emerald_ore"]
    },
    {
        blockVolume: new server.BlockVolume({ x: -2025, y: 99, z: -1975 }, { x: -2036, y: 106, z: -1964 }),
        blocks: ["minecraft:coal_ore"]
    }
];
export function setupGenerators() {
    for (const generator of generators) {
        server.system.runInterval(() => {
            let i = 0;
            for (const block of generator.blockVolume.getBlockLocationIterator()) {
                i++;
                server.system.runTimeout(() => {
                    overworld.setBlockType(block, generator.blocks[Math.floor(Math.random() * generator.blocks.length)]);
                }, i / 14);
            }
        }, Math.floor(Math.random() * 401) + 400);
    }
}
