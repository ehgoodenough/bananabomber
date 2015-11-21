var Geometry = require("./Geometry")
var Entity = require("./Entity")

class Smoke extends Entity {
    constructor(protosmoke = new Object()) {
        super()
        this.position = new Geometry.Point(protosmoke.position)

        this.fade = 0.5
    }
    update(tick) {
        this.fade -= tick
        if(this.fade <= 0) {
            this.game.remove("smoke", this)
        }
    }
    render() {
        return {
            width: BLOCK,
            height: BLOCK,
            color: "#BBB",
            x: this.position.x,
            y: this.position.y,
        }
    }
}

export default Smoke
