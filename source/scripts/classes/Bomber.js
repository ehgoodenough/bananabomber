var Point = require("./Point")
var Entity = require("./Entity")

class Bomber extends Entity {
    constructor(protobomber = {}) {
        super(protobomber)
        this.position = new Point(protobomber.position)
        this.isDead = protobomber.isDead || false
    }
}

export default Bomber
