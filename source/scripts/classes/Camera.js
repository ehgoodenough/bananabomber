var Point = require("./Point")
var Rectangle = require("./Rectangle")
var Frame = require("./Frame")

class Camera {
    constructor(protocamera = {}) {
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
            Frame.width / rectangle.width,
            Frame.height / rectangle.height)
        this.width = Frame.width / this.position.z
        this.height = Frame.height / this.position.z
        this.position.x = rectangle.x - (Math.abs(this.width - rectangle.width) / 2)
        this.position.y = rectangle.y - (Math.abs(this.height - rectangle.height) / 2)
    }
}

// width/height vs w/h?
// frame shouldnt be static class
// rectangle be two points?

export default Camera
