import * as server from '@minecraft/server'
import { spawnVisuals } from 'visuals/spawnVisuals'
import { joinSetup } from 'joinSetup'
import { isCombatLog } from 'combatStuff/combatLog'
import 'chat'
import { getRankString } from 'rankSystem'
import { getEloString } from 'eloSystem'
import { setupGenerators } from 'oreGenerationSystem'
import { setupDisplays } from 'rankingDisplays'

export const spawnCenter: server.Vector3 = { x: 0.5, y: 51, z: 0.5 }

const world = server.world

server.system.runInterval(()=>{
    for(const player of world.getAllPlayers()){
        playerNameTag(player)
    }
})

function playerNameTag(player: server.Player){
    player.nameTag = `${getRankString(player)}§r\n${player.name} ${getEloString(player.getDynamicProperty("elo") as number)}`
}

world.afterEvents.worldInitialize.subscribe(data=>{
    spawnVisuals()
    setupGenerators()
    setupDisplays()
})

const PLAYERS = world.getAllPlayers()

world.afterEvents.playerSpawn.subscribe(data=>{
    if(data.initialSpawn){
        joinSetup(data.player)
        PLAYERS.push(data.player)
    }
})

world.beforeEvents.playerLeave.subscribe(data=>{
    const player = data.player
    const index = PLAYERS.findIndex(p => p.id === player.id)
    if (index !== -1) {
        PLAYERS.splice(index, 1)
    }
})

export function teleportToSpawn(player: server.Player){
    if(isCombatLog(player)){
        player.sendMessage("§Nie możesz teleportować się do spawnu podczas walki!")
    } else {
        player.teleport(spawnCenter)
    }
}

export function getPlayers(): server.Player[] {
    return [...PLAYERS]
}