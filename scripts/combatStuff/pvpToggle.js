export function pvpOn(player) {
    player.triggerEvent("rot:pvpon");
    player.setDynamicProperty("pvp", true);
}
export function pvpOff(player) {
    player.triggerEvent("rot:pvpoff");
    player.setDynamicProperty("pvp", false);
}
export function isPvP(player) {
    return player.getDynamicProperty("pvp");
}
