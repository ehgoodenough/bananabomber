window.World = require("<scripts>/classes/World")
window.Monkey = require("<scripts>/classes/Monkey")
window.Bomb = require("<scripts>/classes/Bomb")
window.Explosion = require("<scripts>/classes/Explosion")

var Assets = require("<scripts>/data/Assets")
var Inputs = require("<scripts>/data/Inputs")

window.Game.data = {
    monkeys: {
        0: new Monkey({
            "position": {
                "x": 1.5,
                "y": 1.5
            },
            "inputs": Inputs["red monkey"],
            "images": Assets.images["red monkey"],
        }),
        1: new Monkey({
            "position": {
                "x": 17.5,
                "y": 1.5
            },
            "inputs": Inputs["green monkey"],
            "images": Assets.images["green monkey"],
        }),
        2: new Monkey({
            "position": {
                "x": 1.5,
                "y": 11.5
            },
            "inputs": Inputs["blue monkey"],
            "images": Assets.images["blue monkey"],
        }),
        3: new Monkey({
            "position": {
                "x": 17.5,
                "y": 11.5
            },
            "inputs": Inputs["purple monkey"],
            "images": Assets.images["purple monkey"],
        })
    },
    world: new World(),
    bombs: {},
    explosions: {},
    explosionsmoke: {},
}

window.GameStore = Phlux.createStore({
    initiateStore: function() {
        this.data = Game.data
    },
    update: function(tick) {
        for(var key in this.data.monkeys) {
            var monkey = this.data.monkeys[key]
            monkey.update(tick)
        }
        for(var key in this.data.bombs) {
            var bomb = this.data.bombs[key]
            bomb.update(tick)
        }
        for(var key in this.data.explosions) {
            var explosion = this.data.explosions[key]
            explosion.update(tick)
        }
        for(var key in this.data.explosionsmoke) {
            var explosionsmoke = this.data.explosionsmoke[key]
            explosionsmoke.update(tick)
        }
        this.trigger()
    }
})

module.exports = GameStore
