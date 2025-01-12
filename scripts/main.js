import * as server from '@minecraft/server';
import { spawnVisuals } from 'visuals/spawnVisuals';
import { joinSetup } from 'joinSetup';
import { isCombatLog, logOutDuringCombat, updateCombatLog } from 'combatStuff/combatLog';
import 'chat';
import { getRankString } from 'rankSystem';
import { getEloString } from 'eloSystem';
import { setupGenerators } from 'oreGenerationSystem';
import { setupDisplays } from 'rankingDisplays';
import { checkIfPlayerInPortal } from 'portalSystem';
import { setupStarterKits } from 'starterKit';
import { setupButtonSystem } from 'buttonSystem';
import { pvpOff } from 'combatStuff/pvpToggle';
import { setupCombatEvents } from 'combatStuff/events';
export const spawnCenter = { x: 0.5, y: 51, z: 0.5 };
const world = server.world;
server.system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        playerNameTag(player);
        checkIfPlayerInPortal(player);
        updateCombatLog(player);
        actionBar(player);
    }
});
function playerNameTag(player) {
    player.nameTag = `${getRankString(player)}§r\n${player.name} ${getEloString(player.getDynamicProperty("elo"))}`;
}
world.afterEvents.worldInitialize.subscribe(data => {
    spawnVisuals();
    setupGenerators();
    setupDisplays();
    setupStarterKits();
    setupButtonSystem();
    setupCombatEvents();
});
const PLAYERS = world.getAllPlayers();
world.afterEvents.playerSpawn.subscribe(data => {
    const player = data.player;
    pvpOff(player);
    player.teleport(spawnCenter);
    if (data.initialSpawn) {
        joinSetup(player);
        PLAYERS.push(player);
    }
});
world.beforeEvents.playerLeave.subscribe(data => {
    const player = data.player;
    logOutDuringCombat(player);
    const index = PLAYERS.findIndex(p => p.id === player.id);
    if (index !== -1) {
        PLAYERS.splice(index, 1);
    }
});
export function teleportToSpawn(player) {
    if (isCombatLog(player)) {
        player.sendMessage("§Nie możesz teleportować się do spawnu podczas walki!");
    }
    else {
        player.teleport(spawnCenter);
        pvpOff(player);
    }
}
export function getPlayers() {
    return [...PLAYERS];
}
export function addToDynamicProperty(player, property, amount) {
    const current = player.getDynamicProperty(property);
    player.setDynamicProperty(property, current + amount);
    return current + amount;
}
export function addMoney(player, amount) {
    addToDynamicProperty(player, "money", amount);
    addToDynamicProperty(player, "totalMoney", amount);
}
function actionBar(player) {
    if (isCombatLog(player)) {
        const combatLogTime = player.getDynamicProperty("combatLog");
        player.onScreenDisplay.setActionBar(`§4Walka! §c§l${((30 - combatLogTime / 20)).toFixed(1)}§r§cs`);
    }
    else {
        player.onScreenDisplay.setActionBar(`§a${player.getDynamicProperty("money")}§6$`);
    }
}
