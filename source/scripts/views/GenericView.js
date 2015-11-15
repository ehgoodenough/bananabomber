var React = require("react")

class GenericView extends React.Component {
    render() {
        var rendering = this.props.data.render() || {}
        return (
            <div style={{
                position: "absolute",
                top: (rendering.y || 0) + "em",
                left: (rendering.x || 0) + "em",
                width: (rendering.width || 16) + "em",
                height: (rendering.height || 16) + "em",
                backgroundColor: rendering.color || "#FF69B4",
                borderRadius: (rendering.roundness || 0) + "em",
                transform: "rotate(" + rendering.rotation + "deg)",
            }}/>
        )
    }
}

export default GenericView
