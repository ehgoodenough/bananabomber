var ShortID = require("shortid")

var Block = require("./Block")
var Arena = require("./Arena")
var Camera = require("./Camera")
var Bomber = require("./Bomber")

class Game {
    constructor(protogame) {
        this.add("bombers", new Bomber({
            position: {bx: 0, by: 0}
        }))
        this.add("bombers", new Bomber({
            position: {bx: 0, by: 13}
        }))
        this.add("bombers", new Bomber({
            position: {bx: 19, by: 0}
        }))
        this.add("bombers", new Bomber({
            position: {bx: 19, by: 13}
        }))
        this.add("arenas", new Arena({
            width: 19, height: 13,
        }))
        this.put("camera", new Camera({
            position: {x: 0, y: 0},
        }))
    }
    put(label, entity) {
        entity.game = this
        entity.id = ShortID.generate()
        this[label] = entity
    }
    add(label, entity) {
        entity.game = this
        entity.id = ShortID.generate()
        if(this[label] == undefined) {
            this[label] = new Object()
        }
        this[label][entity.id] = entity
    }
    remove(label, entity) {
        if(this[label] != undefined) {
            if(this[label][entity.id] == entity) {
                delete this[label][entity.id]
            } else if(this[label] == entity) {
                delete this[label]
            }
        }
    }
    get(label, query) {
        var entities = new Array()
        if(this[label] == undefined) {
            this[label] = new Object()
        }
        for(var id in this[label]) {
            var entity = this[label][id]
            if(entity.matches(query)) {
                entities.push(entity)
            }
        }
        return entities
    }
    update(tick) {
        for(var label in this) {
            if(!!this[label].update) {
                this[label].update(tick)
            } else {
                for(var id in this[label]) {
                    if(!!this[label][id].update) {
                        this[label][id].update(tick)
                    }
                }
            }
        }
    }
}

export default Game
