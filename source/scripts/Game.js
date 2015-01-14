var LoopStore = require("<source>/scripts/stores/LoopStore")
var KeyboardInputStore = require("<source>/scripts/stores/KeyboardInputStore")

var GameFrame = require("<source>/scripts/components/GameFrame")
var Monkey = require("<source>/scripts/components/Monkey")
var WorldTile = require("<source>/scripts/components/WorldTile")

var MonkeyStore = require("<source>/scripts/stores/MonkeyStore")
var WorldStore = require("<source>/scripts/stores/WorldStore")

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
