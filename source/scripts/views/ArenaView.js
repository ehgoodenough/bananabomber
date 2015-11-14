var React = require("react")

var GenericView = require("./GenericView")
var ForEachView = require("./ForEachView")

class ArenaView extends React.Component {
    render() {
        return (
            <div style={this.renderStyle()}/>
        )
    }
    renderStyle() {
        var width = this.props.data.bwidth * BLOCK
        var height = this.props.data.bheight * BLOCK
        var border = BLOCK * 0.5
        return {
            top: 0 - border + "em",
            left: 0 - border + "em",
            width: width + (border * 2) + "em",
            height: height + (border * 2) + "em",
            position: "absolute",
            backgroundColor: "#FEF6EB",
            border: (border) + "em solid #525564",
        }
    }
}

export default ArenaView
