window.React = require("react/addons")
window.Reflux = require("reflux")

Reflux.StoreMethods.getInitialState = function() {return this.getData()}
Reflux.StoreMethods.retrigger = function() {this.trigger(this.getData())}

var Game = require("<scripts>/Game")
React.render(<Game/>, document.body)
