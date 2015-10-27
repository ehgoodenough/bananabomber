var React = require("react")

var dark_blue = "#525564"
var light_blue = "#74828F"
var blue = "96C0CE"
var tan = "#FEF6EB"
var gray = "#BEB9B5"
var red = "#C25B56"

var ArenaView = React.createClass({
    render: function() {
        return (
            <div>
                <div style={this.renderCrowdStyle()}/>
                <div style={this.renderFieldStyle()}/>
                {this.renderAudience()}
            </div>
        )
    },
    renderCrowdStyle: function() {
        return {
            top: (-5 * BLOCK) + "em",
            left: (-5 * BLOCK) + "em",
            width: this.props.data.width + (10 * BLOCK) + "em",
            height: this.props.data.height + (10 * BLOCK) + "em",
            position: "absolute",
            backgroundColor: gray
        }
    },
    renderFieldStyle: function() {
        var x = 0 - (BLOCK / 1.5)
        var y = 0 - (BLOCK * 2)
        var width = this.props.data.width + (BLOCK / 1.5) + (BLOCK / 1.5)
        var height = this.props.data.height + (BLOCK * 2) + (BLOCK / 8)
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
    },
    renderAudience: function() {
        var renderings = []
        for(var key in this.props.data.audience) {
            var dude = this.props.data.audience[key]
            renderings.push(
                <div key={key} style={{
                    top: Math.floor(dude.y + dude.qy) + "em",
                    left: Math.floor(dude.x + dude.qx) + "em",
                    width: dude.width + "em",
                    height: dude.height + "em",
                    zIndex: dude.z,
                    backgroundColor: dude.color,
                    position: "absolute",
                    borderRadius: "10%",
                    transform: "rotate(" + dude.angle + "deg)"
                }}/>
            )
        }
        return renderings
    }
})

module.exports = ArenaView
