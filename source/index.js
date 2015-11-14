var Game = require("./scripts/classes/Game")

var Loop = require("./scripts/systems/Loop")
var Input = require("./scripts/systems/Input")
var Renderer = require("./scripts/systems/Renderer")

var Colors = require("./scripts/data/Colors")
var Inputs = require("./scripts/data/Inputs")

window.BLOCK = 32

var game = new Game({
    bombers: [
        {color: Colors.bombers.red, inputs: Inputs["wasd"]},
        {color: Colors.bombers.green, inputs: Inputs["fght"]},
        {color: Colors.bombers.blue, inputs: Inputs["jikl"]},
        {color: Colors.bombers.purple, inputs: Inputs["arrows"]},
    ]
})

Loop(function(tick) {
    game.update(tick)
    Renderer.update(game)
})
