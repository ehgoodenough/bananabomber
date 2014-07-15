function MenuGameState()
{
	this.initiate = function()
	{
		$("#menu.view").show();
	}
	
	this.update = function(delta)
	{
		if(Keystate.isStroked("space bar"))
		{
			game.load(new PlayGameState());
		}
	}
	this.terminate = function()
	{
		$("#menu.view").hide();
	}
}