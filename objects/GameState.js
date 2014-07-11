function GameState()
{
	this.onInitiate = function()
	{
		this.bomber = new Bomber();
	}
	
	this.onUpdate = function()
	{
	}
	
	this.onRender = function()
	{
		render(this.bomber);
	}
}

function render(stuff)
{
	var rendering = stuff.render();
	$("canvas").draw(rendering);
}