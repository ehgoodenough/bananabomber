function Bomber(x, y)
{
	objedex.bombers.add(this);
	
	this.x = x * SCALE + (SCALE / 2);
	this.y = y * SCALE + (SCALE / 2);
	
	this.speed = SCALE / 10;
}

Bomber.prototype.moveNorth = function()
{
	var x = this.x;
	var y = this.y - this.speed - (SCALE / 4);
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.y -= this.speed;
	}
}

Bomber.prototype.moveSouth = function()
{
	var x = this.x;
	var y = this.y + this.speed + (SCALE / 4);
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.y += this.speed;
	}
}

Bomber.prototype.moveWest = function()
{
	var x = this.x - this.speed - (SCALE / 4);
	var y = this.y;
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.x -= this.speed;
	}
}

Bomber.prototype.moveEast = function()
{
	var x = this.x + this.speed + (SCALE / 4);
	var y = this.y;
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.x += this.speed;
	}
}

Bomber.prototype.dropBomb = function()
{
	if(!stage.getTile(this.x, this.y).hasBomb())
	{
		stage.getTile(this.x, this.y).spawnBomb();
	}
}

Bomber.prototype.update = function()
{
	if(Keystate.get("right arrow")) {this.moveEast();}
	else if(Keystate.get("left arrow")) {this.moveWest();}
	
	if(Keystate.get("down arrow")) {this.moveSouth();}
	else if(Keystate.get("up arrow")) {this.moveNorth();}
	
	if(Keystate.get("z")) {this.dropBomb();}
}

Bomber.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	
	rendering.fillStyle = "green";
	
	rendering.x = this.x;
	rendering.y = this.y;
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.cornerRadius = SCALE / 10;
	
	return rendering;
}