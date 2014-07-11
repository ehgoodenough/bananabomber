function Stage()
{
	this.WIDTH = 16; 32;
	this.HEIGHT = 9; 18;
	
	this.tiles = new Array();
	
	for(var x = 0; x < this.WIDTH; x++)
	{
		var tiles = new Array();
		
		for(var y = 0; y < this.HEIGHT; y++)
		{
			var tile = new Tile(x, y, "wall");
			
			if(x == 0 || y == 0
			|| x == this.WIDTH - 1
			|| y == this.HEIGHT - 1)
			{
				tile.type = "wall";
			}
			else if(x % 2 == 1 || y % 2 == 1)
			{
				tile.type = "crate";
			}
			
			tiles.push(tile);
		}
		
		this.tiles.push(tiles);
	}
	
	for(var x = 0; x < this.WIDTH; x++)
	{
		for(var y = 0; y < this.HEIGHT; y++)
		{
			if(x > 0)
			{
				this.tiles[x][y].west = this.tiles[x-1][y];
			}
			if(x < this.WIDTH - 1)
			{
				this.tiles[x][y].east = this.tiles[x+1][y];
			}
			if(y > 0)
			{
				this.tiles[x][y].north = this.tiles[x][y-1];
			}
			if(y < this.HEIGHT - 1)
			{
				this.tiles[x][y].south = this.tiles[x][y+1];
			}
		}
	}
}

Stage.prototype.addBomber = function()
{
	var x = getRandomOddValue(this.WIDTH);
	var y = getRandomOddValue(this.HEIGHT);
	
	this.tiles[x][y].explode("all", 2);
	var bomber = new Bomber(x, y);
}

Stage.prototype.getTile = function(x, y)
{
	return this.tiles[pixel2tile(x)][pixel2tile(y)];
}

Stage.prototype.render = function()
{
	for(var x = 0; x < this.WIDTH; x++)
	{
		for(var y = 0; y < this.HEIGHT; y++)
		{
			var rendering = this.tiles[x][y].render();
			$("canvas").draw(rendering);
		}
	}
}

Stage.prototype.update = function()
{
	for(var x = 0; x < this.WIDTH; x++)
	{
		for(var y = 0; y < this.HEIGHT; y++)
		{
			this.tiles[x][y].update();
		}
	}
}

function pixel2tile(value)
{
	return Math.floor(value / SCALE)
}

function getRandomOddValue(range)
{
	range = Math.floor((range - 1) / 2);
	return Math.floor(Math.random() * range) * 2 + 1;
}