var Geometry = require("./Geometry")
var Entity = require("./Entity")
var Boom = require("./Boom")

class Bomb extends Entity {
    constructor(protobomb) {
        super()
        this.position = new Geometry.Point(protobomb.position)
        this.position.x += BLOCK * 0.5
        this.position.y += BLOCK * 0.5
        this.size = BLOCK * 0.9

        this.id = this.position.toString()

        this.bomber = protobomb.bomber
        this.model = protobomb.model
        this.fuse = 1
        this.intensity = 2
    }
    render() {
        return {
            color: "#111",
            width: this.size,
            height: this.size,
            roundness: this.size,
            x: this.position.x - (this.size / 2),
            y: this.position.y - (this.size / 2),
        }
    }
    update(tick) {
        this.fuse -= tick
        if(this.fuse <= 0) {
            this.game.remove("bombs", this)
            this.bomber.prebombs.push(this.model)
            this.game.add("booms", new Boom({
                position: this.position.toPoint(),
                intensity: this.intensity
            }))
        }
    }
}

export default Bomb
