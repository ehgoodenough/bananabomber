function Powerup(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
}

Powerup.prototype.render = function(x, y)
{
	var rendering = {};
	
	rendering.type = "arc";
	rendering.x = x + (SCALE / 2);
	rendering.y = y + (SCALE / 2);
	rendering.radius = SCALE / 4;
	
	if(this.type == "power")
	{
		rendering.fillStyle = "yellow";
	}
	else if(this.type == "speed")
	{
		rendering.fillStyle = "pink";
	}
	else if(this.type == "amount")
	{
		rendering.fillStyle = "purple";
	}
	
	return rendering;
}