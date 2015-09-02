var vkey = require("vkey")

var Input = {
    isDown: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        return this.data[key] >= 0
    },
    isJustDown: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        if(this.data[key] == 0) {
            this.data[key] += 1
            return true
        } else {
            return false
        }
    },
    isUp: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        return this.data[key] <= 0
    },
    isJustUp: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        if(this.data[key] == -1) {
            this.data[key] -= 1
            return true
        } else {
            return false
        }
    },
    setDown: function(key) {
        this.data[key] = 0
    },
    setUp: function(key) {
        this.data[key] = -1
    },
    data: new Object(),
    mouse: {
        x: 0,
        y: 0,
    },
}

document.addEventListener("keydown", function(event) {
    if(Input.isUp(vkey[event.keyCode])) {
        Input.setDown(vkey[event.keyCode])
    }
})

document.addEventListener("keyup", function(event) {
    Input.setUp(vkey[event.keyCode])
})

document.addEventListener("mousemove", function(event) {
    var x = event.clientX
    var y = event.clientY

    var html = document.getElementById("frame-view")
    var css = window.getComputedStyle(html)
    var scale = Number(css.fontSize.match(/(\d+(\.\d+)?)px$/)[1])
    var offset = {
        x: html.offsetLeft,
        y: html.offsetTop
    }

    x -= offset.x
    y -= offset.y
    x /= scale
    y /= scale

    Input.mouse.x = x
    Input.mouse.y = y
})

module.exports = Input
