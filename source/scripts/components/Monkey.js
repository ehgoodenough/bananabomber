var Monkey = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            width: "1em", height: "1em",
            left: this.props.data.position.x + "em",
            top: this.props.data.position.y + "em",
            backgroundColor: this.props.data.color
        }
    }
})

module.exports = Monkey
