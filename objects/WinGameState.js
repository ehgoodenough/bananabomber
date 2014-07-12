function WinGameState(color)
{
	this.color = color;
	
	this.onInitiate = function()
	{
		if(this.color)
		{
			$("#win.view").css("background-color", this.color);
			$("#win.view").find("#bomber").text(this.color);
			$("#win.view").fadeIn();
		}
		else
		{
			$("#lose.view").fadeIn();
		}
	}
	
	this.onUpdate = function(delta)
	{
		if(Keystate.get("space bar"))
		{
			Bananabomber.load(new InGameState());
		}
	}
	
	this.onRender = function(delta)
	{
		//?!
	}
	
	this.onTerminate = function()
	{
		$("#win.view").hide();
		$("#lose.view").hide();
	}
}