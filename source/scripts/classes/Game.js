var ShortID = require("shortid")

var Entity = require("./Entity")

class Game {
    put(label, entity) {
        entity.game = this
        entity.id = ShortID.generate()
        this[label] = entity
        if(!!entity.initialize) {
            entity.initialize()
        }
    }
    add(label, entity, key) {
        entity.game = this
        if(entity.id == undefined) {
            entity.id = ShortID.generate()
        }
        if(this[label] == undefined) {
            this[label] = {}
        }
        this[label][entity.id] = entity
        if(!!entity.initialize) {
            entity.initialize()
        }
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
            if(this[label] instanceof Entity) {
                this[label].update(tick)
            } else {
                for(var id in this[label]) {
                    if(this[label][id] instanceof Entity) {
                        this[label][id].update(tick)
                    }
                }
            }
        }
    }
}

export default Game
