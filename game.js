var Game = new function()
{
	this.loop = new GameLoop(function()
	{
		console.log("I'm looooping!!");
	});
}