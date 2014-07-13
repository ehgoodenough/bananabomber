function Stage()
{
	this.WIDTH = 33;
	this.HEIGHT = 19;
	
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
				tiles.push(new Tile(x, y, "sidewall"));
			}
			else if(x % 2 == 1 || y % 2 == 1)
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
}

Stage.prototype.addBomber = function(id)
{
	var x = getRandomOddValue(this.WIDTH);
	var y = getRandomOddValue(this.HEIGHT);
	
	this.tiles[x][y].explode("all", 2);
	var bomber = new Bomber(x, y, id);
}

Stage.prototype.getTile = function(x, y)
{
	return this.tiles[pixel2tile(x)][pixel2tile(y)];
}

Stage.prototype.render = function(camera)
{
	var rendering = new Array();
	
	camera.tile = { min: {}, max: {} };
	camera.tile.min.x = Math.max(0, pixel2tile(camera.x));
	camera.tile.min.y = Math.max(0, pixel2tile(camera.y));
	camera.tile.max.x = Math.min(camera.tile.min.x + SCREEN_WIDTH + 1, this.WIDTH);
	camera.tile.max.y = Math.min(camera.tile.min.y + SCREEN_HEIGHT + 1, this.HEIGHT);
	
	for(var y = camera.tile.min.y; y < camera.tile.max.y; y++)
	{
		for(var x = camera.tile.min.x; x < camera.tile.max.x; x++)
		{
			var offset = {};
			offset.x = tile2pixel(x) - camera.x;
			offset.y = tile2pixel(y) - camera.y;
			
			var tile = this.tiles[x][y];
			rendering.push(tile.render(offset.x, offset.y));
			
			if(tile.powerup)
			{
				rendering.push(tile.powerup.render(offset.x, offset.y));
			}
			
			if(tile.hasBomb())
			{
				var bomb = tile.getBomb();
				rendering.push(bomb.render(offset.x, offset.y));
			}
			
			if(tile.hasBombers())
			{
				for(var i in tile.bombers)
				{
					rendering.push(tile.bombers[i].render(camera));
				}
			}
			
			if(tile.explosion > 0)
			{
				var red = (tile.explosion % 16).toString(16);
				rendering.push({
					type: "rectangle",
					fromCenter: false,
					x: offset.x,
					y: offset.y,
					width: SCALE,
					height: SCALE,
					fillStyle: "#" + red + "00",
					opacity: tile.explosion / 16
				});
			}
		}
	}
	
	return rendering;
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

var SCALE = 48; //?
var SCREEN_WIDTH = 960 / SCALE;
var SCREEN_HEIGHT = 540 / SCALE;

function pixel2tile(value)
{
	return Math.floor(value / SCALE);
}

function tile2pixel(value)
{
	return value * SCALE;
}

function getRandomOddValue(range)
{
	range = Math.floor((range - 1) / 2);
	return Math.floor(Math.random() * range) * 2 + 1;
}