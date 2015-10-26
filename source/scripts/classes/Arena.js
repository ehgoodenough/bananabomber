var Entity = require("./Entity")

class Arena extends Entity {
    constructor(protoarena = {}) {
        super(protoarena)
        this.bwidth = protoarena.bwidth
        this.bheight = protoarena.bheight
        this.color = protoarena.color
    }
    render() {
        return {
            color: this.color,
            width: this.bwidth * BLOCK,
            height: this.bheight * BLOCK,
        }
    }
}

export default Arena
