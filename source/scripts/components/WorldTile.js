var WorldTile = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            backgroundColor: "brown",
            width: "1em", height: "1em",
            left: this.props.data.position.x + "em",
            top: this.props.data.position.y + "em",
            position: "absolute",
        }
    }
})

module.exports = WorldTile
