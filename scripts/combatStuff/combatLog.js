export function isCombatLog(player) {
    return player.getDynamicProperty("combatLog") < 600;
}
export function addCombatLog(player) {
    player.setDynamicProperty("combatLog", 0);
}
