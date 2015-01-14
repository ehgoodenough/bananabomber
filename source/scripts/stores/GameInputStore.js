var GameInputActions = require("<actions>/GameInputActions")

var GameInputStore = Reflux.createStore({
    data: {
    },
    getData: function() {
        return this.data
    },
    listenables: [
        GameInputActions
    ]
})

module.exports = GameInputStore
