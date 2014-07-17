function Stage()
{
	this.WIDTH = 21;
	this.HEIGHT = 21;
	
	this.tiles = new Array();
	
	for(var x = 0; x < this.WIDTH; x++)
	{
		var tiles = new Array();
		
		for(var y = 0; y < this.HEIGHT; y++)
		{
			if((x % 2 == 1 || y % 2 == 1)
			&& !(y == this.HEIGHT - 1
			|| x == this.WIDTH - 1
			|| x == 0 || y == 0))
			{
				tiles.push(new Tile(x, y, "crate"));
			}
			else
			{
				tiles.push(new Tile(x, y, "wall"));
			}
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
	
	this.dispobj = new PIXI.Stage(0xCCC);
	
	for(var x = 0; x < this.WIDTH; x++)
	{
		for(var y = 0; y < this.HEIGHT; y++)
		{
			this.dispobj.addChild(this.tiles[x][y].dispobj);
		}
	}
}

Stage.prototype.update = function(delta)
{
	for(var x = 0; x < this.WIDTH; x++)
	{
		for(var y = 0; y < this.HEIGHT; y++)
		{
			this.tiles[x][y].update(delta);
		}
	}
}