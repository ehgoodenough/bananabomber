import React from "react"

export default class Entity extends React.Component {
    render() {
        return (
            <div id={this.props.entity.id} style={this.style}/>
        )
    }
    get style() {
        return {
            position: "absolute",
            width: this.props.entity.width + "px",
            height: this.props.entity.height + "px",
            top: this.props.entity.position.y + "px",
            left: this.props.entity.position.x + "px",
            backgroundColor: this.props.entity.color,
            // marginTop: -0.5 * this.props.entity.height + "px",
            // marginLeft: -0.5 * this.props.entity.width + "px",
        }
    }
}
