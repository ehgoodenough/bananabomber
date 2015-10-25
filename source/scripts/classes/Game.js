var ShortID = require("shortid")

var Block = require("<scripts>/classes/Block")

class Game {
    constructor(protogame) {
        this.add("blocks", new Block({
            position: {bx: 2, by: 3}
        }))
    }
    add(group, object) {
        object.game = this
        object.id = ShortID.generate()
        if(!this[group]) {this[group] = {}}
        this[group][object.id] = object
    }
    remove(group, object) {
        if(this[group] && this[group][object.id]) {
            delete this[group][object.id]
        }
    }
}

export default Game
