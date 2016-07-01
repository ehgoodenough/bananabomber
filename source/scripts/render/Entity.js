import React from "react"

export default class Entity extends React.Component {
    render() {
        return (
            <div id={this.props.entity.id} className="entity" style={this.style}>
                {!!this.props.entity.image ? (
                    <img src={this.props.entity.image}/>
                ) : null}
            </div>
        )
    }
    get style() {
        return {
            position: "absolute",
            width: this.props.entity.width + "px",
            height: this.props.entity.height + "px",
            top: this.props.entity.position.y + "px",
            left: this.props.entity.position.x + "px",
            marginTop: -0.5 * this.props.entity.height + "px",
            marginLeft: -0.5 * this.props.entity.width + "px",
            zIndex: this.props.entity.stack || this.props.entity.position.y,
            border: this.props.entity.hasBorder ? "2px solid #222" : null,
            outline: this.props.entity.hasBorder ? "1px solid #DDD" : null,
            backgroundColor: this.props.entity.color,
        }
    }
}
