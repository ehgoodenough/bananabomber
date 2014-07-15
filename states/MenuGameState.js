function MenuGameState()
{
	this.initiate = function()
	{
		$("#menu.view").find("[href=play]").click(function(event)
		{
			event.preventDefault();
			console.log("Hello World!");
			game.load(new PlayGameState());
		});
		
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