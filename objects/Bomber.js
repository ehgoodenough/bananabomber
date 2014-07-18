function Bomber(name)
{
	this.name = name;
	this.status = "okay";
	var texture = PIXI.Texture.fromImage(this.getImage())
	this.supconstructor.call(this, texture);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	var x = getRandomOddNumber(stage.getSize());
	var y = getRandomOddNumber(stage.getSize());
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	stage.getTile(x, y).explode(2);
	this.keyscheme = this.getKeyscheme();
	
	this.speed = Bomber.getDefaultSpeed();
	this.bombcapacity = Bomber.getDefaultBombCapacity();
	this.bombintensity = Bomber.getDefaultBombIntensity();
	
	objedex.bombers.add(this);
}

inherits(Bomber, PIXI.Sprite);

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
	var y = px2sq(this.position.y);
	var ny = px2sq(this.position.y - step);
	
	if(y == ny || stage.getTile(x, ny).isWalkable())
	{
		this.y -= step;
	}
}

Bomber.prototype.moveSouth = function(delta)
{
	var step = sq2px(this.speed) * delta;
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var ny = px2sq(this.position.y + step);
	
	if(y == ny || stage.getTile(x, ny).isWalkable())
	{
		this.y += step;
	}
}

Bomber.prototype.moveEast = function(delta)
{
	var step = sq2px(this.speed) * delta;
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var nx = px2sq(this.position.x + step);
	
	if(x == nx || stage.getTile(nx, y).isWalkable())
	{
		this.x += step;
	}
}

Bomber.prototype.moveWest = function(delta)
{
	var step = sq2px(this.speed) * delta;
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var nx = px2sq(this.position.x - step);
	
	if(x == nx || stage.getTile(nx, y).isWalkable())
	{
		this.x -= step;
	}
}

Bomber.prototype.dropBomb = function()
{
	if(this.hasBombCapacity())
	{
		var x = px2sq(this.position.x);
		var y = px2sq(this.position.y);
		var tile = stage.getTile(x, y);

		if(!tile.hasBomb())
		{
			this.decreaseBombCapacity();
			tile.addBomb(new Bomb(x, y, this));
		}
	}
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

Bomber.prototype.getBombIntensity = function()
{
	return this.bombintensity;
}

Bomber.prototype.getBombCapacity = function()
{
	return this.bombcapacity;
}

Bomber.prototype.hasBombCapacity = function()
{
	return this.bombcapacity > 0;
}

Bomber.prototype.decreaseBombCapacity = function()
{
	this.bombcapacity -= 1;
}

Bomber.prototype.increaseBombCapacity = function()
{
	this.bombcapacity += 1;
}

Bomber.getDefaultSpeed = function()
{
	var DEFAULT_SPEED = 1.5;
	return DEFAULT_SPEED;
}

Bomber.getDefaultBombCapacity = function()
{
	var DEFAULT_CAPACITY = 1;
	return DEFAULT_CAPACITY;
}

Bomber.getDefaultBombIntensity = function()
{
	var DEFAULT_CAPACITY = 2;
	return DEFAULT_CAPACITY;
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

//////////////
//Utilities//
////////////

function getRandomOddNumber(value)
{
	return Math.floor(Math.random() * Math.floor((value - 1) / 2)) * 2 + 1;
}