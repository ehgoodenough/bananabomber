var Monkey = function(protomonkey) {
    this.id = Id.generate()
    Game.monkeys[this.id] = this
    
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
    
    this.bombqueue = [
        "regular",
        "regular",
        "regular",
    ]
}

Monkey.prototype.getStyle = function() {
    var opacity = 1
    var image = this.images.regular
    var x = this.position.x - this.anchor.x + "em"
    var y = this.position.y - this.anchor.y + "em"
    var z = Math.round((this.position.y - this.anchor.y) * 100)
    if(this.isDead) {
        var z = 9999999
        var opacity = 0.75
        var image = this.images.ghost
    }
    var transform = "scaleX(1)"
    if(this.direction == "east") {
        transform = "scaleX(-1)"
    }
    return {
        "top": y,
        "left": x,
        "zIndex": z,
        "width": "1em",
        "height": "1em",
        "opacity": opacity,
        "transform": transform,
        "position": "absolute",
        "backgroundSize": "99% 99%",
        "backgroundPosition": "50% 50%",
        "backgroundRepeat": "no-repeat",
        "backgroundImage": "url(" + image + ")"
    }
}

Monkey.prototype.update = function(tick) {
    // keyboard input
    if(Input.isDown(this.inputs["move north"])) {
        this.velocity.y = -this.velocity.maximum
    } if(Input.isDown(this.inputs["move south"])) {
        this.velocity.y = +this.velocity.maximum
    } if(Input.isDown(this.inputs["move west"])) {
        this.velocity.x = -this.velocity.maximum
        this.direction = "west"
    } if(Input.isDown(this.inputs["move east"])) {
        this.velocity.x = +this.velocity.maximum
        this.direction = "east"
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
    if(!this.isDead) {
        var positions = this.getNewPositions({
            "x": this.velocity.x
        })
        for(var coords in positions) {
            var position = positions[coords]
            var bomb = Game.bombs[coords]
            var wall = Game.world.walls[coords]
            if(!!wall || !!bomb) {
                if(this.velocity.x > 0) {
                    this.position.x = position.x
                    this.position.x -= this.girth + 0.01
                    this.velocity.x = 0
                } else if(this.velocity.x < 0) {
                    this.position.x = position.x + 1
                    this.position.x += this.girth + 0.01
                    this.velocity.x = 0
                }
            }
        }
        var positions = this.getNewPositions({
            "x": this.velocity.x,
            "y": this.velocity.y
        })
        for(var coords in positions) {
            var position = positions[coords]
            var bomb = Game.bombs[coords]
            var wall = Game.world.walls[coords]
            if(!!wall || !!bomb) {
                if(this.velocity.y > 0) {
                    this.position.y = position.y
                    this.position.y -= this.girth + 0.01
                    this.velocity.y = 0
                } else if(this.velocity.y < 0) {
                    this.position.y = position.y + 1
                    this.position.y += this.girth + 0.01
                    this.velocity.y = 0
                }
            }
        }
    }
    
    // translation
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    // deceleration
    var friction = this.friction
    if(this.isDead) {
        friction *= 10000
    }
    if(this.velocity.y < 0) {
        this.velocity.y *= Math.pow(friction, tick)
        if(this.velocity.y > -this.velocity.minimum) {
            this.velocity.y = 0
        }
    } else if(this.velocity.y > 0) {
        this.velocity.y *= Math.pow(friction, tick)
        if(this.velocity.y < +this.velocity.minimum) {
            this.velocity.y = 0
        }
    } if(this.velocity.x < 0) {
        this.velocity.x *= Math.pow(friction, tick)
        if(this.velocity.x > -this.velocity.minimum) {
            this.velocity.x = 0
        }
    } else if(this.velocity.x > 0) {
        this.velocity.x *= Math.pow(friction, tick)
        if(this.velocity.x < +this.velocity.minimum) {
            this.velocity.x = 0
        }
    }
    
    if(!this.isDead) {
        if(Input.isJustDown(this.inputs["drop bomb"])) {
            if(this.bombqueue.length > 0) {
                var x = Math.floor(this.position.x)
                var y = Math.floor(this.position.y)
                if(Game.bombs[x + "x" + y] == null) {
                    Game.bombs[x + "x" + y] = new Bomb({
                        position: {"x": x, "y": y},
                        type: this.bombqueue.pop(),
                        monkey: this,
                    })
                }
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
