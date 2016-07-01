import React from "react"
import ReactDOM from "react-dom"

import Entity from "./Entity.js"
import Frame from "./Frame.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    {this.state.game.entities.map((entity) => {
                        return <Entity entity={entity} key={entity.key}/>
                    })}
                </Frame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}
