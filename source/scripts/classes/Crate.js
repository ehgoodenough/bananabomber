var Crate = function(protocrate) {
    this.position = {}
    this.position.x = protocrate.position.x
    this.position.y = protocrate.position.y

    this.id = Id.generate()
    Game.crates[this.id] = this
}

Crate.prototype.getStyle = function() {
    var x = this.position.x
    var y = this.position.y
    var z = Math.round(this.position.y * 100)
    var width = 1
    var height = 1
    return {
        "zIndex": z,
        "top": y + "em",
        "left": x + "em",
        "width": width + "em",
        "height": height + "em",
        "backgroundColor": "brown",
        "position": "absolute",
    }
}

module.exports = Crate
