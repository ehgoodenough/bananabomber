var MonkeyView = React.createClass({
    render: function() {
        return (
            <div style={this.renderMonkey()}>
                <div style={this.renderHead()}/>
                <div style={this.renderBody()}/>
            </div>
        )
    },
    renderMonkey: function() {
        var y = this.props.data.position.y - this.props.data.anchor.y
        var x = this.props.data.position.x - this.props.data.anchor.x
        var z = this.props.data.isDead ? 9999999 : Math.round((this.props.data.position.y - this.props.data.anchor.y) * 100)
        return {
            "width": "1em",
            "height": "1em",
            "position": "absolute",
            "top": y.toFixed(2) + "em",
            "left": x.toFixed(2) + "em",
            "zIndex": z,
            "opacity": this.props.data.isDead ? 0.75 : 1,
        }
    },
    renderHead: function() {
        var image = this.props.data.images.head.front
        if(this.props.data.direction.y < 0) {
            image = this.props.data.images.head.back
        }
        return {
            "position": "absolute",
            "width": (38 / 38).toFixed(1) + "em",
            "height": (23 / 38).toFixed(1) + "em",
            "backgroundSize": "contain",
            "backgroundRepeat": "no-repeat",
            "backgroundImage": "url(" + image + ")",
        }
    },
    renderBody: function() {
        var bodies = this.props.data.images.body
        if(this.props.data.isDead == true) {
            bodies = this.props.data.images.ghostbody
        }
        var image = bodies.front
        if(this.props.data.direction.y < 0) {
            image = bodies.back
        }
        var transform = "scaleX(1)"
        if(this.props.data.direction.x > 0) {
            transform = "scaleX(-1)"
        }
        return {
            "position": "absolute",
            "top": (22 / 38).toFixed(1) + "em",
            "left": (13 / 38).toFixed(1) + "em",
            "width": (19 / 38).toFixed(1) + "em",
            "height": (14 / 38).toFixed(1) + "em",
            "transform": transform,
            "transformOrigin": "27%",
            "backgroundSize": "contain",
            "backgroundRepeat": "no-repeat",
            "backgroundImage": "url(" + image + ")",
        }
    }
})

module.exports = MonkeyView
