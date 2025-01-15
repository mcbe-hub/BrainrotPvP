import { ModalFormData, ActionFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui"
import * as server from '@minecraft/server'
import { isAdmin, getRankString } from "rankSystem"
import { timeLeftUntilDate } from "utils/timeUntilDate"
import { getEloString } from "eloSystem"
import { teleportToSpawn } from "main"
import { modMenu } from "modStuff"
import { ChestFormData } from "chestForm/forms"
import { playerExchangeUi } from "playerMarket"
const world = server.world
const system = server.system

world.beforeEvents.chatSend.subscribe(data => {
    data.cancel = true
    const msg = data.message
    const player = data.sender
    if (msg[0] == "!") {
        const split = msg.split(" ")
        switch (split[0]) {
            case "!mod":
                system.run(() => {
                    if (isAdmin(player)) modMenu(player);
                })
                break;
            case "!spawn":
                system.run(() => {
                    teleportToSpawn(player)
                })
                break;
            case "!refresh":
                if(isAdmin(player)){
                    world.getDynamicPropertyIds().forEach(id => {
                        world.setDynamicProperty(id, undefined)
                    })
                }
            break;
            case "!rynek":
                system.run(() => {
                    playerExchangeUi(player)
                })
                break;
            break;
            default: player.sendMessage("§cNie ma takiej komendy!")
        }
    } else {
        const muteDate = player.getDynamicProperty("muteDate") as number
        const lastMsg = player.getDynamicProperty("lastMsg") as number
        const now = new Date().getTime()


        if ((muteDate ?? 0) < Date.now()) {
            if ((lastMsg == undefined || now - (lastMsg + 5000) > 0) || isAdmin(player)) {
                let message = ""
                message += `${getRankString(player)}§r `
                message += `${getEloString(player.getDynamicProperty("elo") as number)} ${player.name}§7: ${msg}`
                world.sendMessage(message)
                player.setDynamicProperty("lastMsg", now)
            } else {
                player.sendMessage(`§cMożesz wysyłać wiadomości jedynie co 5 sekund!`)
            }
        } else {
            player.sendMessage(`§cMasz mute'a!\nPozostały czas: §m${timeLeftUntilDate(new Date(muteDate))}\n§4Powód: §r§o${player.getDynamicProperty("muteReason")}`)
        }
    }
})

export async function forceShow(form: ModalFormData | ActionFormData | ChestFormData, player: server.Player): Promise<ActionFormResponse | ModalFormResponse | null> {
    const res = await form.show(player)
    if (res.cancelationReason !== "UserBusy" || !player.isValid()) return res as ActionFormResponse | ModalFormResponse
    return await forceShow(form, player)
}