var MonkeyStatusView = React.createClass({
    render: function() {
        var style={
            fontSize: "0.7em"
        }
        return (
            <div style={this.renderStyle()}>
                <div style={style}>
                    {this.props.data.bomb.intensity}x
                </div>
            </div>
        )
    },
    renderStyle: function() {
        var style = {
            zIndex: 10000,
            width: "1.75em",
            height: "1.75em",
            textAlign: "center",
            lineHeight: "1.75em",
            position: "absolute",
            borderRadius: "1em",
            backgroundColor: this.props.data.color,
            color: "#EEE",
        }
        var inset = -0 + "em"
        if(this.props.data.number == 1) {
            style.top = inset
            style.left = inset
            //style.textAlign = "right"
            style.borderTopLeftRadius = "0em"
        } else if(this.props.data.number == 2) {
            style.top = inset
            style.right = inset
            //style.textAlign = "left"
            style.borderTopRightRadius = "0em"
        } else if(this.props.data.number == 3) {
            style.bottom = inset
            style.left = inset
            //style.textAlign = "right"
            style.borderBottomLeftRadius = "0em"
        } else if(this.props.data.number == 4) {
            style.bottom = inset
            style.right = inset
            //style.textAlign = "left"
            style.borderBottomRightRadius = "0em"
        }
        return style
    }
})

module.exports = MonkeyStatusView
