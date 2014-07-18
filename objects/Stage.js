function Stage(size)
{
	this.size = (size || 9) * 2 + 3;
	
	this.tiles = new Array();
	
	for(var x = 0; x < this.size; x++)
	{
		var tiles = new Array();
		
		for(var y = 0; y < this.size; y++)
		{
			if(!this.isEdgeCoordinate(x, y)
			&& (isOddNumber(x) || isOddNumber(y)))
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
	
	for(var x = 0; x < this.size; x++)
	{
		for(var y = 0; y < this.size; y++)
		{
			if(x > 0)
			{
				this.tiles[x][y].west = this.tiles[x-1][y];
			}
			
			if(x < this.size - 1)
			{
				this.tiles[x][y].east = this.tiles[x+1][y];
			}
			
			if(y > 0)
			{
				this.tiles[x][y].north = this.tiles[x][y-1];
			}
			
			if(y < this.size - 1)
			{
				this.tiles[x][y].south = this.tiles[x][y+1];
			}
		}
	}
}

////////////////////////
//Getters and Setters//
//////////////////////

Stage.prototype.getSize = function()
{
	return this.size;
}

Stage.prototype.getTile = function(x, y)
{
	return this.tiles[x][y];
}

Stage.prototype.isEdgeCoordinate = function(x, y)
{
	return y == this.size - 1 || y == 0
	    || x == this.size - 1 || x == 0;
}

//////////////
//Utilities//
////////////

function isOddNumber(value)
{
	return value % 2 == 1;
}