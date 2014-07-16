var SCALE = 48;

function pixel2tile(value) {return Math.floor(value / SCALE);}
function tile2pixel(value) {return value * SCALE;}

var game = new Game(new PlayGameState());