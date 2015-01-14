var KeyboardInputStore = require("<source>/scripts/actions/KeyboardInputActions")

var InputBindingsStore = Reflux.createStore({
    data: {},
    getData: function() {
        return this.data
    }
})

module.exports = InputBindingsStore
