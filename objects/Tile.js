function Tile(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
	
	this.explosion = 0;
}

Tile.prototype.update = function(delta)
{
	if(this.explosion > 0)
	{
		this.explosion -= 1;
	}
	
	if(this.bomb)
	{
		this.bomb.update(delta);
	}
}

Tile.prototype.render = function(x, y)
{
	var rendering = {};
	
	rendering.fromCenter = false;
	
	rendering.x = x;
	rendering.y = y;
	
	if(this.type == "wall")
	{
		rendering.type = "image";
		rendering.source = "./images/stone.png";
		rendering.y -= 70;
	}
	else if(this.type == "crate")
	{
		rendering.type = "image";
		rendering.source = "./images/wood.png";
		rendering.y -= 70;
	}
	else if(this.type == "floor")
	{
		rendering.type = "image";
		rendering.source = "./images/plain.png";
		rendering.y -= 70;
		rendering.height = 200;
	}
	
	return rendering;
}

Tile.prototype.isPassable = function()
{
	if(this.type != "floor")
	{
		return false;
	}
	else if(this.bomb)
	{
		return false;
	}
	else
	{
		return true;
	}
}

Tile.poweruprate = 1;

Tile.prototype.explode = function(direction, intensity, explosion)
{
	if(intensity > 0)
	{
		if(this.type != "wall")
		{
			this.powerup = undefined;
			
			if(explosion && this.type == "crate")
			{
				if(Tile.poweruprate++ % 11 == 0)
				{
					var random = Math.random();
					
					if(random < 1/3)
					{
						this.powerup = new Powerup(this.x, this.y, "power");
					}
					else if(random > 2/3)
					{
						this.powerup = new Powerup(this.x, this.y, "speed");
					}
					else
					{
						this.powerup = new Powerup(this.x, this.y, "amount");
					}
				}
			}
			
			this.type = "floor";
			
			objedex.bombers.foreach(function(bomber)
			{
				if(pixel2tile(bomber.x) == this.x
				&& pixel2tile(bomber.y) == this.y)
				{
					bomber.status = "blownup";
				}
			}
			.bind(this));
			
			if(explosion)
			{
				this.explosion = 16;
			}
			
			if(this.bomb)
			{
				this.bomb.explode();
				return;
			}
			
			if(direction == "east" || direction == "all")
			{
				this.east.explode("east", intensity - 1, explosion);
			}
			
			if(direction == "west" || direction == "all")
			{
				this.west.explode("west", intensity - 1, explosion);
			}
			
			if(direction == "south" || direction == "all")
			{
				this.south.explode("south", intensity - 1, explosion);
			}
			
			if(direction == "north" || direction == "all")
			{
				this.north.explode("north", intensity - 1, explosion);
			}
		}
	}
}

Tile.prototype.hasBomb = function()
{
	return this.bomb != undefined;
}

Tile.prototype.spawnBomb = function(bomber)
{
	this.bomb = new Bomb(this.x, this.y, bomber);
}

Tile.prototype.getBomb = function(bomber)
{
	return this.bomb;
}