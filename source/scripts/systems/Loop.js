var raf = require("raf")

var Loop = function(alpha, omega) {
    var func = alpha instanceof Function ? alpha : omega
    var maxtick = alpha instanceof Function ? 0 : alpha
    return (function loop(tick, time) {
        tick += (Date.now() - time) / 1000
        if(tick >= maxtick) {
            func(tick)
            tick = 0
        }
        time = Date.now()
        raf(loop.bind(this, tick, time))
    })(maxtick, Date.now())
}

module.exports = Loop
