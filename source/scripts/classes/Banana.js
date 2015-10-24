var Banana = function(protobanana) {
    this.position = {}
    this.position.x = protobanana.position.x
    this.position.y = protobanana.position.y

    this.powerup = protobanana.powerup
    if(this.powerup == "more speed") {
        this.color = "yellow"
    } else if(this.powerup == "more intensity") {
        this.color = "red"
    }

    Game.bananas[this.position.x + "x" + this.position.y] = this
}

Banana.prototype.explode = function() {
    delete Game.bananas[this.position.x + "x" + this.position.y]
}

Banana.prototype.getStyle = function() {
    var x = this.position.x
    var y = this.position.y
    var z = Math.round(this.position.y * 100)
    return {
        "zIndex": z,
        "top": y * TILE + "em",
        "left": x * TILE + "em",
        "width": TILE + "em",
        "height": TILE + "em",
        "backgroundColor": this.color,
        "position": "absolute",
    }
}

module.exports = Banana
