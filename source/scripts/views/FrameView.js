var FrameView = React.createClass({
    getDefaultProps: function() {
        return {
            "aspect-ratio": "4x3"
        }
    },
    render: function() {
        return (
            <div id="frame-view" {...this.props}
                className={"_" + this.props["aspect-ratio"]}/>
        )
    }
})

module.exports = FrameView
