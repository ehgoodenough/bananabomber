function Bomber(name)
{
	this.name = name;
	this.status = "okay";
	
	var texture = PIXI.Texture.fromImage(this.getImage())
	this.supconstructor.call(this, texture);
	
	var x = getRandomOddNumber(stage.getSize());
	var y = getRandomOddNumber(stage.getSize());
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	stage.getTile(x, y).explode(2);

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.speed = 1.5;
	
	this.keyscheme = this.getKeyscheme();
}

Bomber.inherits(PIXI.Sprite);

///////////
//Update//
/////////

Bomber.prototype.update = function(delta)
{
	if(Keystate.isStroked(this.keyscheme["move east"]))
	{
		this.moveEast(delta);
	}
	else if(Keystate.isStroked(this.keyscheme["move west"]))
	{
		this.moveWest(delta);
	}
	
	if(Keystate.isStroked(this.keyscheme["move south"]))
	{
		this.moveSouth(delta);
	}
	else if(Keystate.isStroked(this.keyscheme["move north"]))
	{
		this.moveNorth(delta);
	}
	
	if(Keystate.isStroked(this.keyscheme["drop bomb"]))
	{
		this.dropBomb();
	}
}

////////////
//Actions//
//////////

Bomber.prototype.moveNorth = function(delta)
{
	var step = sq2px(this.speed) * delta;
	
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y - step);
	
	if(stage.getTile(x, y).isWalkable())
	{
		this.y -= step;
	}
}

Bomber.prototype.moveSouth = function(delta)
{
	var step = sq2px(this.speed) * delta;
	
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y + step);
	
	if(stage.getTile(x, y).isWalkable())
	{
		this.y += step;
	}
}

Bomber.prototype.moveEast = function(delta)
{
	var step = sq2px(this.speed) * delta;
	
	var x = px2sq(this.position.x + step);
	var y = px2sq(this.position.y);
	
	if(stage.getTile(x, y).isWalkable())
	{
		this.x += step;
	}
}

Bomber.prototype.moveWest = function(delta)
{
	var step = sq2px(this.speed) * delta;
	
	var x = px2sq(this.position.x - step);
	var y = px2sq(this.position.y);
	
	if(stage.getTile(x, y).isWalkable())
	{
		this.x -= step;
	}
}

Bomber.prototype.dropBomb = function()
{
	console.log("KABOOM!");
}

////////////////////////
//Getters and Setters//
//////////////////////

Bomber.prototype.getImage = function()
{
	return Bomber.data[this.name].image;
}

Bomber.prototype.getKeyscheme = function()
{
	return Bomber.data[this.name].keyscheme;
}

/////////
//Data//
///////

Bomber.data =
{
	"red":
	{
		keyscheme:
		{
			"move north": "up arrow",
			"move south": "down arrow",
			"move west": "left arrow",
			"move east": "right arrow",
			"drop bomb": "ctrl"
		},
		image: "images/red.png"
	},
	"blue":
	{
		keyscheme:
		{
			"move north": "w",
			"move south": "s",
			"move west": "a",
			"move east": "d",
			"drop bomb": "e"
		},
		image: "images/blue.png"
	},
	"green":
	{
		keyscheme:
		{
			"move north": "i",
			"move south": "k",
			"move west": "j",
			"move east": "l",
			"drop bomb": "o"
		},
		image: "images/green.png"
	},
	"purple":
	{
		keyscheme:
		{
			"move north": "t",
			"move south": "g",
			"move west": "f",
			"move east": "h",
			"drop bomb": "y"
		},
		image: "images/purple.png"
	},
}

function getRandomOddNumber(max)
{
	return Math.floor(Math.random() * Math.floor((max - 1) / 2)) * 2 + 1;
}