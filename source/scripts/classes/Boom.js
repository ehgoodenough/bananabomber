var Geometry = require("./Geometry")
var Entity = require("./Entity")
var Smoke = require("./Smoke")

class Boom extends Entity {
    constructor(protoboom) {
        super()
        this.position = new Geometry.Point(protoboom.position)
        this.intensity = protoboom.intensity || 0

        protoboom.direction = protoboom.direction || "all"
        this.direction = {
            north: protoboom.direction == "north" || protoboom.direction == "all",
            south: protoboom.direction == "south" || protoboom.direction == "all",
            west: protoboom.direction == "west" || protoboom.direction == "all",
            east: protoboom.direction == "east" || protoboom.direction == "all",
        }
    }
    initialize() {
        var block = this.game.blocks[this.position]

        // boom does not reach through walls
        if(!!block && block.type == "wall") {
            this.game.remove("booms", this)
            return
        }

        // boom does not reach outside of arena.
        if(this.position.x < 0 || this.position.x > this.game.arena.width
        || this.position.y < 0 || this.position.y > this.game.arena.height) {
            this.game.remove("booms", this)
            return
        }

        // boom can reach through crates, but
        // unless it is a piercing boom, will
        // stop at the crate.
        if(!!block && block.type == "crate") {
            this.game.remove("blocks", block)
            this.intensity = 0
        }

        // var bomb = this.game.bombs[this.position]
        // if(!!bomb) {
        //     this.intensity = Math.max(this.intensity, bomb.intensity)
        //     this.direction = "all"
        // }

        this.game.add("smoke", new Smoke({
            position: this.position.toPoint()
        }))

        if(this.intensity > 0) {
            if(!!this.direction.north) {
                this.game.add("booms", new Boom({
                    direction: "north",
                    intensity: this.intensity - 1,
                    position: this.position.toPoint({by: -1})
                }))
            } if(!!this.direction.south) {
                this.game.add("booms", new Boom({
                    direction: "south",
                    intensity: this.intensity - 1,
                    position: this.position.toPoint({by: +1})
                }))
            } if(!!this.direction.west) {
                this.game.add("booms", new Boom({
                    direction: "west",
                    intensity: this.intensity - 1,
                    position: this.position.toPoint({bx: -1})
                }))
            } if(!!this.direction.east) {
                this.game.add("booms", new Boom({
                    direction: "east",
                    intensity: this.intensity - 1,
                    position: this.position.toPoint({bx: +1})
                }))
            }
        }

        this.game.remove("booms", this)
    }
}

export default Boom
