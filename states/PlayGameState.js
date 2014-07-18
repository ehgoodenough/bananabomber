function px2sq(value) {return Math.floor(value / SCALE);}
function sq2px(value) {return value * SCALE;}
var SCALE = 64;

function PlayGameState()
{
	this.theta = 0;
	
	this.stage = stage = new Stage(9);
	this.bomber = new Bomber("red");
	
	this.camera = new PIXI.Stage(0x000000);
	
	var size = sq2px(this.stage.getSize());
	this.pixi = new PIXI.WebGLRenderer(size, size);
	
	this.initiate = function()
	{
		$("#play.view").show().append(this.pixi.view);
		
		this.camera.addChild(this.stage);
		this.camera.addChild(this.bomber);
	}
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
		
		this.bomber.update(delta);
	}
	
	this.render = function()
	{
		this.pixi.render(this.camera);
	}
	
	this.terminate = function()
	{
		$("#play.view").empty().hide();
	}
}