function Stage(size)
{
	this.size = size || 21;
	
	this.supconstructor.call(this, 0xCCC);
	
	this.tiles = new Array();
	
	for(var x = 0; x < this.size; x++)
	{
		var tiles = new Array();
		
		for(var y = 0; y < this.size; y++)
		{
			if((x % 2 == 1 || y % 2 == 1)
			&& !(y == this.size - 1
			|| x == this.size - 1
			|| x == 0 || y == 0))
			{
				var tile = new Tile(x, y, "crate");
				
				tiles.push(tile);
				this.addChild(tile);
			}
			else
			{
				var tile = new Tile(x, y, "wall");
				
				tiles.push(tile);
				this.addChild(tile);
			}
		}
		
		this.tiles.push(tiles);
	}
	
	for(var x = 0; x < this.size; x++)
	{
		for(var y = 0; y < this.size; y++)
		{
			if(x > 0) {this.tiles[x][y].west = this.tiles[x-1][y];}
			if(x < this.size - 1) {this.tiles[x][y].east = this.tiles[x+1][y];}
			if(y > 0) {this.tiles[x][y].north = this.tiles[x][y-1];}
			if(y < this.size - 1) {this.tiles[x][y].south = this.tiles[x][y+1];}
		}
	}
}

Stage.inherits(PIXI.Stage);