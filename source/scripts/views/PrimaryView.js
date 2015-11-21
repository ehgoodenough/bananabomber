var React = require("react")

var FrameView = require("./FrameView")
var ForEachView = require("./ForEachView")
var GenericView = require("./GenericView")
var CameraView = require("./CameraView")
var ArenaView = require("./ArenaView")

var Frame = require("../classes/Frame")

class PrimaryView extends React.Component {
    render() {
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
                        <ForEachView view={GenericView} data={this.state.bombs}/>
                        <ForEachView view={GenericView} data={this.state.bombers}/>
                        <ForEachView view={GenericView} data={this.state.boomsmokes}/>
                    </CameraView>
                </FrameView>
            )
        }
    }
}

export default PrimaryView
