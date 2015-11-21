var Input = require("../systems/Input")

var Inputs = {
    "wasd": {
        "move north": new Input.Keyboard("W"),
        "move south": new Input.Keyboard("S"),
        "move west": new Input.Keyboard("A"),
        "move east": new Input.Keyboard("D"),
        "drop bomb": new Input.Keyboard("E")
    },
    "jikl": {
        "move north": new Input.Keyboard("I"),
        "move south": new Input.Keyboard("K"),
        "move west": new Input.Keyboard("J"),
        "move east": new Input.Keyboard("L"),
        "drop bomb": new Input.Keyboard("O")
    },
    "fght": {
        "move north": new Input.Keyboard("T"),
        "move south": new Input.Keyboard("G"),
        "move west": new Input.Keyboard("F"),
        "move east": new Input.Keyboard("H"),
        "drop bomb": new Input.Keyboard("Y")
    },
    "arrows": {
        "move north": new Input.Keyboard("<up>"),
        "move south": new Input.Keyboard("<down>"),
        "move west": new Input.Keyboard("<left>"),
        "move east": new Input.Keyboard("<right>"),
        "drop bomb": new Input.Keyboard("<space>")
    }
}

export default Inputs
