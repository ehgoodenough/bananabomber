var px = 128

var WorldView = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={this.props.data.width * px}
                height={this.props.data.height * px}/>
        )
    },
    renderStyles: function() {
        return {
            width: this.props.data.width + "em",
            height: this.props.data.height + "em"
        }
    },
    renderTiles: function() {
        var canvas = this.getCanvas()
        for(var coords in this.props.data.tiles) {
            var tile = this.props.data.tiles[coords]
            var x = tile.position.x * px
            var y = tile.position.y * px
            canvas.fillStyle = tile.color
            canvas.fillRect(x, y, px, px)
        }
    },
    componentDidMount: function() {
        this.renderTiles()
    },
    shouldComponentUpdate: function(props) {
        return props.data.tiles != this.props.data.tiles
    },
    componentDidUpdate: function() {
        this.renderTiles()
    },
    getCanvas: function() {
        return this.refs.canvas.getDOMNode().getContext("2d")
    }
})

module.exports = WorldView
