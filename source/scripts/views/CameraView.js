var CameraView = React.createClass({
    render: function() {
        return  (
            <div style={this.renderStyle()}>
                {this.props.children}
            </div>
        )
    },
    renderStyle: function() {
        var zx = 16 / this.props.data.world.width
        var zy = 9 / this.props.data.world.height
        var zoom = Math.min(zx, zy)
        return {
            "left": 0.25 + "em",
            "position": "absolute",
            "fontSize": zoom + "em"
        }
        
        var buffer = 2
        var WIDTH = 16
        var HEIGHT = 9
        var x0 = this.props.data.monkeys[0].position.x
        var y0 = this.props.data.monkeys[0].position.y
        var x1 = this.props.data.monkeys[1].position.x
        var y1 = this.props.data.monkeys[1].position.y
        var x = Math.min(x0, x1) - buffer
        var y = Math.min(y0, y1) - buffer
        var width = Math.max(x0, x1) - x + buffer
        var height = Math.max(y0, y1) - y + buffer
        var z = Math.min(WIDTH / width, HEIGHT / height)
        return {
            "top": y * -1 + "em",
            "left": x * -1 + "em",
            "fontSize": z + "em",
            "position": "absolute"
        }
    }
})

module.exports = CameraView
