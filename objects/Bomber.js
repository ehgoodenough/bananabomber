function Bomber(name)
{
	this.name = name;
	this.status = "okay";
	
	var texture = PIXI.Texture.fromImage(this.getImage())
	this.supconstructor.call(this, texture);
	
	var x = getRandomOddNumber(stage.getSize());
	var y = getRandomOddNumber(stage.getSize());
	this.position.x = sq2px(x + 0.5);
	this.position.y = sq2px(y + 0.5);
	stage.getTile(x, y).explode(2);

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.speed = SCALE / 6;
}

Bomber.inherits(PIXI.Sprite);

////////////
//Updater//
//////////

Bomber.prototype.update = function(delta)
{
	this.rotation += 0.1;
}

////////////////////////
//Getters and Setters//
//////////////////////

Bomber.prototype.getImage = function()
{
	return Bomber.data[this.name].image;
}

Bomber.prototype.getControls = function()
{
	return Bomber.data[this.name].controls;
}

/////////
//Data//
///////

Bomber.data =
{
	"red":
	{
		controls:
		{
			"move north": "up arrow",
			"move south": "down arrow",
			"move west": "left arrow",
			"move east": "right arrow",
			"drop bomb": "ctrl"
		},
		image: "images/red.png"
	},
	"blue":
	{
		controls:
		{
			"move north": "w",
			"move south": "s",
			"move west": "a",
			"move east": "d",
			"drop bomb": "e"
		},
		image: "images/blue.png"
	},
	"green":
	{
		controls:
		{
			"move north": "i",
			"move south": "k",
			"move west": "j",
			"move east": "l",
			"drop bomb": "o"
		},
		image: "images/green.png"
	},
	"purple":
	{
		controls:
		{
			"move north": "t",
			"move south": "g",
			"move west": "f",
			"move east": "h",
			"drop bomb": "y"
		},
		image: "images/purple.png"
	},
}

function getRandomOddNumber(max)
{
	return Math.floor(Math.random() * Math.floor((max - 1) / 2)) * 2 + 1;
}