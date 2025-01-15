import * as server from '@minecraft/server'

const diamondBoots = new server.ItemStack('minecraft:diamond_boots', 1)
diamondBoots.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {diamondBoots}

const diamondChestplate = new server.ItemStack('minecraft:diamond_chestplate', 1)
diamondChestplate.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {diamondChestplate}

const diamondHelmet = new server.ItemStack('minecraft:diamond_helmet', 1)
diamondHelmet.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {diamondHelmet}

const diamondLeggings = new server.ItemStack('minecraft:diamond_leggings', 1)
diamondLeggings.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {diamondLeggings}

const diamondSword = new server.ItemStack('minecraft:diamond_sword', 1)
diamondSword.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("sharpness"), level: 5}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {diamondSword}

const netheriteChestplate = new server.ItemStack('minecraft:netherite_chestplate', 1)
netheriteChestplate.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheriteChestplate}

const netheriteHelmet = new server.ItemStack('minecraft:netherite_helmet', 1)
netheriteHelmet.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheriteHelmet}

const netheriteLeggings = new server.ItemStack('minecraft:netherite_leggings', 1)
netheriteLeggings.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheriteLeggings}

const netheriteSword = new server.ItemStack('minecraft:netherite_sword', 1)
netheriteSword.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("sharpness"), level: 5}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheriteSword}

const netheriteBoots = new server.ItemStack('minecraft:netherite_boots', 1)
netheriteBoots.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("protection"), level: 4}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheriteBoots}

const netheritePickaxe = new server.ItemStack('minecraft:netherite_pickaxe', 1)
netheritePickaxe.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("efficiency"), level: 5}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheritePickaxe}

const netheriteAxe = new server.ItemStack('minecraft:netherite_axe', 1)
netheriteAxe.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("efficiency"), level: 5}, {type: server.EnchantmentTypes.get("unbreaking"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {netheriteAxe}

const loyaltyTrident = new server.ItemStack('minecraft:trident', 1)
loyaltyTrident.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("loyalty"), level: 3}, {type: server.EnchantmentTypes.get("impaling"), level: 5}, {type: server.EnchantmentTypes.get("channeling"), level: 1}, {type: server.EnchantmentTypes.get("mending"), level: 1}])
export {loyaltyTrident}

const riptideTrident = new server.ItemStack('minecraft:trident', 1)
riptideTrident.getComponent("enchantable").addEnchantments([{type: server.EnchantmentTypes.get("riptide"), level: 3}, {type: server.EnchantmentTypes.get("mending"), level: 1}, {type: server.EnchantmentTypes.get("impaling"), level: 5}])
export {riptideTrident}