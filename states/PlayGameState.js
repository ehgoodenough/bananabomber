function pixel2tile(value) {return Math.floor(value / SCALE);}
function tile2pixel(value) {return value * SCALE;}
var SCALE = 48;

var scene = new PIXI.Stage(0xEEEEEE);

var texture = PIXI.Texture.fromImage("images/green.png");
var monkey = new PIXI.Sprite(texture);
monkey.anchor.x = 0.5;
monkey.anchor.y = 0.5;
monkey.position.x = 200;
monkey.position.y = 150;
scene.addChild(monkey);

function PlayGameState()
{
	this.pixi = new PIXI.WebGLRenderer(21 * SCALE, 21 * SCALE);
	
	this.initiate = function()
	{
		$("#play.view").show();
		$("#play.view").append(this.pixi.view);
		
		this.stage = new Stage();
	}
	
	this.theta = 0;
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
		
		monkey.rotation += 0.1;
	}
	
	this.render = function(delta)
	{
		this.pixi.render(scene);
	}
	
	this.terminate = function()
	{
		$("#play.view").hide();
		$(this.pixi.view).remove();
	}
}