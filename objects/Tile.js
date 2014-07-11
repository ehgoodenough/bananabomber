function Tile(type, position)
{
	this.type = type;
	this.position = position;
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
	rendering.x = this.position.x * SCALE;
	rendering.y = this.position.y * SCALE;
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.fillStyle = color;
	rendering.fromCenter = false;
	
	return rendering;
}

Tile.prototype.clear = function(direction, intensity)
{
	if(intensity > 0)
	{
		if(this.type != "wall")
		{
			this.type = "floor";
			
			if(direction == "all")
			{
				this.east.clear("east", intensity - 1);
				this.west.clear("west", intensity - 1);
				this.north.clear("north", intensity - 1);
				this.south.clear("south", intensity - 1);
			}
			else if(direction == "east")
			{
				this.east.clear("east", intensity - 1);
			}
			else if(direction == "west")
			{
				this.west.clear("west", intensity - 1);
			}
			else if(direction == "south")
			{
				this.south.clear("south", intensity - 1);
			}
			else if(direction == "north")
			{
				this.north.clear("north", intensity - 1);
			}
		}
	}
}