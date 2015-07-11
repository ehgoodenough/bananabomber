var Bomb = require("<scripts>/classes/Bomb")

var Monkey = function(protomonkey) {
    for(var key in protomonkey) {
        this[key] = protomonkey[key]
    }
    
    this.velocity = {
        "minimum": 0.001,
        "maximum": 0.075,
        "x": 0,
        "y": 0,
    }
    this.anchor = {
        "x": 0.5,
        "y": 0.75
    }
    this.girth = 4 / 38
    this.friction = 0.000005
    this.acceleration = 0.75 // ?!
    
    this.status = "alive"
    
    this.bombs = [
        "regular",
        "regular"
    ]
}

Monkey.prototype.getStyle = function() {
    return {
        "width": 1 + "em",
        "height": 1 + "em",
        "position": "absolute",
        "top": this.position.y - this.anchor.y + "em",
        "left": this.position.x - this.anchor.x + "em",
        "backgroundSize": "99% 99%",
        "backgroundPosition": "50% 50%",
        "backgroundRepeat": "no-repeat",
        "backgroundImage": "url(" + this.image + ")",
        "backgroundColor": this.isDead ? "#111" : null,
    }
}

Monkey.prototype.update = function(tick) {
    // keyboard input
    if(Game.input.isDown(this.input["move north"])) {
        this.velocity.y -= this.acceleration * tick
        this.velocity.y = -this.velocity.maximum
    } if(Game.input.isDown(this.input["move south"])) {
        this.velocity.y += this.acceleration * tick
        this.velocity.y = +this.velocity.maximum
    } if(Game.input.isDown(this.input["move west"])) {
        this.velocity.x -= this.acceleration * tick
        this.velocity.x = -this.velocity.maximum
    } if(Game.input.isDown(this.input["move east"])) {
        this.velocity.x += this.acceleration * tick
        this.velocity.x = +this.velocity.maximum
    }
    
    // maximum velocity
    if(this.velocity.y < -this.velocity.maximum) {
        this.velocity.y = -this.velocity.maximum
    } if(this.velocity.y > +this.velocity.maximum) {
        this.velocity.y = +this.velocity.maximum
    } if(this.velocity.x < -this.velocity.maximum) {
        this.velocity.x = -this.velocity.maximum
    } if(this.velocity.x > +this.velocity.maximum) {
        this.velocity.x = +this.velocity.maximum
    }
    
    // collision with world
    var positions = this.getNewPositions({
        "y": this.velocity.y
    })
    for(var coords in positions) {
        var position = positions[coords]
        var bomb = Game.data.bombs[coords]
        var tile = Game.data.world.tiles[coords]
        if(!!tile && !!tile.wall || !!bomb) {
            if(this.velocity.y > 0) {
                this.position.y = tile.position.y
                this.position.y -= this.girth + 0.01
                this.velocity.y = 0
            } else if(this.velocity.y < 0) {
                this.position.y = tile.position.y + 1
                this.position.y += this.girth + 0.01
                this.velocity.y = 0
            }
        }
    }
    var positions = this.getNewPositions({
        "x": this.velocity.x
    })
    for(var coords in positions) {
        var position = positions[coords]
        var bomb = Game.data.bombs[coords]
        var tile = Game.data.world.tiles[coords]
        if(!!tile && !!tile.wall || !!bomb) {
            if(this.velocity.x > 0) {
                this.position.x = tile.position.x
                this.position.x -= this.girth + 0.01
                this.velocity.x = 0
            } else if(this.velocity.x < 0) {
                this.position.x = tile.position.x + 1
                this.position.x += this.girth + 0.01
                this.velocity.x = 0
            }
        }
    }
    
    // translation
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    // deceleration
    if(this.velocity.y < 0) {
        this.velocity.y *= Math.pow(this.friction, tick)
        if(this.velocity.y > -this.velocity.minimum) {
            this.velocity.y = 0
        }
    } else if(this.velocity.y > 0) {
        this.velocity.y *= Math.pow(this.friction, tick)
        if(this.velocity.y < +this.velocity.minimum) {
            this.velocity.y = 0
        }
    } if(this.velocity.x < 0) {
        this.velocity.x *= Math.pow(this.friction, tick)
        if(this.velocity.x > -this.velocity.minimum) {
            this.velocity.x = 0
        }
    } else if(this.velocity.x > 0) {
        this.velocity.x *= Math.pow(this.friction, tick)
        if(this.velocity.x < +this.velocity.minimum) {
            this.velocity.x = 0
        }
    }
    
    if(Game.input.isJustDown(this.input["drop bomb"])) {
        if(this.bombs.length > 0) {
            var x = Math.floor(this.position.x)
            var y = Math.floor(this.position.y)
            if(Game.data.bombs[x + "x" + y] == null) {
                Game.data.bombs[x + "x" + y] = new Bomb({
                    position: {"x": x, "y": y},
                    type: this.bombs.pop(),
                    monkey: this,
                })
            }
        }
    }
}

Monkey.prototype.getPositions = function(delta) {
    delta = delta || {}
    delta.x = delta.x || 0
    delta.y = delta.y || 0
    
    var x1 = Math.floor(this.position.x - this.girth + delta.x)
    var y1 = Math.floor(this.position.y - this.girth + delta.y)
    var x2 = Math.ceil(this.position.x + this.girth + delta.x)
    var y2 = Math.ceil(this.position.y + this.girth + delta.y)
    
    var positions = {}
    for(var x = x1; x < x2; x++) {
        for(var y = y1; y < y2; y++) {
            positions[x + "x" + y] = {
                "x": x, "y": y
            }
        }
    }
    return positions
}

Monkey.prototype.hasPosition = function(coords) {
    var positions = this.getPositions()
    return !!positions[coords]
}

Monkey.prototype.getNewPositions = function(delta) {
    var newpositions = this.getPositions(delta)
    var positions = this.getPositions()
    for(var key in newpositions) {
        if(!!positions[key]) {
            delete newpositions[key]
        }
    }
    return newpositions
}

Monkey.prototype.explode = function() {
    this.isDead = true
}

module.exports = Monkey
