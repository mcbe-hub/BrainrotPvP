import * as server from '@minecraft/server';
import { isAdmin, getRankString } from "rankSystem";
import { timeLeftUntilDate } from "utils/timeUntilDate";
import { getEloString } from "eloSystem";
import { teleportToSpawn } from "main";
import { modMenu } from "modStuff";
import { playerExchangeUi } from "playerMarket";
const world = server.world;
const system = server.system;
world.beforeEvents.chatSend.subscribe(data => {
    data.cancel = true;
    const msg = data.message;
    const player = data.sender;
    if (msg[0] == "!") {
        const split = msg.split(" ");
        switch (split[0]) {
            case "!mod":
                system.run(() => {
                    if (isAdmin(player))
                        modMenu(player);
                });
                break;
            case "!spawn":
                system.run(() => {
                    teleportToSpawn(player);
                });
                break;
            case "!refresh":
                if (isAdmin(player)) {
                    world.getDynamicPropertyIds().forEach(id => {
                        world.setDynamicProperty(id, undefined);
                    });
                }
                break;
            case "!rynek":
                system.run(() => {
                    playerExchangeUi(player);
                });
                break;
                break;
            default: player.sendMessage("§cNie ma takiej komendy!");
        }
    }
    else {
        const muteDate = player.getDynamicProperty("muteDate");
        const lastMsg = player.getDynamicProperty("lastMsg");
        const now = new Date().getTime();
        if ((muteDate ?? 0) < Date.now()) {
            if ((lastMsg == undefined || now - (lastMsg + 5000) > 0) || isAdmin(player)) {
                let message = "";
                message += `${getRankString(player)}§r `;
                message += `${getEloString(player.getDynamicProperty("elo"))} ${player.name}§7: ${msg}`;
                world.sendMessage(message);
                player.setDynamicProperty("lastMsg", now);
            }
            else {
                player.sendMessage(`§cMożesz wysyłać wiadomości jedynie co 5 sekund!`);
            }
        }
        else {
            player.sendMessage(`§cMasz mute'a!\nPozostały czas: §m${timeLeftUntilDate(new Date(muteDate))}\n§4Powód: §r§o${player.getDynamicProperty("muteReason")}`);
        }
    }
});
export async function forceShow(form, player) {
    const res = await form.show(player);
    if (res.cancelationReason !== "UserBusy" || !player.isValid())
        return res;
    return await forceShow(form, player);
}
