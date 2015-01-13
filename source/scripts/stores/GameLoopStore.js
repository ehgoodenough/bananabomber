var requestAnimationFrame = require("raf")

var GameLoopActions = require("<actions>/GameLoopActions")

var GameLoopStore = Reflux.createStore({
    data: {
        delta: 0
    },
    getData: function() {
        return this.data
    },
    init: function() {
        (function tick(time) {
            GameLoopActions.LoopTick((Date.now() - time) / 1000)
            requestAnimationFrame(tick.bind(null, Date.now()))
        })(Date.now())
    },
    listenables: [
        GameLoopActions
    ],
    onLoopTick: function(delta) {
        this.data.delta = delta
        this.retrigger()
    }
})

module.exports = GameLoopStore
