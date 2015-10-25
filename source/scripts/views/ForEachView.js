var React = require("react")

var ForEachView = React.createClass({
    render: function() {
        var renderings = new Array()
        for(var key in this.props.data) {
            var data = this.props.data[key]
            var View = this.props.view
            renderings.push(
                <View key={key}
                    data={data}/>
            )
        }
        return (
            <div>
                {renderings}
            </div>
        )
    }
})

module.exports = ForEachView
