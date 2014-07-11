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
		this.state.onUpdate();
		this.state.onRender();
	}
	
	this.reloop();
}

Game.prototype.reloop = function()
{
	window.requestAnimationFrame(this.loop.bind(this));
}