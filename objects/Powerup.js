function Powerup(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
}

Powerup.prototype.render = function(x, y)
{
	var rendering = {};
	
	rendering.type = "image";
	rendering.x = x + (SCALE / 2);
	rendering.y = y + (SCALE / 2);
	rendering.radius = SCALE / 4;
	
	if(this.type == "power")
	{
		rendering.source = "images/powerup.png";
	}
	else if(this.type == "speed")
	{
		rendering.source = "images/speedup.png";
	}
	else if(this.type == "amount")
	{
		rendering.source = "images/amountup.png";
	}
	
	return rendering;
}