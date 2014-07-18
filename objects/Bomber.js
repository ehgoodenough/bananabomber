function Bomber(name)
{
	this.name = name;
	
	var x = getRandomOddNumber(stage.getSize());
	var y = getRandomOddNumber(stage.getSize());
	stage.getTile(x, y).explode(2);
	
	this.supconstructor.call(this, PIXI.Texture.fromImage(this.getImage()));
	
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.color = this.getColor();
	this.keyscheme = this.getKeyscheme();
	
	this.speed = Bomber.getDefaultSpeed();
	this.bombcapacity = Bomber.getDefaultBombCapacity();
	this.bombintensity = Bomber.getDefaultBombIntensity();
	
	this.view = $("#" + this.name + ".status").show();
	
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

Bomber.prototype.renderStatus = function()
{
	this.view.find("#capacity.stat").text(this.getBombCapacity());
	this.view.find("#intensity.stat").text(this.getBombIntensity());
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
	var tile = stage.getTile(x, ny);
	
	if(y == ny || tile.isWalkable())
	{
		this.y -= step;
		
		if(tile.hasBanana())
		{
			this.eat(tile.getBanana());
			tile.removeBanana();
		}
	}
}

Bomber.prototype.moveSouth = function(delta)
{
	var step = sq2px(this.speed) * delta;
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var ny = px2sq(this.position.y + step);
	var tile = stage.getTile(x, ny);
	
	if(y == ny || tile.isWalkable())
	{
		this.y += step;
		
		if(tile.hasBanana())
		{
			this.eat(tile.getBanana());
			tile.removeBanana();
		}
	}
}

Bomber.prototype.moveEast = function(delta)
{
	var step = sq2px(this.speed) * delta;
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var nx = px2sq(this.position.x + step);
	var tile = stage.getTile(nx, y);
	
	if(x == nx || tile.isWalkable())
	{
		this.x += step;
		
		if(tile.hasBanana())
		{
			this.eat(tile.getBanana());
			tile.removeBanana();
		}
	}
}

Bomber.prototype.moveWest = function(delta)
{
	var step = sq2px(this.speed) * delta;
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var nx = px2sq(this.position.x - step);
	var tile = stage.getTile(nx, y);
	
	if(x == nx || tile.isWalkable())
	{
		this.x -= step;
		
		if(tile.hasBanana())
		{
			this.eat(tile.getBanana());
			tile.removeBanana();
		}
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

Bomber.prototype.explode = function()
{
	objedex.bombers.remove(this);
}

Bomber.prototype.eat = function(banana)
{
	if(banana.type == "capacity")
	{
		this.increaseBombCapacity();
	}
	else if(banana.type == "intensity")
	{
		this.increaseBombIntensity();
	}
}

////////////////////////
//Getters and Setters//
//////////////////////

Bomber.prototype.getImage = function()
{
	return Bomber.data[this.name].image;
}

Bomber.prototype.getColor = function()
{
	return Bomber.data[this.name].color;
}

Bomber.prototype.getKeyscheme = function()
{
	return Bomber.data[this.name].keyscheme;
}

Bomber.prototype.getBombIntensity = function()
{
	return this.bombintensity;
}

Bomber.prototype.increaseBombIntensity = function()
{
	if(this.bombintensity <= Bomber.getMaximumBombIntensity())
	{
		this.bombintensity += 1;
	}
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
	if(this.bombintensity <= Bomber.getMaximumBombCapacity())
	{
		this.bombcapacity += 1;
	}
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

Bomber.getMaximumBombCapacity = function()
{
	var MAXIMUM_CAPACITY = 5;
	return MAXIMUM_CAPACITY;
}

Bomber.getMaximumBombIntensity = function()
{
	var MAXIMUM_INTENSITY = 5;
	return MAXIMUM_INTENSITY;
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
		image: "images/red.png",
		color: "rgb(237, 28, 36)"
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
		image: "images/blue.png",
		color: "rgb(63, 72, 204)"
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
		image: "images/green.png",
		color: "rgb(34, 177, 76)"
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
		image: "images/purple.png",
		color: "rgb(163, 73, 164)"
	},
}

//////////////
//Utilities//
////////////

function getRandomOddNumber(value)
{
	return Math.floor(Math.random() * Math.floor((value - 1) / 2)) * 2 + 1;
}