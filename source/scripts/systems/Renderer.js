var React = require("react")

var PrimaryView = require("../views/PrimaryView")

var ReactRenderer = {
    rendering: React.render(<PrimaryView/>, document.body),
    update: function(data) {this.rendering.setState(data || {})}
}

module.exports = ReactRenderer
