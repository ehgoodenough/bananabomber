var scene = new PIXI.Stage(0x66FF00);
var pixi = new PIXI.WebGLRenderer(400, 300);
$("#play").append(pixi.view);

var texture = PIXI.Texture.fromImage("images/green.png");
var monkey = new PIXI.Sprite(texture);
monkey.anchor.x = 0.5;
monkey.anchor.y = 0.5;
monkey.position.x = 200;
monkey.position.y = 150;
scene.addChild(monkey);

function PlayGameState()
{
	this.theta = 0;
	
	this.initiate = function()
	{
		$("#play.view").show();
		
		this.stage = new Stage();
	}
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
		
		monkey.rotation += 0.1;
	}
	
	this.render = function(delta)
	{
		pixi.render(scene);
	}
	
	this.terminate = function()
	{
		$("#play.view").hide();
	}
}