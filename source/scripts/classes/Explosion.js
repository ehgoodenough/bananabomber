var Explosion = function(protoexplosion) {
    
    this.position = {}
    this.position.x = protoexplosion.position.x || 0.5
    this.position.y = protoexplosion.position.y || 0.5
    
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    var xy = x + "x" + y
    
    if(!!Game.data.world.walls[xy]) {
        return
    } else {
        Game.data.explosions[xy] = this
    }
    
    this.intensity = {}
    if(typeof protoexplosion.intensity == "number") {
        this.intensity.north = protoexplosion.intensity || 0
        this.intensity.south = protoexplosion.intensity || 0
        this.intensity.west = protoexplosion.intensity || 0
        this.intensity.east = protoexplosion.intensity || 0
    } else if(typeof protoexplosion.intensity == "object") {
        this.intensity.north = protoexplosion.intensity.north || 0
        this.intensity.south = protoexplosion.intensity.south || 0
        this.intensity.west = protoexplosion.intensity.west || 0
        this.intensity.east = protoexplosion.intensity.east || 0
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
    
    this.flash = 0.1
    
    
    
    var maxspeed = 0.05
    for(var i = 0; i < 8; i++) {
        new ExplosionSmoke({
            "position": {
                "x": this.position.x - (Math.random() - 0.5),
                "y": this.position.y - (Math.random() - 0.5),
            },
            "intensity": {
                "x": Math.random() * maxspeed * (Math.random() < 0.5 ? -1 : +1),
                "y": Math.random() * maxspeed * (Math.random() < 0.5 ? -1 : +1),
            }
        })
    }
}

Explosion.prototype.getStyle = function() {
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    return {
        zIndex: y * 100,
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

var ExplosionSmoke = function(protosmoke) {
    this.position = {}
    this.position.x = protosmoke.position.x || 0.5
    this.position.y = protosmoke.position.y || 0.5
    
    this.intensity = {}
    this.intensity.x = protosmoke.intensity.x || 0.5
    this.intensity.y = protosmoke.intensity.y || 0.5
    
    this.width = protosmoke.width || 0.5
    this.height = protosmoke.height || 0.5
    
    this.key = ShortID.generate()
    Game.data.explosionsmoke[this.key] = this
    
    this.time = this.maxtime = 1.5 * 2
}

ExplosionSmoke.prototype.update = function(tick) {
    this.position.x += this.intensity.x * tick
    this.position.y += this.intensity.y * tick
    this.time -= tick
    if(this.time <= 0) {
        delete Game.data.explosionsmoke[this.key]
    }
}

ExplosionSmoke.prototype.getStyle = function() {
    var MAX_OPACITY = 0.8
    var opacity = MAX_OPACITY * (this.time / this.maxtime)
    var width = this.width
    var height = this.height
    return {
        position: "absolute",
        width: width + "em",
        height: height + "em",
        left: this.position.x - (width / 2) + "em",
        top: this.position.y - (height / 2) + "em",
        backgroundColor: "#888",
        opacity: opacity
    }
}

module.exports = Explosion
