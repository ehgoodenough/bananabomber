var ShortID = require("shortid")

var Block = require("./Block")
var Arena = require("./Arena")
var Camera = require("./Camera")
var Bomber = require("./Bomber")
var Frame = require("./Frame")
var Entity = require("./Entity")
var Point = require("./Point")

var Images = require("../data/Images")
var Colors = require("../data/Colors")
var Inputs = require("../data/Inputs")

class Game {
    constructor(protogame) {
        this.put("frame", new Frame({
            width: 640, height: 360,
            color: "#96C0CE"
        }))

        this.put("arena", new Arena({
            width: 19 * BLOCK,
            height: 11 * BLOCK,
        }))

        this.add("bombers", new Bomber({
            color: Colors["red"],
            inputs: Inputs["wasd"],
            position: {bx: 0, by: 0}
        }))
        this.add("bombers", new Bomber({
            color: Colors["purple"],
            inputs: Inputs["arrows"],
            position: {bx: 19-1, by: 11-1}
        }))
        //for(var index in protogame.bombers) {
        //    this.add("bombers", new Bomber({
        //        color: protogame.bombers[index].color,
        //        inputs: protogame.bombers[index].inputs,
        //         position: {
        //             bx: Math.floor(Math.random() * 19),
        //             by: Math.floor(Math.random() * 11)
        //         },
        //     }))
        // }
        this.put("camera", new Camera({
            position: {x: 0, y: 0},
            padding: 2 * BLOCK,
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
