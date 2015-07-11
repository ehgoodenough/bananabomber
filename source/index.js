window.React = require("react")
window.Phlux = require("phlux")
window.Game = {
    Loop: require("tickly"),
    Input: require("keyb")
}

var GameFrame = require("<scripts>/views/GameFrame")
var GameStore = require("<scripts>/stores/GameStore")
var GameObjectView = require("<scripts>/views/GameObjectView")

var Bananabomber = React.createClass({
    mixins: [
        Phlux.connectStore(GameStore, "game"),
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="16x9">
                {this.renderViews(GameObjectView, this.state.game.monkeys)}
            </GameFrame>
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
    }
})

React.render(<Bananabomber/>, document.body)
