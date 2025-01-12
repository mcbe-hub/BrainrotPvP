import { ModalFormData } from '@minecraft/server-ui';
import { getMoney, payMoney } from 'buyShop';
import { addMoney } from 'main';
export function startDiceGame(player) {
    const ui = new ModalFormData()
        .title('§l§6✦ Gra w Kości ✦')
        .slider('§e§lZasady:\n\n' +
        '§r§6➤ §bRzuć kością (§31-6§b)\n' +
        '§r§6➤ §bWynik §a5-6§b: §aWygrana §7(§a2.5x stawka§7)\n' +
        '§r§6➤ §bWynik §c1-4§b: §cPrzegrana\n\n' +
        '§e§lTryb Hardcore:\n' +
        '§r§6➤ §bWynik §a6§b: §aWygrana §7(§a5x stawka§7)\n' +
        '§r§6➤ §bInny wynik: §cPrzegrana\n\n' +
        '§eTwoja stawka', 0, getMoney(player), 1, 0)
        .toggle('§e§lTryb Hardcore §7(§cRyzyko§7)', false)
        // @ts-ignore
        .submitButton('§2§lZagraj')
        .show(player).then((data) => {
        if (!data.canceled) {
            const bet = data.formValues[0];
            const isHardcore = data.formValues[1];
            const result = Math.floor(Math.random() * 6) + 1;
            if (!isHardcore) {
                if (result >= 4) {
                    addMoney(player, bet * 2.5);
                    player.sendMessage(`§aWyrzuciłeś ${result}! Wygrałeś ${bet * 2.5} monet!`);
                    player.onScreenDisplay.setTitle(`§aWyrzuciłeś ${result}!`);
                }
                else {
                    payMoney(player, bet);
                    player.sendMessage(`§cWyrzuciłeś ${result}! Przegrałeś ${bet} monet!`);
                    player.onScreenDisplay.setTitle(`§cWyrzuciłeś ${result}!`);
                }
            }
            else {
                if (result === 6) {
                    addMoney(player, bet * 5);
                    player.sendMessage(`§aWyrzuciłeś 6! Wygrałeś ${bet * 5} monet!`);
                    player.onScreenDisplay.setTitle(`§aWyrzuciłeś 6!`);
                }
                else {
                    payMoney(player, bet);
                    player.sendMessage(`§cWyrzuciłeś ${result}! Przegrałeś ${bet} monet!`);
                    player.onScreenDisplay.setTitle(`§cWyrzuciłeś ${result}!`);
                }
            }
        }
    });
}
