var React = require("react")

var FrameView = require("<scripts>/views/FrameView")

var PrimaryView = React.createClass({
    render: function() {
        if(!this.state) {
            return (
                <div/>
            )
        } else {
            return (
                <FrameView width={640} height={360}>
                    <span style={{fontSize: "32em"}}>
                        Hello World!
                    </span>
                </FrameView>
            )
        }
    }
})

module.exports = PrimaryView
