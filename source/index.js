import Loop from "scripts/utility/Loop.js"
import Input from "scripts/utility/Input.js"
import Render from "scripts/utility/Render.js"
import StatDump from "scripts/utility/StatDump.js"

var game = {
    frame: {
        width: 640,
        height: 360
    },
    player: {
        color: "#C00",
        position: {x: 0, y: 0},
        width: 32, height: 32,
        speed: 10,
        inputs: {
            "north": new Input(["<up>", "W"]),
            "south": new Input(["<down>", "S"]),
            "west": new Input(["<left>", "A"]),
            "east": new Input(["<right>", "D"]),
        }
    }
}

var loop = new Loop(function(delta) {
    if(game.player.inputs["north"].isDown()) {
        game.player.position.y -= game.player.speed
    } if(game.player.inputs["south"].isDown()) {
        game.player.position.y += game.player.speed
    } if(game.player.inputs["west"].isDown()) {
        game.player.position.x -= game.player.speed
    } if(game.player.inputs["east"].isDown()) {
        game.player.position.x += game.player.speed
    }

    Render.update({"game": game})
})
