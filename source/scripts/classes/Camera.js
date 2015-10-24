var Camera = function() {
    this.position = {
        x: 0, y: 0
    }

    this.shake = 0
    this.direction = +10
}

Camera.prototype.update = function(tick) {
    // get a list of all monkeys alive
    // to frame in the camera.
    var monkeys = []
    for(var key in Game.monkeys) {
        var monkey = Game.monkeys[key]
        if(monkey.isDead == false) {
            monkeys.push(monkey)
        }
    }
    // in case no monkeys are alive,
    // provide *something* to look at.
    if(monkeys.length == 0) {
        monkeys.push({
            position: {
                x: this.position.x,
                y: this.position.y
            }
        })
    }
    var x0 = Number.MAX_VALUE
    var x1 = Number.MIN_VALUE
    var y0 = Number.MAX_VALUE
    var y1 = Number.MIN_VALUE
    for(var index in monkeys) {
        var monkey = monkeys[index]
        if(monkey.position.x < x0) {
            x0 = monkey.position.x
        } if(monkey.position.x > x1) {
            x1 = monkey.position.x
        } if(monkey.position.y < y0) {
            y0 = monkey.position.y
        } if(monkey.position.y > y1) {
            y1 = monkey.position.y
        }
    }
    this.position.x = x0
    this.position.y = y0

    var frame_width = 640
    var camera_framing_width = x1 - x0
    var frame_height = 480
    var camera_framing_height = y1 - y0

    var xzoom = frame_width / camera_framing_width
    var yzoom = frame_height / camera_framing_height

    this.zoom = Math.min(xzoom, yzoom)

    /*if(this.shake > 0) {
        this.shake -= tick
        if(this.shake < 0) {
            this.shake = 0
        }
    }*/
}

Camera.prototype.getStyle = function() {
    return {
        position: "absolute",
        top: (this.position.y * -1) + "em",
        left: (this.position.x * -1) + "em",
        fontSize: this.zoom + "em",
    }
}

module.exports = Camera
