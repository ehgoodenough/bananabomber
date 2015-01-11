var GameFrame = require("<scripts>/GameFrame")

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame>
                <div style={{
                    backgroundColor: "red",
                    width: "1em",
                    height: "1em",
                    position: "absolute",
                    top: "8em",
                    left: "15em"
                }}>!!!!!</div>
            </GameFrame>
        )
    }
})

module.exports = Game
