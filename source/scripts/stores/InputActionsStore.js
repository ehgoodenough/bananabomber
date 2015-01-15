var KeyboardInputActions = require("<source>/scripts/actions/KeyboardInputActions")
var KeycodeDictionary = require("<source>/scripts/references/KeycodeDictionary")

var InputActionsStore = Reflux.createStore({
    data: {
    },
    getData: function() {
        return this.data
    },
    listenables: [
        KeyboardInputActions
    ],
    addAction: function(keyname, action) {
        var keycode = KeycodeDictionary.getKeycode(keyname)
        this.data[keycode] = action
    },
    onTickKeyboardInput: function(keycode, tick) {
        if(this.data[keycode]) {
            this.data[keycode](tick)
        }
    }
})

module.exports = InputActionsStore
