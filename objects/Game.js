var Game = function()
{
	this.delta = this.getDelta();
	this.reloop();
}

Game.prototype.load = function(state)
{
	if(this.state)
	{
		this.state.onTerminate();
	}
	
	this.state = state;
	this.state.onInitiate();
}

Game.prototype.loop = function()
{
	if(this.state)
	{
		this.delta = ((this.getDelta() - this.delta) / 100) * 2;
		
		this.state.onUpdate(this.delta);
		this.state.onRender(this.delta);
		
		this.delta = this.getDelta();
	}
	
	this.reloop();
}

Game.prototype.getDelta = function()
{
	//return window.performance.now();
	return Date.now();
}

Game.prototype.reloop = function()
{
	window.requestAnimationFrame(this.loop.bind(this));
}