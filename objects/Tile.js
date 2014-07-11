function Tile(type, position)
{
	this.type = type;
	this.position = position;
	
	if(this.type == "wall")
	{
		this.color = "#444";
	}
	else
	{
		this.color = "#CCC";
	}
}

Tile.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	rendering.x = this.position.x * SCALE + 1;
	rendering.y = this.position.y * SCALE + 1;
	rendering.width = SCALE - 2;
	rendering.height = SCALE - 2;
	rendering.fillStyle = this.color;
	rendering.fromCenter = false;
	
	return rendering;
}