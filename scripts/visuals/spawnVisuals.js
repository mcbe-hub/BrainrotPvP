import * as server from '@minecraft/server';
import { spawnCenter } from '../main';
const dimension = server.world.getDimension('overworld');
export function spawnVisuals() {
    griffinSpinner();
    spawnMusic();
    chillGuy();
    skibidiPortal();
}
function griffinSpinner() {
    server.system.runInterval(() => {
        dimension.spawnParticle('brainrot:peter_griffinplus', spawnCenter);
        dimension.spawnParticle('brainrot:peter_griffinminus', spawnCenter);
    }, 60);
}
function spawnMusic() {
    dimension.playSound('spawn.title_theme', spawnCenter, { volume: 0.5 });
    server.system.runInterval(() => {
        dimension.playSound('spawn.title_theme', spawnCenter, { volume: 0.5 });
    }, 56 * 20);
}
function chillGuy() {
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:chill_guy_spammer', spawnCenter);
    }, 20);
}
function skibidiPortal() {
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:skibidi_portal', { x: -2, y: 51, z: -22.5 });
    }, 20);
}
