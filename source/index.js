var Game = require("./scripts/classes/Game")

var Loop = require("./scripts/systems/Loop")
var Input = require("./scripts/systems/Input")
var Renderer = require("./scripts/systems/Renderer")

var Colors = require("./scripts/data/Colors")
var Inputs = require("./scripts/data/Inputs")

window.BLOCK = 32

var game = new Game({
    bombers: [
        {color: Colors.bombers.red, inputs: Inputs["wasd"], position: {bx: 0+2, by: 0+2}},
        {color: Colors.bombers.green, inputs: Inputs["fght"], position: {bx: 17-1-2, by: 0+2}},
        {color: Colors.bombers.blue, inputs: Inputs["jikl"], position: {bx: 0+2, by: 11-1-2}},
        {color: Colors.bombers.purple, inputs: Inputs["arrows"], position: {bx: 17-1-2, by: 11-1-2}},
    ]
})
window.game = game

Loop(function(tick) {
    game.update(tick)
    Renderer.update(game)
})
