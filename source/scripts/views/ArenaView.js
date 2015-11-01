var React = require("react")

var dark_blue = "#525564"
var light_blue = "#74828F"
var blue = "96C0CE"
var tan = "#FEF6EB"
var gray = "#BEB9B5"
var red = "#C25B56"

var GenericView = require("./GenericView")
var ForEachView = require("./ForEachView")

var ArenaView = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyle()}>
                <ForEachView view={GenericView} data={this.props.data.blocks}/>
            </div>
        )
    },
    renderStyle: function() {
        var x = 0 - (BLOCK / 1.5)
        var y = 0 - (BLOCK * 2)
        var width = (this.props.data.bwidth * BLOCK) + (BLOCK / 1.5) + (BLOCK / 1.5)
        var height = (this.props.data.bheight * BLOCK) + (BLOCK * 2) + (BLOCK / 8)
        return {
            top: y + "em",
            left: x + "em",
            width: width + "em",
            height: height + "em",
            position: "absolute",
            backgroundColor: tan,
            borderTop: (BLOCK * 2) + "em" + " solid " + dark_blue,
            borderLeft: (BLOCK / 1.5) + "em" + " solid " + light_blue,
            borderRight: (BLOCK / 1.5) + "em" + " solid " + light_blue,
            borderBottom: (BLOCK / 8) + "em" + " solid " + dark_blue,
        }
    }
})

module.exports = ArenaView
