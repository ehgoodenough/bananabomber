import Loop from "scripts/utility/Loop.js"
import Input from "scripts/utility/Input.js"
import Render from "scripts/utility/Render.js"
import StatDump from "scripts/utility/StatDump.js"

import shortid from "shortid"

class PlayerBomber {
    constructor(bomber = {}) {
        this.inputs = bomber.inputs || {undefined: undefined}
        this.position = bomber.position || {x: 0, y: 0}
        this.width = 26
        this.height = 26

        this.color = "#577F46"
        this.hasBorder = true

        this.speed = 5

        this.key = shortid.generate()
    }
    update(time = 0) {
        if(this.inputs["north"].isDown()) {
            this.position.y -= this.speed
        } if(this.inputs["south"].isDown()) {
            this.position.y += this.speed
        } if(this.inputs["west"].isDown()) {
            this.position.x -= this.speed
        } if(this.inputs["east"].isDown()) {
            this.position.x += this.speed
        }
    }
}

class Tile {
    constructor(tile = {}) {
        this.position = tile.position || {x: 0, y: 0}
        this.image = require("images/box.png")
        this.color = "hotpink"

        this.width = 32
        this.height = 32

        this.key = shortid.generate()
    }
}

class Game {
    constructor() {
        this.players = [
            new PlayerBomber({
                position: {
                    x: 640 / 2,
                    y: 360 / 2,
                },
                inputs: {
                    "north": new Input(["<up>", "W"]),
                    "south": new Input(["<down>", "S"]),
                    "west": new Input(["<left>", "A"]),
                    "east": new Input(["<right>", "D"]),
                }
            }),
        ]

        this.tiles = [
            new Tile({
                position: {
                    x: 32 * 4,
                    y: 32 * 3,
                }
            })
        ]
    }
    get entities() {
        return new Array()
            .concat(this.players)
            .concat(this.tiles)
    }
    update(time = 0) {
        this.players.forEach((player) => {
            player.update(time)
        })
    }
}

var state = {
    frame: {
        width: 640,
        height: 360,
        color: "#453e66",
    },
    inputs: {
        "red": {
            "north": new Input("<up>"),
            "south": new Input("<down>"),
            "west": new Input("<left>"),
            "east": new Input("<right>"),
        },
        "blue": {
            "north": new Input("W"),
            "south": new Input("S"),
            "west": new Input("A"),
            "east": new Input("D"),
        },
    },
    game: new Game()
}

var loop = new Loop(function(delta) {
    state.game.update(delta)
    Render.setState(state)
})
