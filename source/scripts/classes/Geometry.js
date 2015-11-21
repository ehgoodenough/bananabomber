export class Point {
    constructor(protopoint = new Object()) {
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
    toString() {
        return this.bx + "x" + this.by
    }
    toPoint(delta = new Object()) {
        return new Point({
            bx: this.bx + (delta.bx || 0),
            by: this.by + (delta.by || 0)
        })
    }
}

export class Space {
    constructor(protospace) {
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0

        if(!!protospace.bx) {
            this.bx = protospace.bx
        } if(!!protospace.by) {
            this.by = protospace.by
        } if(!!protospace.x) {
            this.x = protospace.x
        } if(!!protospace.y) {
            this.y = protospace.y
        } if(!!protospace.w) {
            this.w = protospace.w
        } if(!!protospace.h) {
            this.h = protospace.h
        }
    }
    get x0() {
        return this.x - (this.w / 2)
    }
    get y0() {
        return this.y - (this.h / 2)
    }
    get x1() {
        return this.x + (this.w / 2)
    }
    get y1() {
        return this.y + (this.h / 2)
    }
    set x0(x0) {
        this.x = x0 + (this.w / 2)
    }
    set y0(y0) {
        this.y = y0 + (this.h / 2)
    }
    set x1(x1) {
        this.x = x1 - (this.w / 2)
    }
    set y1(y1) {
        this.y = y1 - (this.h / 2)
    }
    get bx() {
        return Math.floor(this.x / BLOCK)
    }
    get by() {
        return Math.floor(this.y / BLOCK)
    }
    get bw() {
        return Math.floor(this.w / BLOCK)
    }
    get bh() {
        return Math.floor(this.h / BLOCK)
    }
    set bx(bx) {
        this.x = bx * BLOCK
    }
    set by(by) {
        this.y = by * BLOCK
    }
    set bw(bw) {
        this.w = bw * BLOCK
    }
    set bh(bh) {
        this.h = bh * BLOCK
    }
    get bx0() {
        return Math.floor(this.x0 / BLOCK)
    }
    get bx1() {
        return Math.floor(this.x1 / BLOCK)
    }
    get by0() {
        return Math.floor(this.y0 / BLOCK)
    }
    get by1() {
        return Math.floor(this.y1 / BLOCK)
    }
    set bx0(bx0) {
        this.x0 = bx0 * BLOCK
    }
    set bx1(bx1) {
        this.x1 = bx1 * BLOCK
    }
    set by0(by0) {
        this.y0 = by0 * BLOCK
    }
    set by1(by1) {
        this.y1 = by1 * BLOCK
    }
    getBositions(delta={}) {
        delta.x = delta.x || 0
        delta.y = delta.y || 0

        var bx0 = Math.floor((this.x0 + delta.x) / BLOCK)
        var bx1 = Math.ceil((this.x1 + delta.x) / BLOCK)
        var by0 = Math.floor((this.y0 + delta.y) / BLOCK)
        var by1 = Math.ceil((this.y1 + delta.y) / BLOCK)

        var bositions = {}
        for(var bx = bx0; bx < bx1; bx++) {
            for(var by = by0; by < by1; by++) {
                bositions[bx + "x" + by] = new Point({
                    bx: bx, by: by
                })
            }
        }
        return bositions
    }
    getDeltaBositions(delta={}) {
        var bositions = this.getBositions()
        var deltabositions = this.getBositions(delta)

        for(var key in deltabositions) {
            if(bositions[key] != undefined) {
                delete deltabositions[key]
            }
        }
        return deltabositions
    }
    toString() {
        return this.bx + "x" + this.by
    }
    toPoint() {
        return new Point({bx: this.bx, by: this.by})
    }
}
