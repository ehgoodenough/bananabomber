var Game = function()
{
	this.reloop();
}

Game.prototype.load = function(state)
{
	this.state = state;
	this.state.onInitiate();
}

Game.prototype.loop = function()
{
	if(this.state)
	{
		this.delta = Date.now() - this.delta;
		this.state.onUpdate(this.delta);
		this.delta = Date.now();
		
		this.state.onRender();
	}
	
	this.reloop();
}

Game.prototype.reloop = function()
{
	window.requestAnimationFrame(this.loop.bind(this));
}