function PlayGameState()
{
	this.theta = 0;
	
	this.bombers = {};
	this.stage = {};
	
	this.initiate = function()
	{
		$("#play.view").show();
		
		this.stage = new Stage();
		
		//this.stage.addBomber("red");
		//this.stage.addBomber("blue");
		//this.stage.addBomber("green");
		//this.stage.addBomber("purple");
	}
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
	}
	
	this.render = function(delta)
	{
		render(this.stage);
	}
	
	this.terminate = function()
	{
		$("#play.view").hide();
	}
}

function render(stuff)
{
	if(stuff.render)
	{
		var rendering = stuff.render();
		
		if(rendering instanceof Array)
		{
			for(var s in rendering)
				render(rendering[s]);
		}
		else
		{
			render(rendering)
		}
	}
	else
	{
		$("canvas").draw(stuff);
	}
}