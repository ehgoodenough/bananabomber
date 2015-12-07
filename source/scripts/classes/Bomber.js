var Entity = require("./Entity")
var Geometry = require("./Geometry")
var Block = require("./Block")
var Bomb = require("./Bomb")

class Bomber extends Entity {
    constructor(protobomber = new Object()) {
        super()
        this.velocity = new Geometry.Point()
        this.position = new Geometry.Space({
            bx: protobomber.position.bx + 0.5,
            by: protobomber.position.by + 0.5,
            w: BLOCK * 0.618,
            h: BLOCK * 0.618,
        })

        this.inputs = protobomber.inputs || {}
        this.color = protobomber.color || "#111"
        this.isDead = protobomber.isDead || false
        this.speed = protobomber.speed || 4 * BLOCK
        this.prebombs = ["standard", "standard"]
    }
    update(tick) {
        // Input: Move Around
        if(this.inputs["move north"].isDown()) {
            this.velocity.y = -1 * this.speed
        } if(this.inputs["move south"].isDown()) {
            this.velocity.y = +1 * this.speed
        } if(this.inputs["move west"].isDown()) {
            this.velocity.x = -1 * this.speed
        } if(this.inputs["move east"].isDown()) {
            this.velocity.x = +1 * this.speed
        }

        // Collision: Blocks, Bombs
        var positions = this.position.getDeltaBositions({
            x: this.velocity.x * tick
        })
        for(var key in positions) {
            var position = positions[key]
            var bomb = this.game.bombs[key]
            var block = this.game.blocks[key]
            if(position.x < 0 || position.x > this.game.arena.width
            || position.y < 0 || position.y > this.game.arena.height) {
                block = new Block({position: position})
            }
            if(!!bomb || !!block) {
                if(this.velocity.x > 0) {
                    this.position.bx1 = position.bx
                    this.velocity.x = 0
                } else if(this.velocity.x < 0) {
                    this.position.bx0 = position.bx + 1
                    this.velocity.x = 0
                }
            }
        }
        var positions = this.position.getDeltaBositions({
            x: this.velocity.x * tick,
            y: this.velocity.y * tick
        })
        for(var key in positions) {
            var position = positions[key]
            var bomb = this.game.bombs[key]
            var block = this.game.blocks[key]
            if(position.x < 0 || position.x > this.game.arena.width
            || position.y < 0 || position.y > this.game.arena.height) {
                block = new Block({position: position})
            }
            if(!!bomb || !!block) {
                if(this.velocity.y > 0) {
                    this.position.by1 = position.by
                    this.velocity.y = 0
                } else if(this.velocity.y < 0) {
                    this.position.by0 = position.by + 1
                    this.velocity.y = 0
                }
            }
        }

        // Translation
        this.position.x += this.velocity.x * tick
        this.position.y += this.velocity.y * tick

        // Deceleration
        this.velocity.x = 0
        this.velocity.y = 0

        // Input: Drop Bombs
        if(this.inputs["drop bomb"].isJustDown()) {
            if(this.prebombs.length > 0) {
                if(!this.game.bombs[this.position]) {
                    this.game.add("bombs", new Bomb({
                        position: this.position.toPoint(),
                        model: this.prebombs.shift(),
                        bomber: this
                    }))
                }
            }
        }
    }
    render() {
        return {
            color: this.color,
            x: this.position.x0,
            y: this.position.y0,
            width: this.position.w,
            height: this.position.h,
        }
    }
}

export default Bomber
