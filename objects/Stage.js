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
			else
			{
				tiles.push(new Tile("floor", {x: x, y: y}));
			}
		}
		
		this.tiles.push(tiles);
	}
}

Stage.prototype.render = function()
{
	var rendering = [];
	
	for(var x = 0; x < this.WIDTH; x++)
	{
		for(var y = 0; y < this.HEIGHT; y++)
		{
			rendering.push(this.tiles[x][y]);
		}
	}
	
	return rendering;
}