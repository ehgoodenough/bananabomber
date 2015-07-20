window.React = require("react")
window.Phlux = require("phlux")
window.ShortID = require("shortid")
window.Loop = require("tickly").loop
window.Input = require("keyb")

window.World = require("<scripts>/classes/World")
window.Monkey = require("<scripts>/classes/Monkey")
window.Bomb = require("<scripts>/classes/Bomb")
window.Explosion = require("<scripts>/classes/Explosion")
window.Camera = require("<scripts>/classes/Camera")

var Inputs = require("<scripts>/data/Inputs")
var Images = require("<scripts>/data/Images")

window.Game = {
    monkeys: {
        0: new Monkey({
            "position": {
                "x": 1.5,
                "y": 1.5
            },
            "inputs": Inputs["red monkey"],
            "images": Images["red monkey"],
        }),
        1: new Monkey({
            "position": {
                "x": 17.5,
                "y": 1.5
            },
            "inputs": Inputs["green monkey"],
            "images": Images["green monkey"],
        }),
        2: new Monkey({
            "position": {
                "x": 1.5,
                "y": 11.5
            },
            "inputs": Inputs["blue monkey"],
            "images": Images["blue monkey"],
        }),
        3: new Monkey({
            "position": {
                "x": 17.5,
                "y": 11.5
            },
            "inputs": Inputs["purple monkey"],
            "images": Images["purple monkey"],
        })
    },
    world: new World(),
    bombs: {},
    explosions: {},
    explosionsmoke: {},
    camera: new Camera()
}

var CameraView = require("<scripts>/views/CameraView")
var GameFrameView = require("<scripts>/views/GameFrameView")
var GameObjectView = require("<scripts>/views/GameObjectView")
var WorldView = require("<scripts>/views/WorldView")

var Bananabomber = React.createClass({
    getInitialState: function() {
        return Game
    },
    render: function() {
        return (
            <GameFrameView aspect-ratio="19x13">
                <CameraView data={this.state.camera}>
                    <WorldView data={this.state.world}/>
                    {this.renderViews(GameObjectView, this.state.bombs)}
                    {this.renderViews(GameObjectView, this.state.monkeys)}
                    {this.renderViews(GameObjectView, this.state.explosionsmoke)}
                    {this.renderViews(GameObjectView, this.state.explosions)}
                </CameraView>
            </GameFrameView>
        )
    },
    renderViews: function(Class, data) {
        var views = []
        for(var key in data) {
            views.push(
                <Class key={key}
                    data={data[key]}/>
            )
        }
        return views
    },
    componentDidMount: function() {
        Loop(function(tick) {
            for(var key in Game.monkeys) {
                var monkey = Game.monkeys[key]
                monkey.update(tick)
            }
            for(var key in Game.bombs) {
                var bomb = Game.bombs[key]
                bomb.update(tick)
            }
            for(var key in Game.explosions) {
                var explosion = Game.explosions[key]
                explosion.update(tick)
            }
            for(var key in Game.explosionsmoke) {
                var explosionsmoke = Game.explosionsmoke[key]
                explosionsmoke.update(tick)
            }
            Game.camera.update(tick)
            
            this.setState(Game)
        }.bind(this))
    }
})

React.render(<Bananabomber/>, document.body)
