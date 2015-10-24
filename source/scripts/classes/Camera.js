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

    var xdiff = x1 - x0
    var ydiff = y1 - y0

    var xzoom = FRAME_WIDTH / xdiff
    var yzoom = FRAME_HEIGHT / ydiff

    if(xzoom < yzoom) {
        this.zoom = xzoom
        this.position.x = x0

        var new_height = FRAME_HEIGHT / xzoom
        this.position.y = y0 - (Math.abs(new_height - ydiff) / 2)
    } else {
        this.zoom = yzoom
        this.position.y = y0

        var new_width = FRAME_WIDTH / yzoom
        this.position.x = x0 - (Math.abs(new_width - xdiff) / 2)
    }

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
