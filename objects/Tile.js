function Tile(x, y, type)
{
	this.type = type;
	
	this.supconstructor.call(this, PIXI.Texture.fromImage("images/" + this.type + ".png"));
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.position.x = (x + 0.5) * SCALE;
	this.position.y = (y + 0.5) * SCALE;
}

Tile.inherits(PIXI.Sprite);

Tile.prototype.setType = function(type)
{
	this.type = type;
	this.setTexture(PIXI.Texture.fromImage("images/" + this.type + ".png"));
}