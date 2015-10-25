var Camera = function() {
    this.position = {
        x: 0, y: 0
    }

    this.shake = 0
    this.speed = 10
    this.direction = +10
}

Camera.prototype.update = function(tick) {
    var monkeys = this.getActiveMonkeys()
    var field = this.getField(monkeys, {
        padding: TILE
    })

    var zoom = {
        x: FRAME_WIDTH / field.width,
        y: FRAME_HEIGHT / field.height
    }

    var target = {}
    target.zoom = Math.min(zoom.x, zoom.y)
    target.width = FRAME_WIDTH / target.zoom
    target.height = FRAME_HEIGHT / target.zoom
    target.x = field.x - (Math.abs(target.width - field.width) / 2)
    target.y = field.y - (Math.abs(target.height - field.height) / 2)

    this.position.x = target.x
    this.position.y = target.y
    this.zoom = target.zoom
}

Camera.prototype.getActiveMonkeys = function() {
    var monkeys = []
    for(var key in Game.monkeys) {
        var monkey = Game.monkeys[key]
        if(monkey.isDead == false) {
            monkeys.push(monkey)
        }
    }
    return monkeys
}

Camera.prototype.getField = function(monkeys, options) {
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
    var padding = options.padding || 0
    x0 -= padding
    x1 += padding
    y0 -= padding
    y1 += padding
    return {
        x: x0,
        y: y0,
        width: x1 - x0,
        height: y1 - y0
    }
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
