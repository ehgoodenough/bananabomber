var GameFrame = require("<scripts>/GameFrame")

var Monkey = require("<components>/Monkey")
var MonkeyStore = require("<stores>/MonkeyStore")

var Game = React.createClass({
    mixins: [
        Reflux.connect(MonkeyStore, "monkeys"),
    ],
    render: function() {
        return (
            <GameFrame>
                {this.renderStore(this.state["monkeys"], Monkey)}
            </GameFrame>
        )
    },
    renderStore: function(Store, Class) {
        var renderings = []
        for(var key in Store) {
            var data = Store[key]
            renderings.push(
                <Class key={key}
                       data={data}/>
            )
        }
        return renderings
    }
})

module.exports = Game
