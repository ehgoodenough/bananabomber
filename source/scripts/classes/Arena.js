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
    render() {
        return {
            x: 0, y: 0,
            position: "absolute",
            width: this.width,
            height: this.height,
            color: "#FEF6EB"
        }
    }
}

export default Arena
