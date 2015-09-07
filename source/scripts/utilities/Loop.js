var raf = require("raf")

var Loop = function(func) {
    return (function loop(time) {
        func(Math.min((Date.now() - time) / 1000, 1))
        raf(loop.bind(null, Date.now()))
    })(Date.now())
}

module.exports = Loop
