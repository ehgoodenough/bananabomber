function Bomb(x, y)
{
	objedex.bombs.add(this);
	
	this.x = x;
	this.y = y;
	
	this.timer = 100;
}

Bomb.prototype.update = function()
{
	this.timer -= 1;
	
	if(this.timer <= 0)
	{
		console.log("BOOM");
		objedex.bombs.remove(this);
		stage.tiles[this.x][this.y].bomb = undefined;
		stage.tiles[this.x][this.y].explode("all", 2);
	}
}

Bomb.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "arc";
	rendering.x = this.x * SCALE + (SCALE / 2);
	rendering.y = this.y * SCALE + (SCALE / 2);
	rendering.radius = SCALE / 2 - 5;
	rendering.fillStyle = "red";
	
	return rendering;
}