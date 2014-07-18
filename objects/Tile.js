function Tile(x, y, type)
{
	this.type = type;
	
	this.supconstructor.call(this, PIXI.Texture.fromImage(this.getImage()));
	
	this.position.x = (x + 0.5) * SCALE;
	this.position.y = (y + 0.5) * SCALE;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
}

Tile.inherits(PIXI.Sprite);

////////////
//Actions//
//////////

Tile.prototype.explode = function(intensity, direction, explosion)
{
	direction = direction || "all";
	
	if(intensity <= 0) {return;}
	if(this.type == "wall") {return;}
	
	this.setType("floor");
	
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