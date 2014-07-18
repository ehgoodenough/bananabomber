function Bomb(x, y, bomber)
{
	this.supconstructor.call(this, PIXI.Texture.fromImage("images/bomb.png"));
	stage.addChild(this);
	
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.bomber = bomber;
	
	this.duration = Bomb.getDefaultDuration();
	this.intensity = this.bomber.getBombIntensity();
}

Bomb.inherits(PIXI.Sprite);

///////////
//Update//
/////////

Bomb.prototype.update = function(delta)
{
	this.duration -= 1 * delta;
	
	if(this.duration <= 0)
	{
		this.explode();
	}
}

////////////
//Actions//
//////////

Bomb.prototype.explode = function()
{
	console.log("KABOOM");
	stage.removeChild(this);
	
	/*stage.tiles[this.x][this.y].bomb = undefined;
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
	}*/
}

////////////////////////
//Getters and Setters//
//////////////////////

Bomb.getDefaultDuration = function()
{
	var DEFAULT_DURATION = 100;
	return DEFAULT_DURATION;
}