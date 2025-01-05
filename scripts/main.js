import * as server from '@minecraft/server';
import { spawnVisuals } from 'visuals/spawnVisuals';
export const spawnCenter = { x: 0, y: 50, z: 0 };
const world = server.world;
world.afterEvents.worldInitialize.subscribe(data => {
    spawnVisuals();
});
world.afterEvents.chatSend.subscribe(data => {
    const player = data.sender;
});
