var World = require("<scripts>/classes/World")
var Monkey = require("<scripts>/classes/Monkey")
var Bomb = require("<scripts>/classes/Bomb")

var Assets = require("<scripts>/data/Assets")
var Inputs = require("<scripts>/data/Inputs")

var GameStore = Phlux.createStore({
    initiateStore: function() {
        window.Game.data = this.data = {
            monkeys: {
                0: new Monkey({
                    "position": {
                        "x": 1.5,
                        "y": 1.5
                    },
                    "images": {
                        "monkey": Assets.images["red monkey"],
                        "ghost monkey": Assets.images["red ghost monkey"],
                    },
                    "input": Inputs[0]
                }),
                1: new Monkey({
                    "position": {
                        "x": 17.5,
                        "y": 1.5
                    },
                    "images": {
                        "monkey": Assets.images["blue monkey"],
                        "ghost monkey": Assets.images["blue ghost monkey"],
                    },
                    "input": Inputs[1]
                }),
                2: new Monkey({
                    "position": {
                        "x": 1.5,
                        "y": 11.5
                    },
                    "images": {
                        "monkey": Assets.images["green monkey"],
                        "ghost monkey": Assets.images["green ghost monkey"],
                    },
                    "input": Inputs[2]
                }),
                3: new Monkey({
                    "position": {
                        "x": 17.5,
                        "y": 11.5
                    },
                    "images": {
                        "monkey": Assets.images["purple monkey"],
                        "ghost monkey": Assets.images["purple ghost monkey"],
                    },
                    "input": Inputs[3]
                })
            },
            world: new World(),
            bombs: {},
            explosions: {},
        }
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
        this.trigger()
    }
})

module.exports = GameStore
