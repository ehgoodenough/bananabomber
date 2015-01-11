var RequestAnimationFrame = require("raf")
var GameLoopActions = require("<actions>/GameLoopActions")

var GameLoopDispatcher = function() {
    (function tick(time) {
        GameLoopActions.LoopTick((Date.now() - time) / 1000)
        RequestAnimationFrame(tick.bind(null, Date.now()))
    })(Date.now())
}

module.exports = GameLoopDispatcher
