var React = require("react")
var ReactDOM = require("react-dom")

var PrimaryView = require("../views/PrimaryView")

var ReactRenderer = {
    rendering: ReactDOM.render(<PrimaryView/>, document.getElementById("mount")),
    update: function(data) {this.rendering.setState(data || {})}
}

export default ReactRenderer
