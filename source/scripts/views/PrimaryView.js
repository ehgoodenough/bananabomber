var React = require("react")

var FrameView = require("./FrameView")
var ForEachView = require("./ForEachView")
var GenericView = require("./GenericView")

var PrimaryView = React.createClass({
    render: function() {
        if(!this.state) {
            return (
                <div/>
            )
        } else {
            return (
                <FrameView width={640} height={360}>
                    <ForEachView view={GenericView} data={this.state.blocks}/>
                </FrameView>
            )
        }
    }
})

module.exports = PrimaryView
