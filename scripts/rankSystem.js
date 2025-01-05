export function isAdmin(player) {
    return player.hasTag("admin");
}
export function getRank(player) {
    return player.getDynamicProperty("rank");
}
export function getRankString(player) {
    if (isAdmin(player))
        return "§l§cADMIN";
    const rank = getRank(player);
    switch (rank) {
        case "alpha": return "§l§sALPHA";
        case "sigma": return "§l§qSIGMA";
        default: return "§l§7BETA";
    }
}
