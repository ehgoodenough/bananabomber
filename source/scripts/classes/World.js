var World = function() {
    this.width = 19
    this.height = 13
    this.color = "rgb(200, 175, 150)"

    this.walls = new Array()
    for(var x = 0; x < this.width; x++) {
        for(var y = 0; y < this.height; y++) {
            if(x % 2 == 0 && y % 2 == 0
            || x == 0 || x == this.width - 1
            || y == 0 || y == this.height - 1) {
                this.walls[x + "x" + y] = {
                    "color": "rgb(80, 80, 80)",
                    "position": {"x": x, "y": y},
                }
            }
        }
    }
}

module.exports = World
