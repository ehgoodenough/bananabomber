function Tile(x, y, type)
{
	this.type = type;
	
	this.supconstructor.call(this, PIXI.Texture.fromImage(this.getImage()));
	
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	objedex.tiles.add(this);
}

inherits(Tile, PIXI.Sprite);

////////////
//Actions//
//////////

Tile.prototype.explode = function(intensity, direction, explosion)
{
	direction = direction || "all";
	
	if(intensity <= 0) {return;}
	if(this.type == "wall") {return;}
	
	if(this.hasBomb())
	{
		return this.getBomb().explode();
	}
	
	if(this.hasBanana())
	{
		this.removeBanana();
	}
	
	if(explosion)
	{
		new Explosion(this.position);
		
		if(this.type == "crate")
		{
			if(Tile.canBanana())
			{
				this.addBanana(new Banana(this.position));
			}
		}
	}
	
	this.setType("floor");
	
	objedex.bombers.foreach(function(bomber)
	{
		if(px2sq(this.x) == px2sq(bomber.position.x)
		&& px2sq(this.y) == px2sq(bomber.position.y))
		{
			bomber.explode();
		}
	}
	.bind(this));
	
	if(direction == "east" || direction == "all")
	{
		this.east.explode(intensity - 1, "east", explosion);
	}
	
	if(direction == "west" || direction == "all")
	{
		this.west.explode(intensity - 1, "west", explosion);
	}
	
	if(direction == "south" || direction == "all")
	{
		this.south.explode(intensity - 1, "south", explosion);
	}
	
	if(direction == "north" || direction == "all")
	{
		this.north.explode(intensity - 1, "north", explosion);
	}
}

////////////////////////
//Getters and Setters//
//////////////////////

Tile.prototype.getImage = function()
{
	return Tile.data[this.type].image;
}

Tile.prototype.getType = function()
{
	return this.type;
}

Tile.prototype.setType = function(type)
{
	this.type = type;
	this.setTexture(PIXI.Texture.fromImage(this.getImage()));
}

Tile.prototype.isWalkable = function()
{
	return this.type == "floor" && this.bomb == undefined;
}

Tile.prototype.hasBomb = function()
{
	return this.bomb != undefined;
}

Tile.prototype.getBomb = function()
{
	return this.bomb;
}

Tile.prototype.addBomb = function(bomb)
{
	this.bomb = bomb;
}

Tile.prototype.removeBomb = function()
{
	this.bomb = undefined;
}

Tile.prototype.hasBanana = function()
{
	return this.banana != undefined;
}

Tile.prototype.getBanana = function()
{
	return this.banana;
}

Tile.prototype.addBanana = function(banana)
{
	this.banana = banana;
}

Tile.prototype.removeBanana = function()
{
	this.banana.remove();
	this.banana = undefined;
}

Tile.canBanana = function()
{
	Tile.bananarate += 1;
	return Tile.bananarate % 5 == 0;
}

Tile.bananarate = 0;

/////////
//Data//
///////

Tile.data =
{
	"wall":
	{
		image: "images/wall.png"
	},
	
	"floor":
	{
		image: "images/floor.png"
	},
	"crate":
	{
		image: "images/crate.png"
	},
}