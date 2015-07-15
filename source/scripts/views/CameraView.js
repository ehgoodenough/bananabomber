var CameraView = React.createClass({
    render: function() {
        return (
            <div style={this.props.data.getStyle()}>
                {this.props.children}
            </div>
        )
    }
})

module.exports = CameraView
