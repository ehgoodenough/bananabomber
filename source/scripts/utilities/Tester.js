var expect = require("expect.js")

var Tester = function(test) {

}

var tests = {
    "Bombers": {
        "can move": function() {},
        "can't move onto a wall": function() {},
        "can drop a bomb": function() {},
        "can't drop a bomb when they have no bombs": function() {},
        "can't drop a bomb on a bomb": function() {},
        "can't move onto a bomb": function() {},
        "can move on a bomb they just dropped": function() {},
    },
    "Bombs": {
        "will explode": function() {},
        "will sometimes not explode": function() {},
    },
    "Explosions": {
        "will spread more explosions": function() {},
        "can eliminate bombers": function() {},
        "can explode bombs": function() {},
        "can explode crates": function() {},
        "can't explode walls": function() {},
    },
    "Cameras": {
        "will zoom to fit all bombers": function() {},
        "will move to center all bombers": function() {},
        "won't zoom too far": function() {},
    },
    "Arena": {
        "": function() {},
        "": function() {},
        "": function() {},
    },
    "Crates": {
        "": function() {},
        "": function() {},
        "": function() {},
    },
    "Powerups": {
        "": function() {},
        "": function() {},
        "": function() {},
    },
    "Game": {
        "will spawn bombers": {
            "in random positions": function() {},
            "not in a wall": function() {},
            "with no crates around them": function() {},
        },
        "": function() {},
        "": function() {},
    }
}
