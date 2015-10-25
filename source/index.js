var Game = require("./scripts/classes/Game")

var Loop = require("./scripts/systems/Loop")
var Input = require("./scripts/systems/Input")
var Renderer = require("./scripts/systems/Renderer")

window.BLOCK = 32
window.WIDTH = 640
window.HEIGHT = 360

window.game = new Game()
game.update(1)

Loop(function(tick) {
    Renderer.update(game)
})

/*if(false) {
    window.React = require("react")
    window.Id = require("shortid")

    window.TILE = 48
    window.FRAME_WIDTH = 640
    window.FRAME_HEIGHT = 360

    window.Bomb = require("<scripts>/oldclasses/Bomb")
    window.Crate = require("<scripts>/oldclasses/Crate")
    window.World = require("<scripts>/oldclasses/World")
    window.Monkey = require("<scripts>/oldclasses/Monkey")
    window.Banana = require("<scripts>/oldclasses/Banana")
    window.Explosion = require("<scripts>/oldclasses/Explosion")
    window.Camera = require("<scripts>/oldclasses/Camera")

    window.Inputs = require("<scripts>/data/Inputs")
    window.Images = require("<scripts>/data/Images")

    window.Start = function() {
        window.Game = {
            bombs: {},
            crates: {},
            monkeys: {},
            bananas: {},
            particles: {},
            explosions: {},
            world: new World(),
            camera: new Camera(),
        }

        new Monkey({
            "number": 1,
            "name": "red",
            "color": "#C00",
            "position": {"x": 1.5 * TILE, "y": 1.5 * TILE},
            "inputs": Inputs["red monkey"],
            "images": Images["red monkey"],
        })
        new Monkey({
            "number": 2,
            "name": "green",
            "color": "#0C0",
            "position": {"x": 17.5 * TILE, "y": 1.5 * TILE},
            "inputs": Inputs["green monkey"],
            "images": Images["green monkey"],
        })
        new Monkey({
            "number": 3,
            "name": "blue",
            "color": "#00C",
            "position": {"x": 1.5 * TILE, "y": 11.5 * TILE},
            "inputs": Inputs["blue monkey"],
            "images": Images["blue monkey"],
        })
        new Monkey({
            "number": 4,
            "name": "purple",
            "color": "#C0C",
            "position": {"x": 17.5 * TILE, "y": 11.5 * TILE},
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
                    if(Math.abs(Math.floor(monkey.position.x) - x * TILE) <= TILE
                    && Math.abs(Math.floor(monkey.position.y) - y * TILE) <= TILE) {
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
            if(!this.state) {
                return <div/>
            } else {
                return (
                    <FrameView aspect-ratio={FRAME_WIDTH + "x" + FRAME_HEIGHT}>
                        <CameraView data={this.state.camera}>
                            <WorldView data={this.state.world}/>
                            <ForEachView data={this.state.bombs} view={BombView}/>
                            <ForEachView data={this.state.monkeys} view={MonkeyView}/>
                            <ForEachView data={this.state.crates} view={GameObjectView}/>
                            <ForEachView data={this.state.bananas} view={GameObjectView}/>
                            <ForEachView data={this.state.particles} view={GameObjectView}/>
                            <ForEachView data={this.state.explosions} view={GameObjectView}/>
                        </CameraView>
                    </FrameView>
                )
            }
        },
        componentDidMount: function() {
            Start()
            Loop(function(tick) {
                for(var type in Game) {
                    for(var id in Game[type]) {
                        if(!!Game[type][id].update)
                            Game[type][id].update(tick)
                    }
                }
                Game.camera.update(tick)
                this.setState(Game)
            }.bind(this))
        }
    })

    React.render(<Bananabomber/>, document.body)
}*/
