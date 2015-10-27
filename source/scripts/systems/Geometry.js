var Geometry = {
    getAngleBetweenPoints: function(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
    },
    getDistanceBetweenPoints: function(p1, p2) {
        var x = p1.x - p2.x
        var y = p1.y - p2.y
        return Math.sqrt((x * x) + (y * y))
    }
}

export default Geometry
