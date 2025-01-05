import * as server from '@minecraft/server'
import { spawnCenter } from '../main'

const dimension = server.world.getDimension('overworld')


export function spawnVisuals() {
    griffinSpinner()
    spawnMusic()
}

function griffinSpinner() {
    server.system.runInterval(() => {
        dimension.spawnParticle('brainrot:peter_griffinplus', spawnCenter)
        dimension.spawnParticle('brainrot:peter_griffinminus', spawnCenter)
    }, 60)
}

function spawnMusic() {
    dimension.playSound('spawn.title_theme', spawnCenter, {volume: 0.5})
    server.system.runInterval(() => {
        dimension.playSound('spawn.title_theme', spawnCenter)
    }, 56*20)
}