function Tile(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
}

Tile.prototype.render = function()
{
	if(this.type == "wall")
	{
		color = "#444";
	}
	else if(this.type == "crate")
	{
		color = "#F4A460";
	}
	else if(this.type == "floor")
	{
		color = "#CCC";
	}
	
	var rendering = {};
	
	rendering.type = "rectangle";
	rendering.x = this.x * SCALE;
	rendering.y = this.y * SCALE;
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.fillStyle = color;
	rendering.fromCenter = false;
	
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

Tile.prototype.spawnBomb = function()
{
	this.bomb = new Bomb(this.x, this.y);
}