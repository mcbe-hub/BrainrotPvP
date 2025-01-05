import * as server from '@minecraft/server';
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "chat";
import { joinSetup } from 'joinSetup';
export async function modMenu(mod) {
    const ui = new ActionFormData().button("Gracze");
    const response = await forceShow(ui, mod);
    if (response && 'selection' in response) {
        const selection = response.selection;
        if (selection == 0) {
            const players = server.world.getAllPlayers();
            const ui = new ActionFormData();
            for (const player of players) {
                ui.button(player.name);
            }
            ui.show(mod).then(data => {
                if (!data.canceled) {
                    playersModMenu(mod, players[data.selection]);
                }
            });
        }
    }
}
export function playersModMenu(mod, player) {
    new ActionFormData().title(player.name).button("Mute").button("Kick").button("Dynamic Property").button("Reset").show(mod).then(data => {
        switch (data.selection) {
            case 0:
                new ModalFormData()
                    .title("Mute")
                    .dropdown("Unit", ["Seconds", "Minutes", "Hours", "Days"], 1)
                    .textField("Time", "0", "0")
                    .textField("Reason", "Skill Issue", "Skill Issue")
                    .show(mod).then(data => {
                    const unit = data.formValues[0];
                    const time = data.formValues[1];
                    player.setDynamicProperty("muteDate", getDateInTheFuture(unit, time));
                    player.setDynamicProperty("muteReason", data.formValues[2]);
                });
                break;
            case 1:
                mod.runCommand(`kick "${player.name}"`);
                break;
            case 2:
                const properties = player.getDynamicPropertyIds();
                const ui = new ActionFormData().title(player.name + " properties");
                for (const property of properties) {
                    const value = player.getDynamicProperty(property);
                    const valueString = value.toString();
                    if (valueString.length < 50) {
                        ui.button(property + " - " + valueString);
                    }
                    else {
                        ui.button(property + "- .......");
                    }
                }
                ui.show(mod).then(data => {
                    if (!data.canceled) {
                        const property = properties[data.selection];
                        const value = player.getDynamicProperty(property);
                        const stringValue = value.toString();
                        // Show modal to edit the dynamic property
                        new ModalFormData().title(player.name)
                            .textField(property + "\n\n.", stringValue, stringValue)
                            .show(mod).then(data => {
                            if (!data.canceled) {
                                const newValue = data.formValues[0];
                                // Handle different types
                                if (typeof value === "number") {
                                    const numberValue = parseFloat(newValue);
                                    if (!isNaN(numberValue)) {
                                        player.setDynamicProperty(property, numberValue);
                                    }
                                }
                                else if (typeof value === "boolean") {
                                    const booleanValue = newValue.toLowerCase() === "true";
                                    player.setDynamicProperty(property, booleanValue);
                                }
                                else {
                                    // Assume it's a string for everything else
                                    player.setDynamicProperty(property, newValue);
                                }
                            }
                        });
                    }
                });
                break;
            case 3:
                for (const property of player.getDynamicPropertyIds()) {
                    player.setDynamicProperty(property, undefined);
                }
                joinSetup(player);
                break;
        }
    });
}
function getDateInTheFuture(unit, time) {
    let currentDate = Date.now();
    switch (unit) {
        case 0:
            currentDate += time * 1000;
            break;
        case 1:
            currentDate += time * 1000 * 60;
            break;
        case 2:
            currentDate += time * 1000 * 60 * 60;
            break;
        case 3:
            currentDate += time * 1000 * 60 * 60 * 24;
            break;
    }
    return currentDate;
}
