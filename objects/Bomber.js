function Bomber(x, y)
{
	objedex.bombers.add(this);
	
	this.x = x * SCALE + (SCALE / 2);
	this.y = y * SCALE + (SCALE / 2);
	
	this.speed = SCALE / 10;
	
	this.bombcount = 2;
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
	if(this.bombcount > 0)
	{
		if(!stage.getTile(this.x, this.y).hasBomb())
		{
			this.bombcount--;
			
			stage.getTile(this.x, this.y).spawnBomb(this);
		}
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
	
	rendering.x = 960 / 2;
	rendering.y = 540 / 2;
	
	/*if(this.x < (960 / 2))
	{
		rendering.x -= this.x;
	}*/
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.cornerRadius = SCALE / 10;
	
	return rendering;
}