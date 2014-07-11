function Bomb(x, y)
{
	objedex.bombs.add(this);
	
	this.x = x;
	this.y = y;
}

Bomb.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "arc";
	rendering.x = this.x * SCALE;
	rendering.y = this.y * SCALE;
	rendering.radius = SCALE / 2;
	rendering.fillStyle = "red";
	rendering.fromCenter = false;
	
	return rendering;
}