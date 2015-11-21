var Point = require("./Point")
var Entity = require("./Entity")

class BoomSmoke extends Entity {
    constructor(protoboomsmoke = new Object()) {
        super()
        this.position = new Point(protoboomsmoke.position)

        this.fade = 0.5
    }
    update(tick) {
        this.fade -= tick
        if(this.fade <= 0) {
            this.game.remove("boomsmokes", this)
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

export default BoomSmoke
