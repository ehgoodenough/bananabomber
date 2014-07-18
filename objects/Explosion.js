function Explosion(pos)
{
	this.supconstructor.call(this, PIXI.Texture.fromImage(Explosion.getImage()));
	
	this.position = pos;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	objedex.explosions.add(this);
}

inherits(Explosion, PIXI.Sprite);

///////////
//Update//
/////////

Explosion.prototype.update = function(delta)
{
	this.alpha -= 0.1;
	
	if(this.alpha < 0)
	{
		objedex.explosions.remove(this);
	}
}

////////////////////////
//Getters and Setters//
//////////////////////

Explosion.getImage = function()
{
	return "images/explosion.png";
}