var React = require("react")

class FrameView extends React.Component {
    render() {
        return (
            <div {...this.props}
                className="frame-view"
                style={this.renderStyle()}/>
        )
    }
    renderStyle() {
        var width = this.props.data.width || 640
        var height = this.props.data.height || 480
        var color = this.props.data.color || "#EEE"
        return {
            top: "0rem",
            left: "0rem",
            right: "0rem",
            bottom: "0rem",
            margin: "auto",
            position: "fixed",
            overflow: "hidden",
            backgroundColor: color,
            width: window.innerWidth / window.innerHeight > width / height ? width / height * 100 + "vh" : 100 + "vw",
            height: window.innerWidth / window.innerHeight > width / height ? 100 + "vh" : height / width * 100 + "vw",
            fontSize: window.innerWidth / window.innerHeight > width / height ? (width / height * 100) / width + "vh" : (height / width * 100) / height + "vw",
        }
    }
    componentDidMount() {
        window.addEventListener("resize", () => this.onResize)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", () => this.onResize)
    }
    onResize() {
        this.forceUpdate()
    }
}

export default FrameView
