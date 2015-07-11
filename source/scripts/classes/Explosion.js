var Explosion = function(protoexplosion) {
    protoexplosion.position = protoexplosion.position || {}
    protoexplosion.direction = protoexplosion.direction || {}
    
    this.position = {
        "x": protoexplosion.position.x || 0,
        "y": protoexplosion.position.y || 0
    }
    this.direction = {
        "-x": protoexplosion.direction["-x"] || 0,
        "+x": protoexplosion.direction["+x"] || 0,
        "-y": protoexplosion.direction["-y"] || 0,
        "+y": protoexplosion.direction["+y"] || 0
    }
    
    var x = Math.floor(this.position.x)
    var y = Math.floor(this.position.y)
    var xy = x + "x" + y
    
    if(Game.data.world.tiles[xy]
    && Game.data.world.tiles[xy].wall) {
        return
    }
    
    Game.data.explosions[xy] = this
    
    if(!!Game.data.bombs[xy]) {
        var bomb = Game.data.bombs[xy]
        this.direction["-x"] = Math.max(bomb.intensity, this.direction["-x"])
        this.direction["+x"] = Math.max(bomb.intensity, this.direction["+x"])
        this.direction["-y"] = Math.max(bomb.intensity, this.direction["-y"])
        this.direction["+y"] = Math.max(bomb.intensity, this.direction["+y"])
        bomb.explode()
    }
    
    for(var key in Game.data.monkeys) {
        var monkey = Game.data.monkeys[key]
        if(monkey.hasPosition(x + "x" + y)) {
            monkey.explode()
        }
    }
    
    if(!!this.direction["-x"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x - 1, "y": this.position.y},
            "direction": {"-x": this.direction["-x"] - 1}
        })
    } if(!!this.direction["+x"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x + 1, "y": this.position.y},
            "direction": {"+x": this.direction["+x"] - 1}
        })
    } if(!!this.direction["-y"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x, "y": this.position.y - 1},
            "direction": {"-y": this.direction["-y"] - 1}
        })
    } if(!!this.direction["+y"]) {
        var explosion = new Explosion({
            "position": {"x": this.position.x, "y": this.position.y + 1},
            "direction": {"+y": this.direction["+y"] - 1}
        })
    }
    
    this.burntime = 0.5
}

Explosion.prototype.getStyle = function() {
    return {
        width: "1em",
        height: "1em",
        position: "absolute",
        top: this.position.y + "em",
        left: this.position.x + "em",
        backgroundColor: "#C00",
    }
}

Explosion.prototype.update = function(tick) {
    this.burntime -= tick
    if(this.burntime <= 0) {
        var x = Math.floor(this.position.x)
        var y = Math.floor(this.position.y)
        delete Game.data.explosions[x + "x" + y]
    }
}

module.exports = Explosion
