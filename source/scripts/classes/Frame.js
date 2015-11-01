var Entity = require("./Entity.js")

class Frame extends Entity{
    constructor(protoframe = {}) {
        super(protoframe)
        this.width = protoframe.width
        this.height = protoframe.height
        this.color = protoframe.color
    }
}

export default Frame
