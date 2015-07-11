var Tile = function(prototile) {
    this.position = prototile.position || {"x": 0, "y": 0}
}

Tile.prototype.getColor = function() {
    if(!!this.wall) {
        return "rgb(80, 80, 80)"
    } else {
        return "rgb(200, 175, 150)"
    }
}

Tile.prototype.hasCollision = function() {
    return !!this.wall
}

var World = function() {
    this.width = 19
    this.height = 13
    
    this.tiles = {}
    for(var x = 0; x < this.width; x++) {
        for(var y = 0; y < this.height; y++) {
            this.tiles[x + "x" + y] = new Tile({
                "position": {"x": x, "y": y}
            })
            if(x % 2 == 0 && y % 2 == 0
            || x == 0 || x == this.width - 1
            || y == 0 || y == this.height - 1) {
                this.tiles[x + "x" + y].wall = true
            }
        }
    }
}

World.prototype.getTile = function(position) {
    position.dx = position.dx || 0
    position.dy = position.dy || 0
    var x = Math.floor(position.x + position.dx)
    var y = Math.floor(position.y + position.dy)
    return this.tiles[x + "x" + y]
}

World.prototype.getTiles = function(position) {
    var tiles = []
    var dx = position.dx || 0
    var dy = position.dy || 0
    var x1 = Math.floor(Math.min(position.x1, position.x2) + dx)
    var x2 = Math.ceil(Math.max(position.x1, position.x2) + dx)
    var y1 = Math.floor(Math.min(position.y1, position.y2) + dy)
    var y2 = Math.ceil(Math.max(position.y1, position.y2) + dy)
    for(var x = x1; x < x2; x++) {
        for(var y = y1; y < y2; y++) {
            tiles.push(this.getTile({
                "x": x, "y": y
            }))
        }
    }
    return tiles
}

module.exports = World
