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
    var red = Math.floor(255 * (1 - (this.fuse / this.maxfuse)))
    var width = Math.abs(Math.sin(Math.pow(this.fuse, 2))) * 0.4 + 0.5
    var height = Math.abs(Math.cos(Math.pow(this.fuse, 3))) * 0.4 + 0.5
    var x = this.position.x - (width / 2)
    var y = this.position.y - (height / 2)
    var z = Math.round(this.position.y * 100)
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
    if(this.fuse <= -1) {
        var explosion = new Explosion({
            "intensity": this.intensity,
            "position": this.position,
        })
    }
}

Bomb.prototype.explode = function() {
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    delete Game.data.bombs[x + "x" + y]
    
    if(this.monkey != undefined) {
        this.monkey.bombqueue.push(this.type)
    }
}

module.exports = Bomb
