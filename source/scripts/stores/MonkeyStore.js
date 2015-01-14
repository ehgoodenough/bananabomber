var MonkeyStore = Reflux.createStore({
    data: {
        one: {
            color: "red",
            radius: 0.45,
            position: {
                x: 1 + 0.45 + (0.5 - 0.45),
                y: 2 + 0.45 + (0.5 - 0.45)
            },
            inputs: {
                "move north": "up arrow",
                "move south": "down arrow",
                "move east": "right arrow",
                "move west": "left arrow"
            }
        },
        two: {
            color: "green",
            radius: 0.45,
            position: {
                x: 4 + 0.45 + (0.5 - 0.45),
                y: 3 + 0.45 + (0.5 - 0.45)
            },
            inputs: {
                "move north": "w",
                "move south": "s",
                "move east": "d",
                "move west": "a"
            }
        }
    },
    getData: function() {
        return this.data
    }
})

module.exports = MonkeyStore
