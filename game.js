var Game = new function()
{
	this.state = new GameState();
	this.state.onInitiate();
	this.loop = new GameLoop(function()
	{
		this.state.onUpdate();
		this.state.onRender();
	}
	.bind(this));
}