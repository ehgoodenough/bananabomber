var Point = require("./point")
var Entity = require("./Entity")

class Bomb extends Entity {
    constructor(protobomb) {
        super(protobomb)
        this.position = new Point(protobomb.position)
        this.position.x += BLOCK * 0.5
        this.position.y += BLOCK * 0.5
        this.size = BLOCK * 0.9

        this.id = this.position.toString("block")

        this.bomber = protobomb.bomber
        this.type = protobomb.type
        this.fuse = 1
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
            console.log("boom")
            this.game.remove("bombs", this)
            this.bomber.queue.push(this.type)
        }
    }
}

export default Bomb
