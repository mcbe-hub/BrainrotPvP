import * as server from '@minecraft/server';
import { spawnCenter } from '../main';
const dimension = server.world.getDimension('overworld');
export function spawnVisuals() {
    griffinSpinner();
    spawnMusic();
    chillGuy();
    skibidiPortal();
    skibidiToilet();
    banners();
    safeZone();
    sklep();
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
function skibidiToilet() {
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:skibidi_toilet_particle', { x: -21, y: 52, z: 21.5 });
    }, 20);
}
function banners() {
    const y = 70;
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:hazard_text', { x: 18, y: y + 5, z: 0.5 });
        dimension.spawnParticle('rot:boxpvp_text', { x: 0.5, y: y, z: -24 });
        dimension.spawnParticle('rot:safezone_text', { x: 0.5, y: y, z: 24 });
        dimension.spawnParticle('rot:shop_text', { x: -24, y: y, z: 0.5 });
    }, 20);
}
function safeZone() {
    const y = 50;
    const effectArr = ['rot:chair', 'rot:damnation', 'rot:division', 'rot:tarnation', 'rot:turret'];
    server.system.runInterval(() => {
        for (let i = 0; i < 5; i++) {
            server.system.runTimeout(() => {
                dimension.spawnParticle(effectArr[i], { x: -2000, y: y + 50, z: -2000 });
            }, i * 20);
        }
    }, 100);
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:jetlag', { x: -2000, y: y + 20, z: -2000 });
    }, 20);
}
function sklep() {
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:policja', { x: 4000, y: 100, z: 4000 });
        dimension.spawnParticle('rot:amogus', { x: 3992.5, y: 103.8, z: 4000.5 });
        dimension.spawnParticle('rot:amogus', { x: 4008.5, y: 103.8, z: 4000.5 });
    }, 20);
    server.system.runInterval(() => {
        dimension.spawnParticle('rot:buy', { x: 4000, y: 100, z: 4015 });
        dimension.spawnParticle('rot:sell', { x: 4000, y: 100, z: 3985 });
    }, 40);
}
