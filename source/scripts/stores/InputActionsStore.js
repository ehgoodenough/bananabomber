var KeyboardInputActions = require("<source>/scripts/actions/KeyboardInputActions")

var InputActionsStore = Reflux.createStore({
    data: {
    },
    getData: function() {
        return this.data
    },
    listenables: [
        KeyboardInputActions
    ],
    addAction: function(keycode, action) {
        this.data[keycode] = action
    },
    onTickKeyboardInput: function(keycode, tick) {
        if(this.data[keycode]) {
            this.data[keycode](tick)
        }
    }
})

module.exports = InputActionsStore
