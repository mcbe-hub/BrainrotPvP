import * as server from '@minecraft/server'
import { spawnVisuals } from 'visuals/spawnVisuals'
import { joinSetup } from 'joinSetup'
import { isCombatLog, logOutDuringCombat, updateCombatLog } from 'combatStuff/combatLog'
import 'chat'
import { getRankString } from 'rankSystem'
import { getEloString } from 'eloSystem'
import { setupGenerators } from 'oreGenerationSystem'
import { setupDisplays } from 'rankingDisplays'
import { checkIfPlayerInPortal } from 'portalSystem'
import { setupStarterKits } from 'starterKit'
import { setupButtonSystem } from 'buttonSystem'
import { pvpOff } from 'combatStuff/pvpToggle'
import { setupCombatEvents } from 'combatStuff/events'
import { playerExchangeUi } from 'playerMarket'
import { setupTipMessages } from 'tipMessages'

export const spawnCenter: server.Vector3 = { x: 0.5, y: 51, z: 0.5 }

const world = server.world

server.system.runInterval(()=>{
    for(const player of world.getAllPlayers()){
        playerNameTag(player)
        checkIfPlayerInPortal(player)
        updateCombatLog(player)
        actionBar(player)
    }
})



function playerNameTag(player: server.Player){
    player.nameTag = `${getRankString(player)}§r\n${player.name} ${getEloString(player.getDynamicProperty("elo") as number)}`
}

world.afterEvents.worldInitialize.subscribe(data=>{
    spawnVisuals()
    setupGenerators()
    setupDisplays()
    setupStarterKits()
    setupButtonSystem()
    setupCombatEvents()
    setupTipMessages()
})

const PLAYERS = world.getAllPlayers()

world.afterEvents.playerSpawn.subscribe(data=>{
    const player = data.player
    pvpOff(player)
    player.teleport(spawnCenter)
    if (data.initialSpawn) {
        joinSetup(player)
        PLAYERS.push(player)
    }
})

world.beforeEvents.playerLeave.subscribe(data=>{
    const player = data.player
    logOutDuringCombat(player)
    const index = PLAYERS.findIndex(p => p.id === player.id)
    if (index !== -1) {
        PLAYERS.splice(index, 1)
    }
})

export function teleportToSpawn(player: server.Player){
    if(isCombatLog(player)){
        player.sendMessage("§cNie możesz teleportować się do spawnu podczas walki!")
    } else {
        player.teleport(spawnCenter)
        pvpOff(player)
    }
}

export function getPlayers(): server.Player[] {
    return [...PLAYERS]
}

export function addToDynamicProperty(player: server.Player, property:string, amount: number){
    const current = player.getDynamicProperty(property) as number
    player.setDynamicProperty(property, current + amount)
    return current + amount
}

export function addMoney(player: server.Player, amount: number){
    addToDynamicProperty(player, "money", amount)
    addToDynamicProperty(player, "totalMoney", amount)
}

function actionBar(player: server.Player){
    if(isCombatLog(player)){
        const combatLogTime = player.getDynamicProperty("combatLog") as number
        player.onScreenDisplay.setActionBar(`§4Walka! §c§l${((30-combatLogTime/20)).toFixed(1)}§r§cs`)
    } else {
        player.onScreenDisplay.setActionBar(`§a${player.getDynamicProperty("money")}§6$`)
    }
}