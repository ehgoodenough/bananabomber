window.React = require("react")
window.Phlux = require("phlux")
window.Id = require("shortid")

window.Loop = require("<scripts>/utilities/Loop")
window.Input = require("<scripts>/utilities/Input")

window.Bomb = require("<scripts>/classes/Bomb")
window.World = require("<scripts>/classes/World")
window.Monkey = require("<scripts>/classes/Monkey")
window.Explosion = require("<scripts>/classes/Explosion")
window.Camera = require("<scripts>/classes/Camera")

window.Inputs = require("<scripts>/data/Inputs")
window.Images = require("<scripts>/data/Images")

window.Game = {
    bombs: {},
    monkeys: {},
    explosions: {},
    particles: {},
    camera: new Camera(),
    world: new World(),
}

new Monkey({
    "position": {"x": 1.5, "y": 1.5},
    "inputs": Inputs["red monkey"],
    "images": Images["red monkey"],
})
new Monkey({
    "position": {"x": 17.5, "y": 1.5},
    "inputs": Inputs["green monkey"],
    "images": Images["green monkey"],
})
new Monkey({
    "position": {"x": 1.5, "y": 11.5},
    "inputs": Inputs["blue monkey"],
    "images": Images["blue monkey"],
})
new Monkey({
    "position": {"x": 17.5, "y": 11.5},
    "inputs": Inputs["purple monkey"],
    "images": Images["purple monkey"],
})

var CameraView = require("<scripts>/views/CameraView")
var GameFrameView = require("<scripts>/views/GameFrameView")
var GameObjectView = require("<scripts>/views/GameObjectView")
var ForEachView = require("<scripts>/views/ForEachView")
var MonkeyView = require("<scripts>/views/MonkeyView")
var WorldView = require("<scripts>/views/WorldView")
var BombView = require("<scripts>/views/BombView")

var Bananabomber = React.createClass({
    render: function() {
        if(!!this.state) {
            return (
                <GameFrameView aspect-ratio="19x13">
                    <CameraView data={this.state.camera}>
                        <WorldView data={this.state.world}/>
                        <ForEachView data={this.state.bombs} view={BombView}/>
                        <ForEachView data={this.state.monkeys} view={MonkeyView}/>
                        <ForEachView data={this.state.particles} view={GameObjectView}/>
                        <ForEachView data={this.state.explosions} view={GameObjectView}/>
                    </CameraView>
                </GameFrameView>
            )
        } else {
            return (
                <div>
                </div>
            )
        }
    },
    componentDidMount: function() {
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
