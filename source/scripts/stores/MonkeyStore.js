var MonkeyStore = Reflux.createStore({
    data: {
        one: {
            color: "red",
            position: {
                x: 2,
                y: 2
            }
        },
        two: {
            color: "green",
            position: {
                x: 4,
                y: 4
            }
        }
    },
    getData: function() {
        return this.data
    }
})

module.exports = MonkeyStore
