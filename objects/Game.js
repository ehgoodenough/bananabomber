Game = function(state)
{
	$(".view").hide();
	this.delta = Date.now();
	this.load(state);
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
	}
		
	this.state = state;
	
	if(this.state.initiate)
	{
		this.state.initiate();
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