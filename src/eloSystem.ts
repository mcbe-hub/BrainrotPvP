import { Player, world } from '@minecraft/server'

export function postKillElo(winner: Player, loser: Player) {
    const winnerElo = winner.getDynamicProperty("elo") as number ?? 1000;
    const loserElo = loser.getDynamicProperty("elo") as number ?? 1000;

    const K = 32; // K-factor

    // Expected scores
    const winnerExpected = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const loserExpected = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

    // Update Elo ratings
    const winnerNewElo = Math.round(winnerElo + K * (1 - winnerExpected)); // Winner gets 1 point for winning
    const loserNewElo = Math.round(loserElo + K * (0 - loserExpected));    // Loser gets 0 points for losing

    // Set new Elo ratings
    winner.setDynamicProperty("elo", winnerNewElo);
    loser.setDynamicProperty("elo", loserNewElo);
    return { winnerNewElo, loserNewElo };
}

export function getEloString(elo: number) {
    if (elo >= 2500) {
        return `§g[§p${elo}§g]§r`
    }
    if (elo >= 2000) {
        return `§u[§d${elo}§u]§r`
    }
    if (elo >= 1800) {
        return `§5[§u${elo}§5]§r`
    }
    if (elo >= 1600) {
        return `§t[§b${elo}§t]§r`
    }
    if (elo >= 1400) {
        return `§3[§s${elo}§3]§r`
    }
    if (elo >= 1200) {
        return `§7[§8${elo}§7]§r`
    }
    if (elo >= 1000) {
        return `§f[§i${elo}§f]§r`
    }
    if (elo < 1000) {
        return `§h[§j${elo}§h]§r`
    }
}