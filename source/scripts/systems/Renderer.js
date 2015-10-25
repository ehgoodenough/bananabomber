var React = require("react")

var ReactRenderer = function(View) {
    this.rendering = React.render(<View/>, document.body)
}

ReactRenderer.prototype.update = function(data) {
    this.rendering.setState(data || {})
}

module.exports = ReactRenderer
