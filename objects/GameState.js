function GameState()
{
	this.onInitiate = function()
	{
		this.bomber = new Bomber();
	}
	
	this.onUpdate = function()
	{
		this.bomber.update();
	}
	
	this.onRender = function()
	{
		$("canvas").clearCanvas();
		$("canvas").draw(this.bomber.render());
	}
}