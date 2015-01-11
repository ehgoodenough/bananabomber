var GameFrame = React.createClass({
    render: function() {
        return (
            <div id="game-frame" className="_16x9">
                {this.props.children}
            </div>
        )
    }
})

module.exports = GameFrame
