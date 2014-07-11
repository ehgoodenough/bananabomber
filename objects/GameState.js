function GameState()
{
	this.onInitiate = function()
	{
		console.log("initiated");
	}
	
	this.onUpdate = function()
	{
		console.log("updated");
	}
	
	this.onRender = function()
	{
		console.log("rendered");
	}
}