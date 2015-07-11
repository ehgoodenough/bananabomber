var Monkey = function(protomonkey) {
    for(var key in protomonkey) {
        this[key] = protomonkey[key]
    }
}

Monkey.prototype.getStyle = function() {
    return {
        "width": "1em",
        "height": "1em",
        "position": "absolute",
        "top": this.position.y + "em",
        "left": this.position.x + "em",
        "backgroundColor": "#FC0",
    }
}

var GameStore = Phlux.createStore({
    data: {
        monkeys: {
            0: new Monkey({
                position: {
                    x: 1,
                    y: 1
                }
            }),
            1: new Monkey({
                position: {
                    x: 5,
                    y: 6
                }
            })
        }
    }
})

module.exports = GameStore
