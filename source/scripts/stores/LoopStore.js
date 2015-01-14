var LoopActions = require("<source>/scripts/actions/LoopActions")

var LoopStore = Reflux.createStore({
    data: {
        tick: 0
    },
    getData: function() {
        return this.data
    },
    init: function() {
        (function loop(time) {
            LoopActions.Tick((Date.now() - time) / 1000)
            require("raf")(loop.bind(null, Date.now()))
        })(Date.now())
    },
    listenables: [
        LoopActions
    ],
    onTick: function(tick) {
        this.data.tick = tick
        this.retrigger()
    }
})

module.exports = LoopStore
