import * as server from '@minecraft/server'


export function isAdmin(player: server.Player): boolean {
    return player.hasTag("admin")
}

export function getRank(player: server.Player): string {
    return player.getDynamicProperty("rank") as string
}

export function getRankString(player: server.Player): string {
    if (isAdmin(player)) return "§l§cADMIN"
    const rank =  getRank(player)
    switch(rank){
        case "alpha": return "§l§sALPHA"
        case "sigma": return "§l§qSIGMA"
        default: return "§l§7BETA"
    }
}
