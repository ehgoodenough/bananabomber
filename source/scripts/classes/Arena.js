var Entity = require("./Entity")
var Block = require("./Block")

var Colors = require("../data/Colors")

class Arena extends Entity {
    constructor(protoarena = {}) {
        super(protoarena)
        this.bwidth = protoarena.bwidth
        this.bheight = protoarena.bheight
    }
}

export default Arena
