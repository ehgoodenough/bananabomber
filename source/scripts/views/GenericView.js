var React = require("react")

var GenericView = React.createClass({
    render: function() {
        var rendering = this.props.data.render() || {}
        return (
            <div style={{
                position: "absolute",
                top: Math.round(rendering.y || 0) + "em",
                left: Math.round(rendering.x || 0) + "em",
                width: Math.round(rendering.width || 16) + "em",
                height: Math.round(rendering.height || 16) + "em",
                backgroundColor: rendering.color || "#FF69B4",
                borderRadius: (rendering.roundness || 0) + "em",
            }}/>
        )
    }
})

module.exports = GenericView
