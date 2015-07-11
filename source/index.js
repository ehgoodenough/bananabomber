window.React = require("react")
window.Phlux = require("phlux")
window.Game = {
    loop: require("tickly").loop,
    input: require("keyb")
}

var GameStore = require("<scripts>/stores/GameStore")

var CameraView = require("<scripts>/views/CameraView")
var GameFrameView = require("<scripts>/views/GameFrameView")
var GameObjectView = require("<scripts>/views/GameObjectView")
var WorldView = require("<scripts>/views/WorldView")

var Bananabomber = React.createClass({
    mixins: [
        Phlux.connectStore(GameStore, "game"),
    ],
    render: function() {
        return (
            <GameFrameView aspect-ratio="16x9">
                <CameraView data={this.state.game}>
                    <WorldView data={this.state.game.world}/>
                    {this.renderViews(GameObjectView, this.state.game.monkeys)}
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
        Game.loop(function(tick) {
            GameStore.update(tick)
        })
    }
})

React.render(<Bananabomber/>, document.body)
