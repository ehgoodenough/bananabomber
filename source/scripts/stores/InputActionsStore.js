var KeyboardInputActions = require("<source>/scripts/actions/KeyboardInputActions")

var InputActionsStore = Reflux.createStore({
    data: {},
    getData: function() {
        return this.data
    },
    listenables: [
        KeyboardInputActions
    ],
    addAction: function(keycode, action) {
        console.log(keycode, action)
    },
    onTickKeyboardInput: function(keycode, tick) {
        console.log(keycode, tick)
    }
})

module.exports = InputActionsStore
