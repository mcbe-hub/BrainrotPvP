import { world, system } from "@minecraft/server";
export function setupTipMessages() {
    system.runInterval(() => {
        world.sendMessage(tipMessages[Math.floor(Math.random() * tipMessages.length)]);
    }, 3000);
}
const tipMessages = [
    "§fWskazówka: §rUżyj komendy §l!spawn§r, aby wrócić do punktu startowego.",
    "§6Wskazówka: §rOdwiedź §l!rynek§r, aby handlować z innymi graczami.",
    "§2Wskazówka: §rSpróbuj szczęścia w grach hazardowych, ale pamiętaj, że możesz stracić swoje pieniądze.",
    "§eWskazówka: §rPamiętaj, że podczas walki nie możesz się teleportować do spawnu! Wyjście podczas walki to automatyczna przegrana!",
];
