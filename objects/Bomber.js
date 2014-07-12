function Bomber(x, y)
{
	objedex.bombers.add(this);
	
	this.x = x * SCALE + (SCALE / 2);
	this.y = y * SCALE + (SCALE / 2);
	
	this.speed = SCALE;
	
	this.bombcount = 2;
}

Bomber.prototype.moveNorth = function(delta)
{
	var x = this.x;
	var y = this.y - (this.speed * delta) - (SCALE / 4);
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.y -= this.speed * delta;
	}
}

Bomber.prototype.moveSouth = function(delta)
{
	var x = this.x;
	var y = this.y + (this.speed * delta) + (SCALE / 4);
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.y += this.speed * delta;
	}
}

Bomber.prototype.moveWest = function(delta)
{
	var x = this.x - (this.speed * delta) - (SCALE / 4);
	var y = this.y;
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.x -= (this.speed * delta);
	}
}

Bomber.prototype.moveEast = function(delta)
{
	var x = this.x + (this.speed * delta) + (SCALE / 4);
	var y = this.y;
	
	if(stage.getTile(x, y).type == "floor")
	{
		this.x += this.speed * delta;
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

Bomber.prototype.update = function(delta)
{
	if(Keystate.get("right arrow")) {this.moveEast(delta);}
	else if(Keystate.get("left arrow")) {this.moveWest(delta);}
	
	if(Keystate.get("down arrow")) {this.moveSouth(delta);}
	else if(Keystate.get("up arrow")) {this.moveNorth(delta);}
	
	if(Keystate.get("z")) {this.dropBomb();}
}

Bomber.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	rendering.x = SCREEN_WIDTH*SCALE / 2;
	rendering.y = SCREEN_HEIGHT*SCALE / 2;
	rendering.width = SCALE - 5;
	rendering.height = SCALE - 5;
	rendering.fillStyle = "green";
	rendering.cornerRadius = SCALE / 10;
	
	return rendering;
}