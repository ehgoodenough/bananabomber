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
	rendering.x = this.x * SCALE;
	rendering.y = this.y * SCALE;
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.fromCenter = false;
	
	if(this.type == "wall")
	{
		rendering.fillStyle = "#444";
	}
	else if(this.type == "crate")
	{
		rendering.fillStyle = "#888";
	}
	else if(this.type == "floor")
	{
		rendering.fillStyle = "#CCC";
	}
	
	return rendering;
}