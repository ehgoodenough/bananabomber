var Point = require("./point")
var Entity = require("./Entity")

class Bomb extends Entity {
    constructor(protobomb) {
        super(protobomb)
        this.position = new Point(protobomb.position)
        this.id = this.position.toString("block")
        this.position.x += BLOCK * 0.5
        this.position.y += BLOCK * 0.5
        this.radius = BLOCK * 0.9 * 0.5
    }
    render() {
        return {
            color: "#111",
            x: this.position.x - this.radius,
            y: this.position.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2,
            roundness: this.radius,
        }
    }
}

export default Bomb
