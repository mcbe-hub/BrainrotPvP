import * as server from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { getMoney, payMoney } from 'buyShop';
import { addMoney } from 'main';
export function startGame(player) {
    const ui = new ModalFormData()
        .title("§l§6Blackjack")
        .slider("\n§7Zasady:\n§7- Gracz i dealer otrzymują po 2 karty\n§7- Wygrywa ten, kto ma sumę bliższą 21\n§7- As może być wart 1 lub 11\n§7- Figury są warte 10\n\n§eStawka", 1, getMoney(player), 1, 0)
        // @ts-ignore
        .submitButton("§2§lZagraj")
        .show(player).then((data) => {
        if (!data.canceled) {
            const bet = Math.floor(data.formValues[0]);
            if (!payMoney(player, bet)) {
                player.sendMessage("§c§lNie masz tyle pieniędzy!");
                return;
            }
            const deck = shuffleDeck(createDeck());
            const dealerHand = [deck.pop(), deck.pop()];
            const playerHand = [deck.pop(), deck.pop()];
            blackjack(player, deck, bet, dealerHand, playerHand);
        }
    });
}
function blackjack(player, deck, bet, dealerHand, playerHand) {
    const ui = new ActionFormData()
        .title(`§l§6Blackjack §r- §eStawka: ${bet}$`);
    const playerValue = calculateHandValue(playerHand);
    const dealerShownValue = cardValue(dealerHand[0]);
    let playerString = `§l§2Gracz:§r ${playerHand.join(' ')} §8(${playerValue})`;
    let dealerString = `§l§cDealer:§r ${dealerHand[0]} ? §8(${dealerShownValue}+?)`;
    ui.button(playerString);
    ui.button(dealerString);
    ui.button('§l§9► Dobierz');
    ui.button('§l§e► Stój')
        .show(player).then((data) => {
        if (data.canceled || data.selection == 0 || data.selection == 1) {
            blackjack(player, deck, bet, dealerHand, playerHand);
        }
        if (data.selection == 2) {
            playerHand.push(deck.pop());
            const value = calculateHandValue(playerHand);
            if (value > 21) {
                player.onScreenDisplay.setTitle(`§c§lPrzegrywasz: §e${bet}§a$§r`);
                player.onScreenDisplay.updateSubtitle(`Gracz: ${playerHand.join(', ')} (${value})\nDealer: ${dealerHand.join(', ')} (${calculateHandValue(dealerHand)})`);
                return;
            }
            blackjack(player, deck, bet, dealerHand, playerHand);
        }
        if (data.selection == 3) {
            finishGame(player, deck, bet, playerHand, dealerHand);
        }
    });
}
function finishGame(player, deck, bet, playerHand, dealerHand) {
    const display = player.onScreenDisplay;
    let delay = 1;
    display.hideAllExcept();
    display.setTitle(`§l§cDealer:§r §7${dealerHand.join(' ')} §8(${calculateHandValue(dealerHand)})`);
    while (willDealerHit(dealerHand, playerHand)) {
        dealerHand.push(deck.pop());
        const handAtCurrentMoment = dealerHand.join(' ');
        const valueAtCurrentMoment = calculateHandValue(dealerHand);
        server.system.runTimeout(() => {
            display.setTitle(`§l§cDealer:§r §7${handAtCurrentMoment} §8(${valueAtCurrentMoment})`);
        }, delay * 40);
        delay++;
    }
    server.system.runTimeout(() => {
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);
        if (dealerValue > 21 || playerValue > dealerValue) {
            display.setTitle(`§6§lWygrywasz: §e${bet * 2}§a$`);
            addMoney(player, bet * 2);
        }
        else if (playerValue === dealerValue) {
            display.setTitle(`§6§lRemis: §e${bet}§a$`);
            addMoney(player, bet);
        }
        else {
            display.setTitle(`§c§lPrzegrywasz: §e${bet}§a$`);
        }
        display.updateSubtitle(`Gracz: ${playerHand.join(', ')} (${playerValue})\nDealer: ${dealerHand.join(', ')} (${dealerValue})`);
        server.system.runTimeout(() => {
            display.resetHudElements();
        }, 30);
    }, (delay + 1) * 40);
}
function calculateHandValue(hand) {
    let total = 0;
    let aces = 0;
    for (const card of hand) {
        const value = cardValue(card);
        if (value === 11) {
            aces++;
        }
        total += value;
    }
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }
    return total;
}
function cardValue(card) {
    const value = card.split('')[0];
    if (value === 'A')
        return 11;
    if (['K', 'Q', 'J', '1'].includes(value))
        return 10;
    return parseInt(value);
}
function createDeck() {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(value + suit);
        }
    }
    return deck;
}
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return [...deck];
}
function willDealerHit(dealerHand, playerHand) {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    if (dealerValue < playerValue)
        return true;
    return false;
}
