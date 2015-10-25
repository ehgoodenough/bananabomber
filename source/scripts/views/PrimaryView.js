var React = require("react")

var FrameView = require("./FrameView")
var ForEachView = require("./ForEachView")
var GenericView = require("./GenericView")
var CameraView = require("./CameraView")

var Frame = require("../classes/Frame")

var PrimaryView = React.createClass({
    render: function() {
        if(!this.state) {
            return (
                <div/>
            )
        } else {
            return (
                <FrameView width={Frame.width} height={Frame.height}>
                    <CameraView data={this.state.camera}>
                        <ForEachView view={GenericView} data={this.state.blocks}/>
                        <ForEachView view={GenericView} data={this.state.arenas}/>
                    </CameraView>
                </FrameView>
            )
        }
    }
})

module.exports = PrimaryView
