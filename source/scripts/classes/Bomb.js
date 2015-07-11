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

Bomb.prototype.getStyle = function() {
    return {
        "position": "absolute",
        "borderRadius": "999%",
        "backgroundColor": "#111",
        "width": this.width + "em",
        "height": this.height + "em",
        "left": this.position.x - (this.width / 2) + "em",
        "top": this.position.y - (this.height / 2) + "em",
    }
}

Bomb.prototype.update = function(tick) {
    this.fuse -= tick
    if(this.fuse <= 0) {
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
