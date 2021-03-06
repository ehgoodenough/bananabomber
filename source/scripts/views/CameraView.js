var React = require("react")

class CameraView extends React.Component {
    render() {
        return (
            <div style={{position: "absolute",
                top: (this.props.data.position.y || 0) * -1 + "em",
                left: (this.props.data.position.x || 0) * -1 + "em",
                fontSize: (this.props.data.position.z || 1) + "em"}}>
                {this.props.children}
            </div>
        )
    }
}

export default CameraView
