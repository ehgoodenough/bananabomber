var Explosion = function(protoexplosion) {
    
    this.position = {}
    this.position.x = protoexplosion.position.x || 0.5
    this.position.y = protoexplosion.position.y || 0.5
    
    this.intensity = {}
    if(typeof protoexplosion.intensity == "number") {
        this.intensity.north = protoexplosion.intensity
        this.intensity.south = protoexplosion.intensity
        this.intensity.west = protoexplosion.intensity
        this.intensity.east = protoexplosion.intensity
    } else if(typeof protoexplosion.intensity == "object") {
        this.intensity.north = protoexplosion.intensity.north || 0
        this.intensity.south = protoexplosion.intensity.south || 0
        this.intensity.west = protoexplosion.intensity.west || 0
        this.intensity.east = protoexplosion.intensity.east || 0
    }
    
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    var xy = x + "x" + y
    
    if(!!Game.data.world.walls[xy]) {
        return
    } else {
        Game.data.explosions[xy] = this
    }
    
    if(!!Game.data.bombs[xy]) {
        var bomb = Game.data.bombs[xy]
        this.intensity.north = Math.max(bomb.intensity, this.intensity.north)
        this.intensity.south = Math.max(bomb.intensity, this.intensity.south)
        this.intensity.west = Math.max(bomb.intensity, this.intensity.west)
        this.intensity.east = Math.max(bomb.intensity, this.intensity.east)
        bomb.explode()
    }
    
    for(var key in Game.data.monkeys) {
        var monkey = Game.data.monkeys[key]
        if(monkey.hasPosition(x + "x" + y)) {
            monkey.explode()
        }
    }
    
    if(!!this.intensity.north) {
        var explosion = new Explosion({
            "intensity": {"north": this.intensity.north - 1},
            "position": {"x": this.position.x - 1, "y": this.position.y},
        })
    } if(!!this.intensity.south) {
        var explosion = new Explosion({
            "intensity": {"south": this.intensity.south - 1},
            "position": {"x": this.position.x + 1, "y": this.position.y},
        })
    } if(!!this.intensity.west) {
        var explosion = new Explosion({
            "intensity": {"west": this.intensity.west - 1},
            "position": {"x": this.position.x, "y": this.position.y - 1},
        })
    } if(!!this.intensity.east) {
        var explosion = new Explosion({
            "intensity": {"east": this.intensity.east - 1},
            "position": {"x": this.position.x, "y": this.position.y + 1},
        })
    }
    
    this.flash = 0.25
}

Explosion.prototype.getStyle = function() {
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    return {
        zIndex: y,
        width: "1em",
        height: "1em",
        top: y + "em",
        left: x + "em",
        position: "absolute",
        backgroundColor: "#C00",
    }
}

Explosion.prototype.update = function(tick) {
    this.flash -= tick
    if(this.flash <= 0) {
        var x = Math.floor(this.position.x)
        var y = Math.floor(this.position.y)
        delete Game.data.explosions[x + "x" + y]
    }
}

module.exports = Explosion
