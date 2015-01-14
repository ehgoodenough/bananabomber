var GameInputActions = require("<actions>/GameInputActions")

var GameInputStore = Reflux.createStore({
    data: {
        keyboard: {}
    },
    getData: function() {
        return this.data
    },
    listenables: [
        GameInputActions
    ],
    init: function() {
        document.addEventListener("keydown", function(event) {
            if(!GameInputStore.hasKeyboardInput(event.keyCode)) {
                GameInputActions.KeyboardInput(event.keyCode, true)
            }
        })
        document.addEventListener("keyup", function(event) {
            GameInputActions.KeyboardInput(event.keyCode, false)
        })
    },
    onKeyboardInput: function(keycode, status) {
        this.data.keyboard[keycode] = status
        this.retrigger()
    },
    hasKeyboardInput: function(keycode) {
        return this.data.keyboard[keycode] == true
    }
})

module.exports = GameInputStore
