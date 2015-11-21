var ShortID = require("shortid")

var Block = require("./Block")
var Arena = require("./Arena")
var Camera = require("./Camera")
var Bomber = require("./Bomber")
var Frame = require("./Frame")
var Entity = require("./Entity")

var Colors = require("../data/Colors")
var Inputs = require("../data/Inputs")

class Game {
    constructor(protogame) {
        this.put("frame", new Frame({
            width: 1280, height: 720,
            color: "#BEB9B5"
        }))

        this.put("arena", new Arena({
            bwidth: 17,
            bheight: 11,
        }))

        for(var bx = 0; bx < this.arena.bwidth; bx++) {
            for(var by = 0; by < this.arena.bheight; by++) {
                if(bx % 2 == 0 || by % 2 == 0) {
                    var hasBomber = false
                    for(var index in protogame.bombers) {
                        var protobomber = protogame.bombers[index]
                        if(Math.abs(protobomber.position.bx - bx) < 2
                        && Math.abs(protobomber.position.by - by) < 2) {
                            hasBomber = true
                        }
                    }
                    if(!hasBomber) {
                        this.add("blocks", new Block({
                            position: {bx: bx, by: by},
                            color: Colors.crates[Math.floor(Math.random() * Colors.crates.length)],
                            rotation: Math.floor(Math.random() * 12) - 6,
                            type: "crate"
                        }))
                    }
                } else {
                    this.add("blocks", new Block({
                        position: {bx: bx, by: by},
                        color: Colors.arena.darkblue,
                        type: "wall"
                    }))
                }
            }
        }

        for(var index in protogame.bombers) {
            var protobomber = protogame.bombers[index]
            this.add("bombers", new Bomber(protobomber))
        }

        this.put("camera", new Camera({
            position: {x: 0, y: 0},
            padding: 2 * BLOCK,
        }))

        this.bombs = {}
    }
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
