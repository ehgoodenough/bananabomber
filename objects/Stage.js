function Stage()
{
	this.WIDTH = 16;
	this.HEIGHT = 9;
	
	this.tiles = new Array();
	
	for(var x = 0; x < this.WIDTH; x++)
	{
		var tiles = new Array();
		
		for(var y = 0; y < this.HEIGHT; y++)
		{
			if(x == 0 || y == 0
			|| x == this.WIDTH - 1
			|| y == this.HEIGHT - 1)
			{
				tiles.push(new Tile("wall", {x: x, y: y}))
			}
			else if(x % 2 == 1 || y % 2 == 1)
			{
				tiles.push(new Tile("crate", {x: x, y: y}));
			}
			else
			{
				tiles.push(new Tile("wall", {x: x, y: y}));
			}
		}
		
		this.tiles.push(tiles);
	}
}

Stage.prototype.clear = function(x, y)
{
	this.tiles[x][y].type = "floor"
}