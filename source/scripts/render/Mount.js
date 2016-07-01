import React from "react"
import ReactDOM from "react-dom"

import Entity from "./Entity.js"
import Frame from "./Frame.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.game.frame}>
                    <Entity entity={this.state.game.player}/>
                </Frame>
            )
        } else {
            return (
                <div/>
            )
        }
    }
    update(state) {
        this.setState(state || {})
    }
}
