import * as server from '@minecraft/server'
import { buyShopUi } from 'buyShop';
import { allInFlipUi } from 'gambling/allInFlip';
import { startGame } from 'gambling/blackjack';
import { startDiceGame } from 'gambling/dice';
import { openLootBox } from 'gambling/lootbox';
import { sellShopUi } from 'sellShop';

// Create a map to store button locations and their corresponding functions
const buttonHandlers = new Map<string, (player: server.Player) => void>();

// Function to register a button handler
export function registerButton(x: number, y: number, z: number, handler: (player: server.Player) => void) {
    const key = `${x},${y},${z}`;
    buttonHandlers.set(key, handler);
}

// Function to handle button press
function handleButtonPress(location: server.Vector3, player: server.Player) {
    const key = `${location.x},${location.y},${location.z}`;
    const handler = buttonHandlers.get(key);
    if (handler) {
        handler(player);
    }
}

export function setupButtonSystem() {
    server.world.afterEvents.buttonPush.subscribe(data => {
        if (data.source instanceof server.Player) {
            handleButtonPress(data.block.location, data.source);
        }
    });
    setupShopButtons()
    registerButton(7998, 101, 7985, (player) => {
        startGame(player)
    })
    registerButton(7998, 101, 7984, (player) => {
        startGame(player) 
    })
    registerButton(7992, 101, 7995, (player) => {
        startDiceGame(player)
    })
    registerButton(7992, 101, 7984, (player) => {
        startDiceGame(player)
    })
    registerButton(7993, 101, 7984, (player) => {
        startDiceGame(player)
    })
    registerButton(7982, 101, 7994, (player) => {
        allInFlipUi(player)
    })
    registerButton(7979, 101, 7992, (player) => {
        openLootBox(player)
    })
}

function setupShopButtons() {
    for (const x of [4002, 4000, 3998]) {
        registerButton(x, 101, 3995, (player) => {
            sellShopUi(player)
        })
        registerButton(x, 101, 4005, (player) => {
            buyShopUi(player)
        })
    }
} 