var Crate = function(protocrate) {
    this.position = {}
    this.position.x = protocrate.position.x
    this.position.y = protocrate.position.y

    this.rotation = Math.random() * 8 - (8 / 2)

    var colors = [
		"rgb(204, 119, 34)",
		"rgb(184, 115, 51)",
		"rgb(205, 127, 50)",
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.id = Id.generate()
    Game.crates[this.position.x + "x" + this.position.y] = this
}

Crate.prototype.explode = function() {
    delete Game.crates[this.position.x + "x" + this.position.y]
    new Banana({
        "position": {
            "x": this.position.x,
            "y": this.position.y
        },
        "powerup": "more intensity"
    })
}

Crate.prototype.getStyle = function() {
    var x = this.position.x
    var y = this.position.y
    var z = Math.round(this.position.y * 100)
    var r = this.rotation
    var color = this.color
    return {
        "zIndex": z,
        "top": y * TILE + "em",
        "left": x * TILE + "em",
        "width": TILE + "em",
        "height": TILE + "em",
        "backgroundColor": color,
        "transform": "rotate(" + r + "deg)",
        "position": "absolute",
    }
}

module.exports = Crate
