import { ActionFormData } from '@minecraft/server-ui';
import { getMoney, payMoney } from 'buyShop';
import { addMoney } from 'main';
export function allInFlipUi(player) {
    const money = getMoney(player);
    new ActionFormData()
        .title("§l§6All In Flip")
        .body(`§eZasady gry:\n\n§r1. §fPostaw wszystko, co masz.\n2. §fJeśli wygrasz, podwajasz swoje pieniądze.\n3. §fJeśli przegrasz, tracisz wszystko.\n\n§aPowodzenia!`)
        .button("§2Zagraj")
        .button("§cAnuluj")
        .show(player)
        .then(response => {
        if (response.canceled)
            return;
        if (response.selection === 0) {
            const bet = money;
            const win = Math.random() < 0.5;
            if (win) {
                addMoney(player, bet);
                player.sendMessage(`§aWygrałeś! Twoje nowe saldo to ${getMoney(player)}`);
            }
            else {
                payMoney(player, bet);
                player.sendMessage(`§cPrzegrałeś! Twoje nowe saldo to ${getMoney(player)}`);
            }
        }
        else {
            player.sendMessage("§cAnulowano");
        }
    });
}
