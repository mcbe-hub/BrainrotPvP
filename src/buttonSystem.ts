import * as server from '@minecraft/server'
import { buyShopUi } from 'buyShop';
import { allInFlipUi } from 'gambling/allInFlip';
import { startGame } from 'gambling/blackjack';
import { startDiceGame } from 'gambling/dice';
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
    registerButton(8000, 100, 8000, (player) => {
        allInFlipUi(player) 
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