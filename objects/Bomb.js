function Bomb(x, y, bomber)
{
	objedex.bombs.add(this);
	
	this.x = x;
	this.y = y;
	
	this.bomber = bomber;
	
	this.timer = 100;
	this.intensity = this.bomber.bombpower;
}

Bomb.prototype.explode = function()
{
	console.log("KA-BOOM!!");
	
	objedex.bombs.remove(this);
	stage.tiles[this.x][this.y].bomb = undefined;
	stage.tiles[this.x][this.y].explode("all", this.intensity, true);
	
	this.bomber.bombcount++;
	
	var notblownup;
	var blownupcount = 0;
	objedex.bombers.foreach(function(bomber)
	{
		if(bomber.status == "blownup")
		{
			blownupcount++;
		}
		else
		{
			notblownup = bomber;
		}
	});
	
	if(blownupcount == 3)
	{
		setTimeout(function()
		{
			Bananabomber.load(new WinGameState(notblownup.color));
		}, 3000);
	}
	else if(blownupcount == 4)
	{
		setTimeout(function()
		{
			Bananabomber.load(new WinGameState());
		}, 3000);
	}
}

Bomb.prototype.update = function(delta)
{
	this.timer -= 1;
	
	if(this.timer <= 0)
	{
		this.explode();
	}
}

Bomb.prototype.render = function(x, y)
{
	var rendering = {};
	
	rendering.type = "arc";
	rendering.x = x + (SCALE / 2);
	rendering.y = y + (SCALE / 2);
	rendering.radius = SCALE / 2 - 5;
	
	var red = (this.timer % 16).toString(16);
	rendering.fillStyle = "#" + red + "00";
	
	return rendering;
}