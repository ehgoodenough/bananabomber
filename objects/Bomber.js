function Bomber()
{
	this.position = {x: 150, y: 150};
}

Bomber.prototype.update = function()
{
	this.position.x++;
}

Bomber.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	
	rendering.fillStyle = "green";
	
	rendering.x = this.position.x;
	rendering.y = this.position.y;
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.cornerRadius = SCALE / 10;
	
	return rendering;
}