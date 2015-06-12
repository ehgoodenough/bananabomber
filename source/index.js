window.React = require("react")

var GameFrame = require("<scripts>/components/GameFrame")

var Bananabomber = React.createClass({
    render: function() {
        return (
            <GameFrame aspect-ratio="4x3">
                Hiya!
            </GameFrame>
        )
    }
})

React.render(<Bananabomber/>, document.body)
