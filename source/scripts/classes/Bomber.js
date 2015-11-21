var Point = require("./Point")
var Entity = require("./Entity")
var Bomb = require("./Bomb")

var Input = require("../systems/Input")

class Bomber extends Entity {
    constructor(protobomber = {}) {
        super("Bomber", protobomber)

        this.inputs = protobomber.inputs

        this.position = new Rectangle({
            bx: protobomber.position.bx || 0,
            by: protobomber.position.by || 0,
            w: BLOCK * 0.75,
            h: BLOCK * 0.75,
        })
        this.velocity = new Point()

        this.isDead = protobomber.isDead || false

        this.color = protobomber.color || "#111"
        this.speed = BLOCK * 4

        this.queue = ["standard", "standard"]
    }
    update(tick) {
        // Input
        if(Input.isDown(this.inputs["move north"])) {
            this.velocity.y = -1 * this.speed
        } if(Input.isDown(this.inputs["move south"])) {
            this.velocity.y = +1 * this.speed
        } if(Input.isDown(this.inputs["move west"])) {
            this.velocity.x = -1 * this.speed
        } if(Input.isDown(this.inputs["move east"])) {
            this.velocity.x = +1 * this.speed
        }

        // Collision
        var positions = this.position.getDeltaBlocks({
            x: this.velocity.x * tick
        })
        for(var key in positions) {
            var position = positions[key]
            var bomb = this.game.bombs[key]
            var block = this.game.blocks[key]
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
        var positions = this.position.getDeltaBlocks({
            x: this.velocity.x * tick,
            y: this.velocity.y * tick
        })
        for(var key in positions) {
            var position = positions[key]
            var bomb = this.game.bombs[key]
            var block = this.game.blocks[key]
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

        // More Input
        if(Input.isJustDown(this.inputs["drop bomb"])) {
            if(this.queue.length > 0) {
                if(!this.game.bombs[this.position.toString("block")]) {
                    this.game.add("bombs", new Bomb({
                        type: this.queue.shift(),
                        bomber: this,
                        position: {
                            bx: this.position.bx,
                            by: this.position.by
                        },
                    }))
                }
            }
        }
    }
    render() {
        return {
            color: this.color,
            x: this.position.x,
            y: this.position.y,
            width: this.position.w,
            height: this.position.h,
        }
    }
}

export default Bomber

class Rectangle {
    constructor(protorectangle) {
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0

        if(!!protorectangle.bx) {
            this.bx = protorectangle.bx
        } if(!!protorectangle.by) {
            this.by = protorectangle.by
        } if(!!protorectangle.x) {
            this.x = protorectangle.x
        } if(!!protorectangle.y) {
            this.y = protorectangle.y
        } if(!!protorectangle.w) {
            this.w = protorectangle.w
        } if(!!protorectangle.h) {
            this.h = protorectangle.h
        }
    }
    get bx() {
        return Math.floor(this.x / BLOCK)
    }
    get by() {
        return Math.floor(this.y / BLOCK)
    }
    get bw() {
        return Math.floor(this.width / BLOCK)
    }
    get bh() {
        return Math.floor(this.height / BLOCK)
    }
    set bx(bx) {
        this.x = bx * BLOCK
    }
    set by(by) {
        this.y = by * BLOCK
    }
    set bw(bw) {
        this.w = bw * BLOCK
    }
    set bh(bh) {
        this.h = bh * BLOCK
    }
    get x0() {
        return this.x
    }
    get y0() {
        return this.y
    }
    get x1() {
        return this.x + this.w
    }
    get y1() {
        return this.y + this.h
    }
    set x0(x0) {
        this.x = x0
    }
    set y0(y0) {
        this.y = y0
    }
    set x1(x1) {
        this.x = x1 - this.w
    }
    set y1(y1) {
        this.y = y1 - this.h
    }
    get bx0() {
        return Math.floor(this.x0 / BLOCK)
    }
    get bx1() {
        return Math.floor(this.x1 / BLOCK)
    }
    get by0() {
        return Math.floor(this.y0 / BLOCK)
    }
    get by1() {
        return Math.floor(this.y1 / BLOCK)
    }
    set bx0(bx0) {
        this.x0 = bx0 * BLOCK
    }
    set bx1(bx1) {
        this.x1 = bx1 * BLOCK
    }
    set by0(by0) {
        this.y0 = by0 * BLOCK
    }
    set by1(by1) {
        this.y1 = by1 * BLOCK
    }
    getBlocks(delta={}) {
        delta.x = delta.x || 0
        delta.y = delta.y || 0

        var bx0 = Math.floor((this.x0 + delta.x) / BLOCK)
        var bx1 = Math.ceil((this.x1 + delta.x) / BLOCK)
        var by0 = Math.floor((this.y0 + delta.y) / BLOCK)
        var by1 = Math.ceil((this.y1 + delta.y) / BLOCK)

        var blocks = {}
        for(var bx = bx0; bx < bx1; bx++) {
            for(var by = by0; by < by1; by++) {
                blocks[bx + "x" + by] = new Point({
                    bx: bx, by: by
                })
            }
        }
        return blocks
    }
    getDeltaBlocks(delta={}) {
        var blocks = this.getBlocks()
        var deltablocks = this.getBlocks(delta)

        for(var key in deltablocks) {
            if(blocks[key] != undefined) {
                delete deltablocks[key]
            }
        }
        return deltablocks
    }
    toString(format) {
        if(format == "block") {
            return Math.round(this.bx) + "x" + Math.round(this.by)
        } else {
            return Math.round(this.x) + "x" + Math.round(this.y)
        }
    }
}
