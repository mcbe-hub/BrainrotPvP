import * as server from '@minecraft/server'

export function pvpOn(player: server.Player) {
    player.triggerEvent("rot:pvpon")
    player.setDynamicProperty("pvp", true)
}

export function pvpOff(player: server.Player) {
    player.triggerEvent("rot:pvpoff")
    player.setDynamicProperty("pvp", false)
}

export function isPvP(player: server.Player): boolean {
    return player.getDynamicProperty("pvp") as boolean
}