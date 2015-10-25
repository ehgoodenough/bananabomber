var React = require("react")

var FrameView = React.createClass({
    getDefaultProps: function() {
        return {
            width: 640,
            height: 480,
            color: "#EEE",
        }
    },
    render: function() {
        return (
            <div {...this.props}
                className="frame-view"
                style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        var width = this.props.width
        var height = this.props.height
        var color = this.props.color
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
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.onResize)
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.onResize)
    },
    onResize: function() {
        this.forceUpdate()
    }
})

module.exports = FrameView
