var BombView = React.createClass({
    render: function() {
        return (
            <div style={this.props.data.getStyle()}/>
        )
    }
})

module.exports = BombView
