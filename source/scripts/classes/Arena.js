var Entity = require("./Entity")

class Arena extends Entity {
    constructor(protoarena = {}) {
        super(protoarena)
        this.x = protoarena.x
        this.y = protoarena.y
        this.width = protoarena.width
        this.height = protoarena.height
        this.image = protoarena.image
    }
}

export default Arena
