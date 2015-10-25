class Point {
    constructor(protopoint) {
        protopoint = protopoint || {}
        this.x = protopoint.x || protopoint.bx * BLOCK || 0
        this.y = protopoint.y || protopoint.by * BLOCK || 0
        this.z = protopoint.z || protopoint.bz * BLOCK || 0
    }
    get bx() {
        return Math.floor(this.x / BLOCK)
    }
    get by() {
        return Math.floor(this.y / BLOCK)
    }
    get bz() {
        return Math.floor(this.z / BLOCK)
    }
    set bx(bx) {
        this.x = bx * BLOCK
    }
    set by(by) {
        this.y = by * BLOCK
    }
    set bz(bz) {
        this.y = by * BLOCK
    }
    toString(format) {
        if(format == "block") {
            return Math.round(this.bx) + "x" + Math.round(this.by)
        } else {
            return Math.round(this.x) + "x" + Math.round(this.y)
        }
    }
}

export default Point
