var px = 128

var WorldView = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyle()}>
                {this.renderWalls()}
            </div>
        )
    },
    renderStyle: function() {
        var world = this.props.data
        return {
            width: world.width + "em",
            height: world.height + "em",
            backgroundColor: world.color
        }
    },
    renderWalls: function() {
        var renderings = new Array()
        for(var coords in this.props.data.walls) {
            var wall = this.props.data.walls[coords]
            renderings.push(
                <WorldTileView key={coords} data={wall}/>
            )
        }
        return renderings
    }
})

var WorldTileView = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        var wall = this.props.data
        return {
            width: "1em",
            height: "1em",
            position: "absolute",
            top: wall.position.y + "em",
            left: wall.position.x + "em",
            backgroundColor: wall.color,
        }
    }
})

module.exports = WorldView
