function Stage(width, height)
{
	this.width = width || 21;
	this.height = height || 21;
	
	//this.supconstructor.call(this, 0xCCC);
	//Stage.inherits(PIXI.Stage);
	
	this.dispobj = new PIXI.Stage(0xCCC);
	
	this.tiles = new Array();
	
	for(var x = 0; x < this.width; x++)
	{
		var tiles = new Array();
		
		for(var y = 0; y < this.height; y++)
		{
			if((x % 2 == 1 || y % 2 == 1)
			&& !(y == this.height - 1
			|| x == this.width - 1
			|| x == 0 || y == 0))
			{
				var tile = new Tile(x, y, "crate");
				
				tiles.push(tile);
				this.dispobj.addChild(tile);
			}
			else
			{
				var tile = new Tile(x, y, "wall");
				
				tiles.push(tile);
				this.dispobj.addChild(tile);
			}
		}
		
		this.tiles.push(tiles);
	}
	
	for(var x = 0; x < this.width; x++)
	{
		for(var y = 0; y < this.height; y++)
		{
			if(x > 0)
			{
				this.tiles[x][y].west = this.tiles[x-1][y];
			}
			if(x < this.width - 1)
			{
				this.tiles[x][y].east = this.tiles[x+1][y];
			}
			if(y > 0)
			{
				this.tiles[x][y].north = this.tiles[x][y-1];
			}
			if(y < this.height - 1)
			{
				this.tiles[x][y].south = this.tiles[x][y+1];
			}
		}
	}
}