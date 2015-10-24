var Camera = function() {
    this.position = {
        x: 0, y: 0
    }

    this.shake = 0
    this.direction = +10
}

Camera.prototype.update = function(tick) {
    if(this.shake > 0) {
        this.shake -= tick
        if(this.shake < 0) {
            this.shake = 0
        }
    }
}

Camera.prototype.getStyle = function() {
    return {
        position: "absolute",
        top: this.position.y + "em",
        left: this.position.x + "em",
    }
}

module.exports = Camera
