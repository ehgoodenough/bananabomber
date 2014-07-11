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