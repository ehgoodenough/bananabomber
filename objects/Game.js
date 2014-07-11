var Game = function()
{
	this.delta = Date.now();
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
		this.state.onRender(this.delta);
		
		this.delta = Date.now();
	}
	
	this.reloop();
}

Game.prototype.reloop = function()
{
	window.requestAnimationFrame(this.loop.bind(this));
}