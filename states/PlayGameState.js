function px2sq(value) {return Math.floor(value / SCALE);}
function sq2px(value) {return value * SCALE;}
var SCALE = 64;

function PlayGameState()
{
	this.theta = 0;
	
	this.scene = scene = new PIXI.Stage(0x000000);
	
	var objects = ["tiles", "bombs", "bombers", "explosions"];
	this.objedex = objedex = new Objedex(objects);
	
	this.stage = stage = new Stage(9);
	
	this.red = new Bomber("red");
	this.blue = new Bomber("blue");
	this.green = new Bomber("green");
	this.purple = new Bomber("purple");
	
	var size = sq2px(this.stage.getSize());
	this.webgl = new PIXI.WebGLRenderer(size, size);
	
	this.initiate = function()
	{
		$("#play.view").show().append(this.webgl.view);
	}
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
		
		this.objedex.explosions.update(delta);
		this.objedex.bombers.update(delta);
		this.objedex.bombs.update(delta);
	}
	
	this.render = function()
	{
		this.webgl.render(this.scene);
	}
	
	this.terminate = function()
	{
		$("#play.view").hide().empty();
	}
}