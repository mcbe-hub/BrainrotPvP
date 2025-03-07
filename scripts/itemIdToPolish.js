const itemIdToPolish = {
    "minecraft:wooden_sword": "Drewniany Miecz",
    "minecraft:wooden_shovel": "Drewniana Łopata",
    "minecraft:wooden_pickaxe": "Drewniana Kilof",
    "minecraft:wooden_axe": "Drewniana Siekiera",
    "minecraft:wooden_hoe": "Drewniana Motyka",
    "minecraft:stone_sword": "Kamienny Miecz",
    "minecraft:stone_shovel": "Kamienna Łopata",
    "minecraft:stone_pickaxe": "Kamienny Kilof",
    "minecraft:stone_axe": "Kamienna Siekiera",
    "minecraft:stone_hoe": "Kamienna Motyka",
    "minecraft:iron_sword": "Żelazny Miecz",
    "minecraft:iron_shovel": "Żelazna Łopata",
    "minecraft:iron_pickaxe": "Żelazny Kilof",
    "minecraft:iron_axe": "Żelazna Siekiera",
    "minecraft:iron_hoe": "Żelazna Motyka",
    "minecraft:diamond_sword": "Diamentowy Miecz",
    "minecraft:diamond_shovel": "Diamentowa Łopata",
    "minecraft:diamond_pickaxe": "Diamentowy Kilof",
    "minecraft:diamond_axe": "Diamentowa Siekiera",
    "minecraft:diamond_hoe": "Diamentowa Motyka",
    "minecraft:golden_sword": "Złoty Miecz",
    "minecraft:golden_shovel": "Złota Łopata",
    "minecraft:golden_pickaxe": "Złoty Kilof",
    "minecraft:golden_axe": "Złota Siekiera",
    "minecraft:golden_hoe": "Złota Motyka",
    "minecraft:netherite_sword": "Netherowy Miecz",
    "minecraft:netherite_shovel": "Netherowa Łopata",
    "minecraft:netherite_pickaxe": "Netherowy Kilof",
    "minecraft:netherite_axe": "Netherowa Siekiera",
    "minecraft:netherite_hoe": "Netherowa Motyka",
    "minecraft:bow": "Łuk",
    "minecraft:arrow": "Strzała",
    "minecraft:shield": "Tarcza",
    "minecraft:trident": "Trójząb",
    "minecraft:crossbow": "Kusza",
    "minecraft:fishing_rod": "Wędka",
    "minecraft:flint_and_steel": "Krzesiwo",
    "minecraft:shears": "Nożyce",
    "minecraft:lead": "Smycz",
    "minecraft:name_tag": "Etykieta",
    "minecraft:compass": "Kompas",
    "minecraft:clock": "Zegar",
    "minecraft:spyglass": "Luneta",
    "minecraft:totem_of_undying": "Totem Nieśmiertelności",
    "minecraft:elytra": "Elytra",
    "minecraft:firework_rocket": "Rakieta Fajerwerkowa",
    "minecraft:book": "Książka",
    "minecraft:enchanted_book": "Zaklęta Książka",
    "minecraft:map": "Mapa",
    "minecraft:empty_map": "Pusta Mapa",
    "minecraft:paper": "Papier",
    "minecraft:slime_ball": "Kula Szlamu",
    "minecraft:ender_pearl": "Perła Kresu",
    "minecraft:blaze_rod": "Różdżka Blaze'a",
    "minecraft:ghast_tear": "Łza Ghasta",
    "minecraft:nether_star": "Gwiazda Netheru",
    "minecraft:prismarine_shard": "Odłamek Pryzmarinu",
    "minecraft:prismarine_crystals": "Kryształy Pryzmarinu",
    "minecraft:heart_of_the_sea": "Serce Morza",
    "minecraft:nautilus_shell": "Muszla Nautilusa",
    "minecraft:coal": "Węgiel",
    "minecraft:charcoal": "Węgiel Drzewny",
    "minecraft:diamond": "Diament",
    "minecraft:emerald": "Szmaragd",
    "minecraft:gold_ingot": "Sztabka Złota",
    "minecraft:iron_ingot": "Sztabka Żelaza",
    "minecraft:netherite_ingot": "Sztabka Netherytu",
    "minecraft:quartz": "Kwarc",
    "minecraft:redstone": "Czerwony Kamień",
    "minecraft:lapis_lazuli": "Lazuryt",
    "minecraft:amethyst_shard": "Odłamek Ametystu",
    "minecraft:bone": "Kość",
    "minecraft:rotten_flesh": "Zgniłe Mięso",
    "minecraft:string": "Nić",
    "minecraft:spider_eye": "Oko Pająka",
    "minecraft:phantom_membrane": "Błona Fantoma",
    "minecraft:gunpowder": "Proch Strzelniczy",
    "minecraft:glowstone_dust": "Pył Świecącego Kamienia",
    "minecraft:clay_ball": "Kulka Gliny",
    "minecraft:snowball": "Śnieżka",
    "minecraft:egg": "Jajko",
    "minecraft:feather": "Pióro",
    "minecraft:leather": "Skóra",
    "minecraft:rabbit_hide": "Królicza Skóra",
    "minecraft:raw_beef": "Surowa Wołowina",
    "minecraft:cooked_beef": "Stek",
    "minecraft:raw_chicken": "Surowy Kurczak",
    "minecraft:cooked_chicken": "Pieczony Kurczak",
    "minecraft:raw_porkchop": "Surowy Kotlet Wieprzowy",
    "minecraft:cooked_porkchop": "Pieczony Kotlet Wieprzowy",
    "minecraft:raw_mutton": "Surowa Baranina",
    "minecraft:cooked_mutton": "Pieczona Baranina",
    "minecraft:raw_rabbit": "Surowy Królik",
    "minecraft:cooked_rabbit": "Pieczony Królik",
    "minecraft:golden_carrot": "Złota Marchewka",
    "minecraft:golden_apple": "Złote Jabłko",
    "minecraft:enchanted_golden_apple": "Zaklęte Złote Jabłko",
    "minecraft:baked_potato": "Pieczony Ziemniak",
    "minecraft:poisonous_potato": "Trujący Ziemniak",
    "minecraft:beetroot": "Burak",
    "minecraft:beetroot_soup": "Zupa Buraczana",
    "minecraft:mushroom_stew": "Zupa Grzybowa",
    "minecraft:cookie": "Ciasteczko",
    "minecraft:cake": "Tort",
    "minecraft:pumpkin_pie": "Dyniowy Placek",
    "minecraft:honey_bottle": "Butelka Miodu",
    "minecraft:sweet_berries": "Słodkie Jagody",
    "minecraft:kelp": "Wodorost",
    "minecraft:dried_kelp": "Suszony Wodorost",
    "minecraft:tropical_fish": "Egzotyczna Rybka",
    "minecraft:pufferfish": "Rozdymka",
    "minecraft:cod": "Dorsz",
    "minecraft:salmon": "Łosoś"
};
export default itemIdToPolish;
export function getPolishItemName(itemId) {
    return itemIdToPolish[itemId] ?? itemId;
}
