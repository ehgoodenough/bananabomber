var ShortID = require("shortid")

var Block = require("./Block")

class Game {
    constructor(protogame) {
        this.add("blocks", new Block({
            position: {bx: 2, by: 3}
        }))
    }
    add(label, object) {
        object.game = this
        object.id = ShortID.generate()
        if(!this[label]) {this[label] = {}}
        this[label][object.id] = object
    }
    remove(label, object) {
        if(this[label] && this[label][object.id]) {
            delete this[label][object.id]
        }
    }
    update(tick) {
        for(var label in this) {
            for(var key in this[label]) {
                if(!!this[label][key].update) {
                    this[label][key].update(tick)
                }
            }
        }
    }
}

export default Game
