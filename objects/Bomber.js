function Bomber(name)
{
	this.name = name;
	
	var texture = PIXI.Texture.fromImage("images/" + name + ".png")
	this.supconstructor.call(this, texture);
	
	var x = getRandomOddNumber(stage.getSize());
	var y = getRandomOddNumber(stage.getSize());
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	stage.getTile(x, y).explode(2);

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.speed = SCALE / 6;
}

Bomber.inherits(PIXI.Sprite);

Bomber.prototype.update = function(delta)
{
	this.rotation += 0.1;
}

function getRandomOddNumber(max)
{
	return Math.floor(Math.random() * Math.floor((max - 1) / 2)) * 2 + 1;
}