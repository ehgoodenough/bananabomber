//var GameInputActions = require("<actions>/GameInputActions")

var GameInputStore = Reflux.createStore({
    data: {
    },
    getData: function() {
        return this.data
    },
    listenables: [
    ]
})

module.exports = GameInputStore
