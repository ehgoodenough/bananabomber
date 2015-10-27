var Entity = require("./Entity")
var Geometry = require("../systems/Geometry")

window.quiver = 0.25

class Arena extends Entity {
    constructor(protoarena = {}) {
        super(protoarena)
        this.width = protoarena.width
        this.height = protoarena.height

        this.audience = []
        for(var x = -2.25; x > -6; x -= 1.5) {
            for(var y = -3; y < 11; y += 1.5) {
                var c = (Math.floor(Math.random() * 16)).toString(16)
                this.audience.push({
                    x: x * BLOCK,
                    y: y * BLOCK,
                    z: y + 3,
                    qx: 0,
                    qy: 0,
                    width: BLOCK * 1.25,
                    height: BLOCK * 1.25,
                    color: "#" + c + c + c,
                    angle: 0,
                })
            }
        }
        for(var x = 19+1; x < 19+5; x += 1.5) {
            for(var y = -3; y < 11; y += 1.5) {
                var c = (Math.floor(Math.random() * 16)).toString(16)
                this.audience.push({
                    x: x * BLOCK,
                    y: y * BLOCK,
                    z: y + 3,
                    qx: 0,
                    qy: 0,
                    width: BLOCK * 1.25,
                    height: BLOCK * 1.25,
                    color: "#" + c + c + c,
                    angle: 0,
                })
            }
        }
    }
    update(tick) {
        var bomber = this.game.get("bombers", {color: "#C00"})[0]
        for(var index in this.audience) {
            var dude = this.audience[index]
            dude.qx += (Math.random() * quiver) - (quiver / 2)
            dude.qy += (Math.random() * quiver) - (quiver / 2)
            if(dude.qx > quiver / 2) {
                dude.qx = quiver / 2
            } if(dude.qy > quiver / 2) {
                dude.qy = quiver / 2
            } if(dude.qx < -quiver / 2) {
                dude.qx = -quiver / 2
            } if(dude.qy < -quiver / 2) {
                dude.qy = -quiver / 2
            }
            dude.angle = Geometry.getAngleBetweenPoints(dude, bomber.position)
        }
    }
}

export default Arena
