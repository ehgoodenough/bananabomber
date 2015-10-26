var React = require("react")

var ArenaView = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyle()}>
                {this.renderSprites()}
            </div>
        )
    },
    renderStyle: function() {
        return {
            position: "absolute",
            top: this.props.data.y + "em",
            left: this.props.data.x + "em",
            width: this.props.data.width + "em",
            height: this.props.data.height + "em",
            backgroundImage: "url(" + this.props.data.image + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
        }
    },
    renderSprites: function() {
        //?!
    }
})

module.exports = ArenaView
