var GameLoopActions = require("<actions>/LoopActions")

var GameLoopStore = Reflux.createStore({
    data: {
        delta: 0
    },
    getData: function() {
        return this.data
    },
    listenables: [
        LoopActions
    ],
    onLoopTick: function(delta) {
        this.data.delta = delta
        this.retrigger()
    }
})

module.exports = GameLoopStore
