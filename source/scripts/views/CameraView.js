var CameraView = React.createClass({
    render: function() {
        return  (
            <div style={this.renderStyle()}>
                {this.props.children}
            </div>
        )
    },
    renderStyle: function() {
        var y0 = this.props.data.monkeys[0].position.y
        var y1 = this.props.data.monkeys[1].position.y
        var zoom = 0.8173
        zoom = 0.941
        return {
            "position": "absolute",
            "fontSize": zoom + "em"
        }
    }
})

module.exports = CameraView
