class Arena {
    constructor(protoarena) {
        this.width = protoarena.width
        this.height = protoarena.height
    }
    render() {
        return {
            width: this.width * BLOCK,
            height: this.height * BLOCK,
        }
    }
}

export default Arena
