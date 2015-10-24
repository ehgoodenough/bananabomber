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
            width: world.width * TILE + "em",
            height: world.height * TILE + "em",
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
            width: TILE + "em",
            height: TILE + "em",
            position: "absolute",
            top: wall.position.y * TILE + "em",
            left: wall.position.x * TILE + "em",
            backgroundColor: wall.color,
        }
    }
})

module.exports = WorldView
