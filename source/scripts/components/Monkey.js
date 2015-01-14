var InputActionsStore = require("<source>/scripts/stores/InputActionsStore")

var Monkey = React.createClass({
    componentDidMount: function() {
        InputActionsStore.addAction(this.props.data.inputs["move north"], function() {console.log("hello world")})
    },
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        return {
            width: this.props.data.radius * 2 + "em",
            height: this.props.data.radius * 2 + "em",
            left: this.props.data.position.x - this.props.data.radius + "em",
            top: this.props.data.position.y - this.props.data.radius + "em"
        }
    },
    renderClasses: function() {
        return this.props.data.color + " " + "monkey"
    }
})

module.exports = Monkey
