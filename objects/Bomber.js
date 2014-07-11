function Bomber(x, y)
{
	this.speed = SCALE / 10;
	
	this.position = new Object();
	this.position.x = x * SCALE + (SCALE / 2);
	this.position.y = y * SCALE + (SCALE / 2);
}

Bomber.prototype.moveNorth = function()
{
	var x = this.position.x;
	var y = this.position.y - this.speed - (SCALE / 4);
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.position.y -= this.speed;
	}
}

Bomber.prototype.moveSouth = function()
{
	var x = this.position.x;
	var y = this.position.y + this.speed + (SCALE / 4);
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.position.y += this.speed;
	}
}

Bomber.prototype.moveWest = function()
{
	var x = this.position.x - this.speed - (SCALE / 4);
	var y = this.position.y;
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.position.x -= this.speed;
	}
}

Bomber.prototype.moveEast = function()
{
	var x = this.position.x + this.speed + (SCALE / 4);
	var y = this.position.y;
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.position.x += this.speed;
	}
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