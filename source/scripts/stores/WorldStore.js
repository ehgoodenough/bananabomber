var WorldStore = Reflux.createStore({
    data: {
        dimensions: {
            width: 16,
            height: 9
        },
        tiles: {}
    },
    getData: function() {
        return this.data
    },
    init: function() {
        for(var x = 0; x < this.data.dimensions.width; x++) {
            for(var y = 0; y < this.data.dimensions.height; y++) {
                if(x % 2 == 0 && y % 2 == 0
                || x == 0 || x == this.data.dimensions.width - 1
                || y == 0 || y == this.data.dimensions.height - 1) {
                    this.data.tiles[x + "x" + y] = {
                        position: {
                            x: x,
                            y: y
                        }
                    }
                }
            }
        }
        this.retrigger()
    }
})

module.exports = WorldStore
