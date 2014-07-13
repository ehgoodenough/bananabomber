function Tile(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
	
	this.explosion = 0;
	
	this.bombers = new Object();
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
	
	for(var i in this.bombers)
	{
		var bomber = this.bombers[i];
		
		if(pixel2tile(bomber.getEastestPosition()) < this.x
		|| pixel2tile(bomber.getWestestPosition()) > this.x
		|| pixel2tile(bomber.getSouthestPosition()) < this.y
		|| pixel2tile(bomber.getNorthestPosition()) > this.y
		|| bomber.status == "blownup")
		{
			delete this.bombers[i];
		}
	}
}

Tile.prototype.render = function(x, y)
{
	var rendering = {};
	
	rendering.type = "rectangle";
	rendering.fromCenter = false;
	
	rendering.x = x;
	rendering.y = y;
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	
	if(this.type == "wall")
	{
		rendering.fillStyle = "#444";
		rendering.height += SCALE * 0.25;
		rendering.y -= SCALE * 0.25;
	}
	else if(this.type == "sidewall")
	{
		rendering.fillStyle = "#444";
	}
	else if(this.type == "crate")
	{
		rendering.fillStyle = "rgb(179, 114, 56)";
		rendering.height += SCALE * 0.25;
		rendering.y -= SCALE * 0.25;
	}
	else if(this.type == "floor")
	{
		rendering.fillStyle = "rgb(210, 210, 200)";
	}
	
	return rendering;
}

Tile.prototype.hasPowerup = function()
{
	return this.powerup != undefined;
}

Tile.prototype.getPowerup = function()
{
	var powerup = this.powerup;
	delete this.powerup;
	return powerup;
}

Tile.prototype.hasBombers = function()
{
	return Object.keys(this.bombers).length > 0;
}

Tile.prototype.addBomber = function(bomber)
{
	this.bombers[bomber.id] = bomber;
}

Tile.prototype.removeBomber = function(bomber)
{
	delete this.bombers[bomber.id];
}

Tile.prototype.isWalkable = function(bomber)
{
	if(this.type != "floor")
	{
		return false;
	}
	if(this.bomb && !this.bombers[bomber.id])
	{
		return false;
	}
	else
	{
		return true;
	}
}

Tile.poweruprate = 0;

Tile.prototype.explode = function(direction, intensity, explosion)
{
	if(intensity > 0)
	{
		if(this.type != "wall" && this.type != "sidewall")
		{
			this.powerup = undefined;
			
			if(explosion && this.type == "crate")
			{
				if(++Tile.poweruprate % 7 == 0)
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
			
			for(var i in this.bombers)
			{
				var bomber = this.bombers[i];
				bomber.status = "blownup";
			}
			
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