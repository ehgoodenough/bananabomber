function Bomber(x, y, name)
{
	PIXI.Sprite.call(this, PIXI.Texture.fromImage("images/" + name + ".png")); 

	this.name = name;
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