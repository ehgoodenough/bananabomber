var Geometry = require("./Geometry")
var Entity = require("./Entity")

class Block extends Entity {
    constructor(protoblock = {}) {
        super()
        this.type = protoblock.type || "wall"
        this.rotation = protoblock.rotation || 0
        this.color = protoblock.color || "brown"

        this.position = new Geometry.Point(protoblock.position)
        this.id = this.position.toString()
    }
    render() {
        if(this.type == "wall") {
            return {
                width: BLOCK,
                height: BLOCK,
                x: this.position.x,
                y: this.position.y,
                color: this.color,
            }
        } else if(this.type == "crate") {
            return {
                width: BLOCK * 0.85,
                height: BLOCK * 0.85,
                rotation: this.rotation,
                x: this.position.x + ((BLOCK - (BLOCK * 0.85)) / 2),
                y: this.position.y + ((BLOCK - (BLOCK * 0.85)) / 2),
                color: this.color,
            }
        }
    }
}

export default Block
