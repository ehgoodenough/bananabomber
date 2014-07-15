Game = function()
{
	$(".view").hide();
	
	this.delta = Date.now();
	
	this.loop();
}

Game.prototype.load = function(state)
{
	if(this.state)
	{
		if(this.state.terminate)
		{
			this.state.terminate();
		}
		
		if(this.state.view)
		{
			this.state.view.hide();
		}
	}
		
	this.state = state;
	
	if(this.state.initiate)
	{
		this.state.initiate();
	}
	
	if(this.state.view)
	{
		this.state.view.show();
	}
}

Game.prototype.func = function()
{
	if(this.state)
	{
		this.delta = ((Date.now() - this.delta) / 1000);
		this.delta = Math.min(this.delta, 1);
		
		if(this.state.update)
		{
			this.state.update(this.delta);
		}
		
		if(this.state.render)
		{
			this.state.render(this.delta);
		}
		
		this.delta = Date.now();
	}
	
	this.loop();
}

Game.prototype.loop = function()
{
	window.requestAnimationFrame(this.func.bind(this));
}