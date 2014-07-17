function Bomber(x, y, name)
{
	this.name = name;
	
	var texture = PIXI.Texture.fromImage("images/" + name + ".png")
	this.supconstructor.call(this, texture);

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.position.x = x * SCALE + (SCALE / 2);
	this.position.y = y * SCALE + (SCALE / 2);
	this.speed = SCALE / 6;
}

Bomber.inherits(PIXI.Sprite);

Bomber.prototype.update = function(delta)
{
	this.rotation += 0.1;
}