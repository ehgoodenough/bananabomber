var MonkeyStore = Reflux.createStore({
    data: {
        one: {
            color: "red",
            position: {
                x: 1,
                y: 2
            }
        },
        two: {
            color: "green",
            position: {
                x: 4,
                y: 3
            }
        }
    },
    getData: function() {
        return this.data
    }
})

module.exports = MonkeyStore
