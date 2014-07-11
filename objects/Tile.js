function Tile(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
}

Tile.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.x = this.x * SCALE;
	rendering.y = this.y * SCALE;
	rendering.fromCenter = false;
	
	if(this.type == "wall")
	{
		rendering.fillStyle = "#444";
	}
	else if(this.type == "crate")
	{
		rendering.fillStyle = "#F4A460";
	}
	else if(this.type == "floor")
	{
		rendering.fillStyle = "#CCC";
	}
	
	return rendering;
}

Tile.prototype.explode = function(direction, intensity)
{
	if(intensity > 0)
	{
		if(this.type != "wall")
		{
			this.type = "floor";
			
			if(direction == "east" || direction == "all")
			{
				this.east.explode("east", intensity - 1);
			}
			
			if(direction == "west" || direction == "all")
			{
				this.west.explode("west", intensity - 1);
			}
			
			if(direction == "south" || direction == "all")
			{
				this.south.explode("south", intensity - 1);
			}
			
			if(direction == "north" || direction == "all")
			{
				this.north.explode("north", intensity - 1);
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