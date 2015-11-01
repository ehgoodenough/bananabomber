var Point = require("./Point")
var Entity = require("./Entity")

class Block extends Entity {
    constructor(protoblock = {}) {
        super(protoblock)
        this.density = protoblock.density || 0
        this.position = new Point(protoblock.position)
        this.color = protoblock.color || "brown"
    }
    render() {
        return {
            width: BLOCK,
            height: BLOCK,
            x: this.position.x,
            y: this.position.y,
            color: this.color,
        }
    }
}

export default Block
