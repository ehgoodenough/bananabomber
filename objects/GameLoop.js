function GameLoop(func)
{
	this.func = func;
	this.reloop();
}

GameLoop.prototype.framerate = new function()
{
	this.delta = Date.now();
	
	this.preupdate = function()
	{
		this.delta = Date.now() - this.delta;
	}
	
	this.postupdate = function()
	{
		this.delta = Date.now();
	}
	
	this.getDelta = function()
	{
		return this.delta;
	}
}

GameLoop.prototype.loop = function()
{
	this.framerate.preupdate();
	if(this.func) {this.func();}
	this.framerate.postupdate();
	
	this.reloop();
}

GameLoop.prototype.reloop = function()
{
	window.requestAnimationFrame(this.loop.bind(this));
}