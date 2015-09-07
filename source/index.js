window.React = require("react")
window.Phlux = require("phlux")
window.Id = require("shortid")

window.Loop = require("<scripts>/utilities/Loop")
window.Input = require("<scripts>/utilities/Input")

window.Bomb = require("<scripts>/classes/Bomb")
window.Crate = require("<scripts>/classes/Crate")
window.World = require("<scripts>/classes/World")
window.Monkey = require("<scripts>/classes/Monkey")
window.Banana = require("<scripts>/classes/Banana")
window.Explosion = require("<scripts>/classes/Explosion")
window.Camera = require("<scripts>/classes/Camera")

window.Inputs = require("<scripts>/data/Inputs")
window.Images = require("<scripts>/data/Images")

window.Start = function() {
    window.Game = {
        bombs: {},
        crates: {},
        monkeys: {},
        bananas: {},
        explosions: {},
        particles: {},
        camera: new Camera(),
        world: new World(),
    }

    new Monkey({
        "number": 1,
        "name": "red",
        "color": "#C00",
        "position": {"x": 1.5, "y": 1.5},
        "inputs": Inputs["red monkey"],
        "images": Images["red monkey"],
    })
    new Monkey({
        "number": 2,
        "name": "green",
        "color": "#0C0",
        "position": {"x": 17.5, "y": 1.5},
        "inputs": Inputs["green monkey"],
        "images": Images["green monkey"],
    })
    new Monkey({
        "number": 3,
        "name": "blue",
        "color": "#00C",
        "position": {"x": 1.5, "y": 11.5},
        "inputs": Inputs["blue monkey"],
        "images": Images["blue monkey"],
    })
    new Monkey({
        "number": 4,
        "name": "purple",
        "color": "#C0C",
        "position": {"x": 17.5, "y": 11.5},
        "inputs": Inputs["purple monkey"],
        "images": Images["purple monkey"],
    })

    for(var x = 0; x < Game.world.width; x++) {
        for(var y = 0; y < Game.world.height; y++) {
            if(!!Game.world.walls[x + "x" + y]) {
                continue
            }
            var isNearMonkey = false
            for(var id in Game.monkeys) {
                var monkey = Game.monkeys[id]
                if(Math.abs(Math.floor(monkey.position.x) - x) <= 1
                && Math.abs(Math.floor(monkey.position.y) - y) <= 1) {
                    isNearMonkey = true
                    break
                }
            }
            if(!!isNearMonkey) {
                continue
            }
            new Crate({
                "position": {
                    "x": x, "y": y
                }
            })
        }
    }
}

var FrameView = require("<scripts>/views/FrameView")
var CameraView = require("<scripts>/views/CameraView")
var GameObjectView = require("<scripts>/views/GameObjectView")
var MonkeyStatusView = require("<scripts>/views/MonkeyStatusView")
var ForEachView = require("<scripts>/views/ForEachView")
var MonkeyView = require("<scripts>/views/MonkeyView")
var WorldView = require("<scripts>/views/WorldView")
var BombView = require("<scripts>/views/BombView")

var Bananabomber = React.createClass({
    render: function() {
        if(!!this.state) {
            return (
                <FrameView aspect-ratio="19x13">
                    <CameraView data={this.state.camera}>
                        <WorldView data={this.state.world}/>
                        <ForEachView data={this.state.bombs} view={BombView}/>
                        <ForEachView data={this.state.monkeys} view={MonkeyView}/>
                        <ForEachView data={this.state.crates} view={GameObjectView}/>
                        <ForEachView data={this.state.bananas} view={GameObjectView}/>
                        <ForEachView data={this.state.particles} view={GameObjectView}/>
                        <ForEachView data={this.state.explosions} view={GameObjectView}/>
                        <ForEachView data={this.state.monkeys} view={MonkeyStatusView}/>
                    </CameraView>
                </FrameView>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    },
    componentDidMount: function() {
        Start()
        Loop(function(tick) {
            for(var key in Game.monkeys)
                Game.monkeys[key].update(tick)
            for(var key in Game.bombs)
                Game.bombs[key].update(tick)
            for(var key in Game.explosions)
                Game.explosions[key].update(tick)
            for(var key in Game.particles)
                Game.particles[key].update(tick)
            Game.camera.update(tick)
            this.setState(Game)
        }.bind(this))
    }
})

React.render(<Bananabomber/>, document.body)
