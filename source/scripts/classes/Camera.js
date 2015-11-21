var Geometry = require("./Geometry")
var Entity = require("./Entity")

class Camera extends Entity {
    constructor(protocamera = new Object()) {
        super()
        this.position = new Geometry.Point(protocamera.position)
        this.padding = protocamera.padding || BLOCK
    }
    update(tick) {
        var bombers = this.game.get("bombers", {isDead: false})
        //var rectangle = new Rectangle(bombers.map(function(bomber) {
        //    return bomber.position
        //}))
        var rectangle = new Rectangle([
            new Geometry.Point({bx: 0, by: 0}),
            new Geometry.Point({bx: 17, by: 11 })
        ])

        rectangle.x0 -= this.padding
        rectangle.x1 += this.padding
        rectangle.y0 -= this.padding
        rectangle.y1 += this.padding

        this.position.z = Math.min(
            this.game.frame.width / rectangle.width,
            this.game.frame.height / rectangle.height)
        this.width = this.game.frame.width / this.position.z
        this.height = this.game.frame.height / this.position.z
        this.position.x = rectangle.x - (Math.abs(this.width - rectangle.width) / 2)
        this.position.y = rectangle.y - (Math.abs(this.height - rectangle.height) / 2)
    }
}

export default Camera

class Rectangle {
    constructor(points = []) {
        this.x0 = Number.MAX_VALUE
        this.x1 = Number.MIN_VALUE
        this.y0 = Number.MAX_VALUE
        this.y1 = Number.MIN_VALUE
        for(var index in points) {
            if(points[index].x < this.x0) {
                this.x0 = points[index].x
            } if(points[index].x > this.x1) {
                this.x1 = points[index].x
            } if(points[index].y < this.y0) {
                this.y0 = points[index].y
            } if(points[index].y > this.y1) {
                this.y1 = points[index].y
            }
        }
    }

    get x() {
        return this.x0
    }
    get y() {
        return this.y0
    }
    get width() {
        return this.x1 - this.x0
    }
    get height() {
        return this.y1 - this.y0
    }

    set x(x) {
        this.x1 += x - this.x0
        this.x0 = x
    }
    set y(y) {
        this.y1 += y - this.y0
        this.y0 = y
    }
    set width(width) {
        this.x1 = this.x0 + width
    }
    set height(height) {
        this.y1 = this.y0 + height
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
    get bx() {
        return Math.floor(this.x / BLOCK)
    }
    get by() {
        return Math.floor(this.y / BLOCK)
    }
    get bwidth() {
        return Math.floor(this.width / BLOCK)
    }
    get bheight() {
        return Math.floor(this.height / BLOCK)
    }

    set bx0(bx0) {
        this.x0 = bx0 * BLOCK
    }
    set bx1(bx1) {
        this.x1 = bx1 * BLOCK
    }
    set by0(by0) {
        this.y0 = by1 * BLOCK
    }
    set by1(by1) {
        this.y1 = by1 * BLOCK
    }
    set bx(bx) {
        this.x = bx * BLOCK
    }
    set by(by) {
        this.y = y * BLOCK
    }
    set bwidth(bwidth) {
        this.width = bwidth * BLOCK
    }
    set bheight(bheight) {
        this.height = bheight * BLOCK
    }
}
