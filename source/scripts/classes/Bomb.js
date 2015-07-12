var Explosion = require("<scripts>/classes/Explosion")

var Bomb = function(protobomb) {
    this.position = protobomb.position || {}
    this.position.x = protobomb.position.x + 0.5 || 1.5
    this.position.y = protobomb.position.y + 0.5 || 1.5
    
    this.type = protobomb.type || "regular",
    this.monkey = protobomb.monkey || null
    
    this.width = 0.8
    this.height = 0.8
    
    this.fuse = protobomb.duration || 3
    
    this.intensity = protobomb.intensity || 1
}

Bomb.prototype.getWidth = function() {
    return Math.abs(Math.sin(this.fuse * 3)) * 0.6 + 0.2
}

Bomb.prototype.getHeight = function() {
    return Math.abs(Math.cos(this.fuse * 3)) * 0.6 + 0.2
}

Bomb.prototype.getColor = function() {
    var r = Math.floor(255 / Math.floor(this.fuse + 1))
    return "rgb(" + r + ", 0, 0)"
}

Bomb.prototype.getStyle = function() {
    return {
        "position": "absolute",
        "borderRadius": "999%",
        "width": this.getWidth() + "em",
        "height": this.getHeight() + "em",
        "backgroundColor": this.getColor(),
        "left": this.position.x - (this.getWidth() / 2) + "em",
        "top": this.position.y - (this.getHeight() / 2) + "em",
    }
}

Bomb.prototype.update = function(tick) {
    this.fuse -= tick
    if(this.fuse <= -1) {
        new Explosion({
            "position": {
                "x": Math.floor(this.position.x),
                "y": Math.floor(this.position.y)
            }
        })
    }
}

Bomb.prototype.explode = function() {
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    delete Game.data.bombs[x + "x" + y]
    
    if(!!this.monkey) {
        this.monkey.bombs.push(this.type)
    }
}

module.exports = Bomb
