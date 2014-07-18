function px2sq(value) {return Math.floor(value / SCALE);}
function sq2px(value) {return value * SCALE;}
var SCALE = 64;

function PlayGameState(players)
{
	players = players || 4;
	players = Math.min(players, 4);
	players = Math.max(players, 2);
	
	this.theta = 0;
	
	this.scene = scene = new PIXI.Stage(0x000000);
	
	var objects = ["tiles", "bombs", "bananas", "bombers", "explosions"];
	this.objedex = objedex = new Objedex(objects);
	
	this.stage = stage = new Stage(9);
	
	var colors = ["red", "blue", "green", "purple"];
	for(var index = 0; index < players; index++)
	{
		new Bomber(colors[index]);
	}
	
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
		
		objedex.bombers.foreach(function(bomber)
		{
			bomber.renderStatus();
		});
	}
	
	this.terminate = function()
	{
		$("#play.view").hide().empty();
		$(".status").find(".stat").empty();
		$(".status").hide();
	}
}