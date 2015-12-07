var Game = require("./scripts/classes/Game")

var Loop = require("./scripts/systems/Loop")
var Renderer = require("./scripts/systems/Renderer")

var Colors = require("./scripts/data/Colors")
var Inputs = require("./scripts/data/Inputs")

window.BLOCK = 32

var game = window.game = new Game()

var bombers = [
    {color: Colors.bombers.red, inputs: Inputs["wasd"], position: {bx: 0+2, by: 0+2}},
    {color: Colors.bombers.green, inputs: Inputs["fght"], position: {bx: 17-1-2, by: 0+2}},
    {color: Colors.bombers.blue, inputs: Inputs["jikl"], position: {bx: 0+2, by: 11-1-2}},
    {color: Colors.bombers.purple, inputs: Inputs["arrows"], position: {bx: 17-1-2, by: 11-1-2}},
]

var ShortID = require("shortid")

var Block = require("./scripts/classes/Block")
var Arena = require("./scripts/classes/Arena")
var Camera = require("./scripts/classes/Camera")
var Bomber = require("./scripts/classes/Bomber")
var Frame = require("./scripts/classes/Frame")
var Entity = require("./scripts/classes/Entity")

var Colors = require("./scripts/data/Colors")
var Inputs = require("./scripts/data/Inputs")

game.put("frame", new Frame({
    width: 1280, height: 720,
    color: "#BEB9B5"
}))

game.put("arena", new Arena({
    bwidth: 17,
    bheight: 11,
}))

game.put("camera", new Camera({
    position: {x: 0, y: 0},
    padding: 2 * BLOCK,
}))

for(var bx = 0; bx < game.arena.bwidth; bx++) {
    for(var by = 0; by < game.arena.bheight; by++) {
        if(bx % 2 == 0 || by % 2 == 0) {
            var hasBomber = false
            for(var index in bombers) {
                var protobomber = bombers[index]
                if(Math.abs(protobomber.position.bx - bx) < 2
                && Math.abs(protobomber.position.by - by) < 2) {
                    hasBomber = true
                }
            }
            if(!hasBomber) {
                game.add("blocks", new Block({
                    position: {bx: bx, by: by},
                    color: Colors.crates[Math.floor(Math.random() * Colors.crates.length)],
                    rotation: Math.floor(Math.random() * 12) - 6,
                    type: "crate"
                }))
            }
        } else {
            game.add("blocks", new Block({
                position: {bx: bx, by: by},
                color: Colors.arena.darkblue,
                type: "wall"
            }))
        }
    }
}

for(var index in bombers) {
    var protobomber = bombers[index]
    game.add("bombers", new Bomber(protobomber))
}

game.bombs = {}

Loop((tick) => {
    game.update(tick)
    Renderer.update(game)
})
