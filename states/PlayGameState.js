function PlayGameState()
{
	this.view = $("#play.view");
	
	this.update = function(delta)
	{
		console.log(Math.floor(timer += delta));
		
		if(Keystate.isStroked("z"))
		{
			object.x += 10;
		}
	}
	
	this.render = function(delta)
	{
		$("canvas").clearCanvas();
		$("canvas").draw(object);
	}
}

var timer = 0;

var object = new function()
{
	this.x = 100;
	this.y = 100;
	this.width = 100;
	this.height = 100;
	this.type = "rectangle";
	this.fillStyle = "orange";
}