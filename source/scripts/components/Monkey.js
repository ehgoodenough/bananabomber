var InputActionsStore = require("<source>/scripts/stores/InputActionsStore")
var MonkeyActions = require("<source>/scripts/actions/MonkeyActions")

var Monkey = React.createClass({
    componentDidMount: function() {
        InputActionsStore.addAction(this.props.data.inputs["move north"], MonkeyActions.MonkeyMoveNorth.bind(null, this.props.data._id))
        InputActionsStore.addAction(this.props.data.inputs["move south"], MonkeyActions.MonkeyMoveSouth.bind(null, this.props.data._id))
        InputActionsStore.addAction(this.props.data.inputs["move east"], MonkeyActions.MonkeyMoveEast.bind(null, this.props.data._id))
        InputActionsStore.addAction(this.props.data.inputs["move west"], MonkeyActions.MonkeyMoveWest.bind(null, this.props.data._id))
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
