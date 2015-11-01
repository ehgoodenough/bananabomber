var Point = require("./Point")
var Entity = require("./Entity")

var Input = require("../systems/Input")

class Bomber extends Entity {
    constructor(protobomber = {}) {
        super("Bomber", protobomber)

        if(!!protobomber.position) {
            this.position = new Point(protobomber.position)
        } else {
            //var cratekey = Object.keys(this.game.arena.crates)[Math.floor(Math.random() * Object.keys(this.game.arena.crates).length)]
            //var crate = this.game.arena.crates[cratekey]
            //this.game.remove("blocks", crate)
            //this.position = new Point(crate.position)
            this.position = new Point()
        }

        var bx = this.position.bx
        var by = this.position.by
        //get all crates (not blocks) around you
        //pick on at random
        //get all crates (not blocks) around you and the random crate
        //pick a different one at random
        //remove those two blocks

        this.width = protobomber.width || BLOCK
        this.height = protobomber.height || BLOCK
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
            x: this.position.x,
            y: this.position.y,
            width: this.width,
            height: this.height,
        }
    }
}

export default Bomber
