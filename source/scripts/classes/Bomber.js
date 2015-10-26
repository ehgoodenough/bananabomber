var Point = require("./Point")
var Entity = require("./Entity")

var Input = require("../systems/Input")

class Bomber extends Entity {
    constructor(protobomber = {}) {
        super(protobomber)
        this.width = protobomber.width || BLOCK
        this.height = protobomber.height || BLOCK
        this.position = new Point(protobomber.position)
        this.isDead = protobomber.isDead || false
        this.color = protobomber.color || "#CCC"
        this.speed = protobomber.speed || 100
        this.inputs = protobomber.inputs
    }
    update(tick) {
        if(Input.isDown(this.inputs["move north"])) {
            this.position.y -= this.speed * tick
        } if(Input.isDown(this.inputs["move south"])) {
            this.position.y += this.speed * tick
        } if(Input.isDown(this.inputs["move west"])) {
            this.position.x -= this.speed * tick
        } if(Input.isDown(this.inputs["move east"])) {
            this.position.x += this.speed * tick
        }
    }
    render() {
        return {
            width: this.width,
            height: this.height,
            x: this.position.x,
            y: this.position.y,
            color: this.color,
        }
    }
}

export default Bomber
