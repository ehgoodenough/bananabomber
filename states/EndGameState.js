function EndGameState(bomber)
{
	this.bomber = bomber;
	
	this.initiate = function()
	{
		if(this.bomber)
		{
			$("#win.view").css("background-color", this.bomber.color);
			$("#win.view").find("#winner").text(this.bomber.name);
			$("#win.view").show();
		}
		else
		{
			$("#lose.view").show();
		}
	}
	
	this.terminate = function()
	{
		$("#win.view").hide();
		$("#lose.view").hide();
	}
}