var Point = require("./Point")
var Entity = require("./Entity")

var Input = require("../systems/Input")

class Bomber extends Entity {
    constructor(protobomber = {}) {
        super("Bomber", protobomber)

        this.width = BLOCK * 0.75
        this.height = BLOCK * 0.75

        if(!!protobomber.position) {
            this.position = new Point(protobomber.position)
        } else {
            this.position = new Point()
        }

        this.position.x += this.width / 2
        this.position.y += this.height / 2
        this.position.x += (BLOCK - this.width) / 2
        this.position.y += (BLOCK - this.height) / 2

        this.velocity = new Point()
        this.isDead = protobomber.isDead || false
        this.color = protobomber.color || "#111"
        this.speed = protobomber.speed || (BLOCK * 4)
        this.inputs = protobomber.inputs
    }
    update(tick) {
        if(Input.isDown(this.inputs["move north"])) {
            this.velocity.y = -1 * this.speed
        } if(Input.isDown(this.inputs["move south"])) {
            this.velocity.y = +1 * this.speed
        } if(Input.isDown(this.inputs["move west"])) {
            this.velocity.x = -1 * this.speed
        } if(Input.isDown(this.inputs["move east"])) {
            this.velocity.x = +1 * this.speed
        }

        this.position.x += this.velocity.x * tick
        this.position.y += this.velocity.y * tick

        this.velocity.x = 0
        this.velocity.y = 0
    }
    render() {
        return {
            color: this.color,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2),
            width: this.width,
            height: this.height,
        }
    }
}

export default Bomber
