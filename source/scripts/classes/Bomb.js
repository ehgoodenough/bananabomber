var Bomb = function(protobomb) {
    this.position = protobomb.position || {}
    this.position.x = protobomb.position.x + 0.5 || 0.5
    this.position.y = protobomb.position.y + 0.5 || 0.5

    this.type = protobomb.type || "regular"
    this.monkey = protobomb.monkey || undefined
    this.maxfuse = this.fuse = protobomb.fuse || 3

    this.intensity = protobomb.intensity || 1
}

Bomb.prototype.getStyle = function() {
    var easeInOutQuint = function (t) {return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t}
    var ease = easeInOutQuint(1 - (this.fuse / this.maxfuse))

    var red = Math.floor(255 * ease)
    var width = Math.abs(Math.sin(Math.pow(this.fuse, 2.5))) * 0.4 + 0.5
    var height = Math.abs(Math.cos(Math.pow(this.fuse, 2.5))) * 0.4 + 0.5
    var x = this.position.x - (width / 2)
    var y = this.position.y - (height / 2)
    var z = Math.round((this.position.y - 0.5) * 100)
    return {
        "zIndex": z,
        "top": y + "em",
        "left": x + "em",
        "width": width + "em",
        "height": height + "em",
        "backgroundColor": "rgb(" + red + ", 0, 0)",
        "borderRadius": "99999%",
        "position": "absolute",
    }
}

Bomb.prototype.update = function(tick) {
    this.fuse -= tick
    if(this.fuse <= 0) {
        Game.camera.shake += 0.5
        new Explosion({
            "intensity": this.intensity,
            "position": this.position,
        })

        var count = 0
        var last_monkey = null
        for(var index in Game.monkeys) {
            var monkey = Game.monkeys[index]
            if(!monkey.isDead) {
                last_monkey = monkey
                count += 1
            }
        }
        if(count == 1) {
            console.log(last_monkey.color + " wins")
            Start()
        } else if(count == 0) {
            console.log("nobody wins")
            Start()
        }
    }
}

Bomb.prototype.explode = function() {
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    delete Game.bombs[x + "x" + y]

    if(this.monkey != undefined) {
        this.monkey.bombqueue.push(this.type)
    }
}

module.exports = Bomb
