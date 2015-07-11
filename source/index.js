window.React = require("react")
window.Phlux = require("phlux")
window.Game = {
    Loop: require("tickly"),
    Input: require("keyb")
}

var GameFrame = require("<scripts>/components/GameFrame")

var Bananabomber = React.createClass({
    render: function() {
        return (
            <GameFrame aspect-ratio="16x9">
                Hello World!
            </GameFrame>
        )
    }
})

React.render(<Bananabomber/>, document.body)
