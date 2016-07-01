import React from "react"
import ReactDOM from "react-dom"

import Entity from "./Entity.js"
import Frame from "./Frame.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    <Entity entity={this.state.game.entities[0]}/>
                </Frame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}
