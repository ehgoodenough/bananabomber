var React = require("react")

class ForEachView extends React.Component {
    render() {
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
}

export default ForEachView
