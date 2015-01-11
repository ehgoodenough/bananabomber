var MonkeyStore = Reflux.createStore({
    data: {
        one: {
            color: "red",
            position: {
                x: 1 + 0.45 + (0.5 - 0.45),
                y: 2 + 0.45 + (0.5 - 0.45)
            },
            radius: 0.45
        },
        two: {
            color: "green",
            position: {
                x: 4 + 0.45 + (0.5 - 0.45),
                y: 3 + 0.45 + (0.5 - 0.45)
            },
            radius: 0.45
        }
    },
    getData: function() {
        return this.data
    }
})

module.exports = MonkeyStore
