import * as server from '@minecraft/server'
import { addCombatLog } from './combatLog'
import { isPvP } from './pvpToggle'
import { getEloString, postKillElo } from 'eloSystem'
import { addToDynamicProperty } from 'main'

const world = server.world

export function setupCombatEvents() {
    world.afterEvents.entityHitEntity.subscribe(data => {
        entityHitEntity(data)
    })
    world.afterEvents.entityDie.subscribe(data => {
        entityDie(data)
    })
}

function entityHitEntity(data: server.EntityHitEntityAfterEvent) {
    const e1 = data.damagingEntity
    const e2 = data.hitEntity
    if (e1 instanceof server.Player && e2 instanceof server.Player) {
        if (!isPvP(e1) || !isPvP(e2)) return
        addCombatLog(e1)
        addCombatLog(e2)
        e1.setDynamicProperty("lastHit", e2.id)
        e2.setDynamicProperty("lastHit", e1.id)
    }
}

function entityDie(data: server.EntityDieAfterEvent) {
    const deadEntity = data.deadEntity
    if (deadEntity instanceof server.Player) {
        const killer = data.damageSource.damagingEntity
        if (killer == undefined) return
        if (killer instanceof server.Player) {
            const elo = postKillElo(killer, deadEntity)
            addToDynamicProperty(killer, "kills", 1)
            addToDynamicProperty(deadEntity, "deaths", 1)
            const winnerEloString = getEloString(elo.winnerNewElo)
            const loserEloString = getEloString(elo.loserNewElo)
            world.sendMessage(
                `§a${killer.name} §rrozwalił(a) §c${deadEntity.name} §rjak tanią zabawkę z TEMU! ` +
                `§b${winnerEloString} §rdla zwycięzcy, a przegrany? No cóż... masywne skill issue §e${loserEloString} §rdla §c${deadEntity.name}§r.`
            )
            
        }
    }
}