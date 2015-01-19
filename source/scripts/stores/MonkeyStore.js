var MonkeyActions = require("<source>/scripts/actions/MonkeyActions")
var LoopActions = require("<source>/scripts/actions/LoopActions")

var max_velocity = 0.1
var acceleration = 0.5
var deacceleration = 0.4

var MonkeyStore = Reflux.createStore({
    data: {
        one: {
            _id: "one",
            color: "red",
            radius: 0.45,
            position: {
                x: 1 + 0.45 + (0.5 - 0.45),
                y: 2 + 0.45 + (0.5 - 0.45)
            },
            movement: {
                vx: 0,
                vy: 0,
            },
            inputs: {
                "move north": "up arrow",
                "move south": "down arrow",
                "move east": "right arrow",
                "move west": "left arrow"
            }
        },
        two: {
            _id: "two",
            color: "green",
            radius: 0.45,
            position: {
                x: 4 + 0.45 + (0.5 - 0.45),
                y: 3 + 0.45 + (0.5 - 0.45)
            },
            movement: {
                vx: 0,
                vy: 0,
            },
            inputs: {
                "move north": "w",
                "move south": "s",
                "move east": "d",
                "move west": "a"
            }
        }
    },
    getData: function() {
        return this.data
    },
    listenables: [
        MonkeyActions,
        LoopActions
    ],
    onMonkeyMoveNorth: function(_id, tick) {
        this.data[_id].movement.vy -= acceleration * tick
        if(this.data[_id].movement.vy < -max_velocity) {
            this.data[_id].movement.vy = -max_velocity
        }
        console.log(this.data[_id].movement.vy)
        this.retrigger()
    },
    onMonkeyMoveSouth: function(_id, tick) {
        this.data[_id].movement.vy += acceleration * tick
        if(this.data[_id].movement.vy > max_velocity) {
            this.data[_id].movement.vy = max_velocity
        }
        console.log(this.data[_id].movement.vy)
        this.retrigger()
    },
    onMonkeyMoveEast: function(_id, tick) {
        this.data[_id].movement.vx += acceleration * tick
        if(this.data[_id].movement.vx > max_velocity) {
            this.data[_id].movement.vx = max_velocity
        }
        console.log(this.data[_id].movement.vx)
        this.retrigger()
    },
    onMonkeyMoveWest: function(_id, tick) {
        this.data[_id].movement.vx -= acceleration * tick
        if(this.data[_id].movement.vx < -max_velocity) {
            this.data[_id].movement.vx = -max_velocity
        }
        console.log(this.data[_id].movement.vx)
        this.retrigger()
    },
    onTick: function(tick) {
        for(var _id in this.data) {
            this.data[_id].position.x += this.data[_id].movement.vx
            this.data[_id].position.y += this.data[_id].movement.vy

            if(this.data[_id].movement.vx > 0) {
                this.data[_id].movement.vx -= deacceleration * tick
                if(this.data[_id].movement.vx < 0) {
                    this.data[_id].movement.vx = 0
                }
            } else if(this.data[_id].movement.vx < 0) {
                this.data[_id].movement.vx += deacceleration * tick
                if(this.data[_id].movement.vx > 0) {
                    this.data[_id].movement.vx = 0
                }
            }
            if(this.data[_id].movement.vy > 0) {
                this.data[_id].movement.vy -= deacceleration * tick
                if(this.data[_id].movement.vy < 0) {
                    this.data[_id].movement.vy = 0
                }
            } else if(this.data[_id].movement.vy < 0) {
                this.data[_id].movement.vy += deacceleration * tick
                if(this.data[_id].movement.vy > 0) {
                    this.data[_id].movement.vy = 0
                }
            }
        }
        this.retrigger()
    }
})

module.exports = MonkeyStore
