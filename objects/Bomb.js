function Bomb(x, y, bomber)
{
	this.supconstructor.call(this, PIXI.Texture.fromImage("images/bomb.png"));
	
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.bomber = bomber;
	
	this.duration = Bomb.getDefaultDuration();
	this.intensity = this.bomber.getBombIntensity();
	
	objedex.bombs.add(this);
}

inherits(Bomb, PIXI.Sprite);

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
	objedex.bombs.remove(this);
	
	var x = px2sq(this.position.x);
	var y = px2sq(this.position.y);
	var tile = stage.getTile(x, y);
	
	tile.removeBomb();
	tile.explode(this.intensity);
	
	this.bomber.increaseBombCapacity();
	
	if(objedex.bombers.size() <= 1)
	{
		var bomber = objedex.bombers.get();
		game.load(new EndGameState(bomber));
	}
}

////////////////////////
//Getters and Setters//
//////////////////////

Bomb.getDefaultDuration = function()
{
	var DEFAULT_DURATION = 4;
	return DEFAULT_DURATION;
}