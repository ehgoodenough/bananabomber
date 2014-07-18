function Banana(pos, type)
{
	this.type = Banana.getRandomType();
	console.log(this.type);
	
	this.supconstructor.call(this, PIXI.Texture.fromImage(this.getImage()));
	
	this.position = pos;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	objedex.bananas.add(this);
}

inherits(Banana, PIXI.Sprite);

////////////
//Actions//
//////////

Banana.prototype.explode = function()
{
	objedex.bananas.remove(this);
}

////////////////////////
//Getters and Setters//
//////////////////////

Banana.prototype.getImage = function()
{
	return "images/" + this.type + ".png";
}

Banana.getRandomType = function()
{
	if(Math.random() < 0.5)
	{
		return "capacity";
	}
	else
	{
		return "intensity";
	}
}