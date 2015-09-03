var Banana = function(protobanana) {
    this.position = {}
    this.position.x = protobanana.position.x
    this.position.y = protobanana.position.y

    Game.bananas[this.position.x + "x" + this.position.y] = this
}

Banana.prototype.getStyle = function() {
    var x = this.position.x + 0.25
    var y = this.position.y + 0.25
    var z = Math.round(this.position.y * 100)
    var width = 1 - (0.25 * 2)
    var height = 1 - (0.25 * 2)
    return {
        "zIndex": z,
        "top": y + "em",
        "left": x + "em",
        "width": width + "em",
        "height": height + "em",
        "backgroundColor": "yellow",
        "position": "absolute",
    }
}

module.exports = Banana
