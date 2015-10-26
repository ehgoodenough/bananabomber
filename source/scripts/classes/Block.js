var Point = require("./Point")
var Entity = require("./Entity")

class Block extends Entity {
    constructor(protoblock = {}) {
        super(protoblock)
        this.type = protoblock.type || "wall"
        this.position = new Point(protoblock.position)
    }
    render() {
        return {
            color: "red",
            width: BLOCK,
            height: BLOCK,
            x: this.position.x,
            y: this.position.y,
        }
    }
}

export default Block
