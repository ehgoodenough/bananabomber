function GameState()
{
	this.onInitiate = function()
	{
		this.stage = new Stage();
		this.bomber = this.stage.spawnBomber();
	}
	
	this.onUpdate = function()
	{
		this.bomber.update();
	}
	
	this.onRender = function()
	{
		$("canvas").clearCanvas();
		
		render(this.stage.tiles);
		render(this.bomber);
	}
}

function render(stuff)
{
	stuff = stuff || this.stuff;
	
	if(stuff.render)
	{
		var rendering = stuff.render();
		$("canvas").draw(rendering);
	}
	else
	{
		for(var s in stuff)
			if(stuff[s].render)
				this.render(stuff[s]);
			else
				render(stuff[s]);
	}
}