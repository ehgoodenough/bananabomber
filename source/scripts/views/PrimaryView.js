var React = require("react")

var FrameView = require("./FrameView")
var ForEachView = require("./ForEachView")
var GenericView = require("./GenericView")
var CameraView = require("./CameraView")
var ArenaView = require("./ArenaView")

var Frame = require("../classes/Frame")

var PrimaryView = React.createClass({
    render: function() {
        if(!this.state) {
            return (
                <div/>
            )
        } else {
            return (
                <FrameView data={this.state.frame}>
                    <CameraView data={this.state.camera}>
                        <ArenaView data={this.state.arena}/>
                        <ForEachView view={GenericView} data={this.state.blocks}/>
                        <ForEachView view={GenericView} data={this.state.bombers}/>
                    </CameraView>
                </FrameView>
            )
        }
    }
})

module.exports = PrimaryView
