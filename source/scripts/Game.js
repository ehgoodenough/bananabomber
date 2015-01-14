var GameFrame = require("<scripts>/GameFrame")
var GameLoopStore = require("<stores>/GameLoopStore")
var GameInputStore = require("<stores>/GameInputStore")
var GameInputActions = require("<actions>/GameInputActions")

var Monkey = require("<components>/Monkey")
var WorldTile = require("<components>/WorldTile")
var MonkeyStore = require("<stores>/MonkeyStore")
var WorldStore = require("<stores>/WorldStore")

var Game = React.createClass({
    mixins: [
        Reflux.connect(MonkeyStore, "monkeys"),
        Reflux.connect(WorldStore, "world")
    ],
    render: function() {
        return (
            <GameFrame>
                {this.renderStore(this.state["world"].tiles, WorldTile)}
                {this.renderStore(this.state["monkeys"], Monkey)}
            </GameFrame>
        )
    },
    renderStore: function(Store, Class) {
        var renderings = []
        for(var key in Store) {
            var data = Store[key]
            renderings.push(
                <Class data={data}
                       key={key} id={key}/>
            )
        }
        return renderings
    }
})

module.exports = Game
