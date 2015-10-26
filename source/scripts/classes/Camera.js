var Point = require("./Point")
var Rectangle = require("./Rectangle")
var Entity = require("./Entity")

class Camera extends Entity {
    constructor(protocamera = {}) {
        super(protocamera)
        this.position = new Point(protocamera.position)
        this.padding = protocamera.padding || BLOCK
    }
    update(tick) {
        var bombers = this.game.get("bombers", {isDead: false})
        var rectangle = new Rectangle(bombers.map(function(bomber) {
            return bomber.position
        }))

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
