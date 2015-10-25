var Point = require("./Point")

class Block {
    constructor(protoblock) {
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
