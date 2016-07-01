import Loop from "scripts/utility/Loop.js"
import Input from "scripts/utility/Input.js"
import Render from "scripts/utility/Render.js"
import StatDump from "scripts/utility/StatDump.js"

import shortid from "shortid"
function key() {
    return shortid.generate()
}

var DATA = {
    TILES: {
        BLOCK: {
            isBlock: true,
            image: require("images/block.png"),
        },
        BOX: {
            isBlock: true,
            image: require("images/box.png"),
        },
    }
}

function collides(a, b) {
    return !(
           b.position.x - (b.width / 2) > a.position.x + (a.width / 2)
        || b.position.x + (b.width / 2) < a.position.x - (a.width / 2)
        || b.position.y - (b.height / 2) > a.position.y - (a.height / 2)
        || b.position.y + (b.height / 2) < a.position.y - (a.height / 2)
    )
}

class PlayerBomber {
    constructor(bomber) {
        this.inputs = bomber.inputs || {undefined: undefined}
        this.position = bomber.position || {x: 0, y: 0}
        this.width = 26
        this.height = 26

        this.color = "#577F46"
        this.hasBorder = true

        this.velocity = {x: 0, y: 0}
        this.speed = 5
    }
    update(time) {
        if(this.inputs["north"].isDown()) {
            this.move({y: -1 * this.speed})
        } if(this.inputs["south"].isDown()) {
            this.move({y: +1 * this.speed})
        } if(this.inputs["west"].isDown()) {
            this.move({x: -1 * this.speed})
        } if(this.inputs["east"].isDown()) {
            this.move({x: +1 * this.speed})
        }
    }
    move(movement) {
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0

        // this.game.tiles.forEach((tile) => {
        //     if(collides(tile, {position: this.position, width: 10, height: 10})) {
        //         movement.x = 0
        //         movement.y = 0
        //     }
        // })

        this.position.x += movement.x
        this.position.y += movement.y
    }
}

class Tile {
    constructor(tile = {}) {
        this.position = tile.position || {x: 0, y: 0}
        this.image = tile.type.image || require("images/box.png")
        this.isBlock = tile.type.isBlock || false

        this.width = 32
        this.height = 32

        this.key = shortid.generate()
    }
}

class Game {
    constructor() {
        this.players = []
        this.add("players", new PlayerBomber({
            position: {
                x: 640 / 2 + 32,
                y: 360 / 2,
            },
            inputs: {
                "north": new Input(["<up>", "W"]),
                "south": new Input(["<down>", "S"]),
                "west": new Input(["<left>", "A"]),
                "east": new Input(["<right>", "D"]),
            }
        }))

        this.tiles = new Array()
        for(var x = 32 * 4; x < 32 * 17; x += 32) {
            for(var y = 32 * 3; y < 32 * 9; y += 32) {
                if(x / 32 % 2 == 0 && y / 32 % 2 == 0) {
                    this.tiles.push(new Tile({
                        position: {x: x, y: y},
                        type: DATA.TILES.BLOCK,
                    }))
                }
            }
        }
    }
    add(label, entity) {
        this[label] = this[label] || []
        this[label].push(entity)

        entity.game = this
        entity.key = key()
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
        height: 352,
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
