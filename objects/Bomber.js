function Bomber(x, y)
{
	this.speed = SCALE / 10;
	this.position = new Object();
}

Bomber.prototype.moveNorth = function()
{
	var y = this.position.y - this.speed;
	if(y > 0) {this.position.y = y;}
	else {this.position.y = 0;}
}

Bomber.prototype.moveSouth = function()
{
	var y = this.position.y + this.speed;
	if(y < 540) {this.position.y = y;}
	else {this.position.y = 540;}
}

Bomber.prototype.moveWest = function()
{
	var x = this.position.x - this.speed;
	if(x > 0) {this.position.x = x;}
	else {this.position.x = 0;}
}

Bomber.prototype.moveEast = function()
{
	var x = this.position.x + this.speed;
	if(x < 960) {this.position.x = x;}
	else {this.position.x = 960;}
}

Bomber.prototype.update = function()
{
	if(Keystate.get("right arrow")) {this.moveEast();}
	else if(Keystate.get("left arrow")) {this.moveWest();}
	
	if(Keystate.get("down arrow")) {this.moveSouth();}
	else if(Keystate.get("up arrow")) {this.moveNorth();}
}

Bomber.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	
	rendering.fillStyle = "green";
	
	rendering.x = this.position.x;
	rendering.y = this.position.y;
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.cornerRadius = SCALE / 10;
	
	return rendering;
}