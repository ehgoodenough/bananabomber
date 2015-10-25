var Point = require("<scripts>/classes/Point")

class Block {
    constructor(protoblock) {
        this.position = new Point(protoblock.position)
    }
}

export default Block
