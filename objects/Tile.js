function Tile(x, y, type)
{
	this.x = x;
	this.y = y;
	
	this.type = type;
	
	this.explosion = 0;
}

Tile.prototype.update = function()
{
	if(this.explosion)
	{
		this.explosion -= 1;
	}
}

Tile.prototype.render = function()
{
	var rendering = {};
	
	rendering.type = "rectangle";
	
	rendering.width = SCALE;
	rendering.height = SCALE;
	rendering.x = this.x * SCALE;
	rendering.y = this.y * SCALE;
	rendering.fromCenter = false;
	
	if(this.type == "wall")
	{
		rendering.fillStyle = "#444";
	}
	else if(this.type == "crate")
	{
		rendering.fillStyle = "#F4A460";
	}
	else if(this.type == "floor")
	{
		rendering.fillStyle = "#CCC";
	}
	
	if(this.explosion > 0)
	{
		var red = (this.explosion % 16).toString(16);
		rendering.fillStyle = "#" + red + "00";
	}
	
	return rendering;
}

Tile.prototype.explode = function(direction, intensity, explosion)
{
	if(intensity > 0)
	{
		if(this.type != "wall")
		{
			this.type = "floor";
			
			objedex.bombers.foreach(function(bomber)
			{
				if(pixel2tile(bomber.x) == this.x
				&& pixel2tile(bomber.y) == this.y)
				{
					Bananabomber.load(new GameState());
				}
			}
			.bind(this));
			
			if(explosion)
			{
				this.explosion = 16;
			}
			
			if(this.bomb)
			{
				this.bomb.explode();
				return;
			}
			
			if(direction == "east" || direction == "all")
			{
				this.east.explode("east", intensity - 1, explosion);
			}
			
			if(direction == "west" || direction == "all")
			{
				this.west.explode("west", intensity - 1, explosion);
			}
			
			if(direction == "south" || direction == "all")
			{
				this.south.explode("south", intensity - 1, explosion);
			}
			
			if(direction == "north" || direction == "all")
			{
				this.north.explode("north", intensity - 1, explosion);
			}
		}
	}
}

Tile.prototype.hasBomb = function()
{
	return this.bomb != undefined;
}

Tile.prototype.spawnBomb = function(bomber)
{
	this.bomb = new Bomb(this.x, this.y, bomber);
}