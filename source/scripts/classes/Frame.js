class Frame {
    constructor(protoframe = {}) {
        this.width = protoframe.width
        this.height = protoframe.height
        this.color = protoframe.color
    }
    update() {
        // only including an update method here
        // so the update method of game doesn't
        // freak out as it tries to run all of
        // it's labelled children.
    }
}

export default Frame
