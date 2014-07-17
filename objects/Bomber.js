function Bomber(x, y, id)
{
	this.id = id;
	
	this.x = x * SCALE + (SCALE / 2);
	this.y = y * SCALE + (SCALE / 2);
	
	this.speed = SCALE / 6;
	this.halfsize = SCALE / 2;
	
	this.dispobj = new PIXI.Sprite.fromImage(Bomber.getImage(this.id));
	this.dispobj.anchor.x = 0.5;
	this.dispobj.anchor.y = 0.5;
	this.dispobj.position.x = this.x;
	this.dispobj.position.y = this.y;
}

Bomber.prototype.getNorthestPosition = function() {return this.y - this.halfsize;}
Bomber.prototype.getSouthestPosition = function() {return this.y + this.halfsize;}
Bomber.prototype.getEastestPosition = function() {return this.x + this.halfsize;}
Bomber.prototype.getWestestPosition = function() {return this.x - this.halfsize;}

Bomber.prototype.update = function(delta)
{
	this.dispobj.rotation += 0.1;
}

Bomber.getImage = function(id)
{
	return "images/" + id + ".png";
}