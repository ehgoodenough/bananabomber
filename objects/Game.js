var Game = function()
{
	this.delta = Date.now();
	this.second = 0;
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
		this.delta = ((Date.now() - this.delta) / 1000);
		//this.delta = Math.min(this.delta, 1);
		
		this.second += this.delta;
		if(this.second >= 1)
		{
			console.log("second: " + this.second);
			this.second = 0;
		}
		
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