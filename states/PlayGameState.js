function pixel2tile(value) {return Math.floor(value / SCALE);}
function tile2pixel(value) {return value * SCALE;}
var SCALE = 48, SIZE = SCALE * 21;

function PlayGameState()
{
	this.theta = 0;
	
	this.camera = new PIXI.Stage(0XEEEEEE);
	this.pixi = new PIXI.WebGLRenderer(SIZE, SIZE);
	
	this.stage = stage = new Stage();
	this.bomber = bombers = new Bomber(5, 5, "green");
	
	this.initiate = function()
	{
		$("#play.view").show().append(this.pixi.view);
		
		this.camera.addChild(this.stage.dispobj);
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
		$("#play.view").hide().empty();
	}
}