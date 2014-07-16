function PlayGameState()
{
	this.theta = 0;
	
	this.bombers = {};
	
	this.initiate = function()
	{
		$("#play.view").show();
		
		this.stage = new Stage();
	}
	
	this.update = function(delta)
	{
		console.log(Math.floor(this.theta += delta));
	}
	
	this.render = function(delta)
	{
		//?!
	}
	
	this.terminate = function()
	{
		$("#play.view").hide();
	}
}

(function($)
{
	$.fn.render = function(stuff)
	{
		return this.each(function()
		{
			if(stuff.render)
			{
				var rendering = stuff.render();
				
				if(rendering instanceof Array)
				{
					for(var s in rendering)
						this.render(rendering[s]);
				}
				else
				{
					this.render(rendering)
				}
			}
			else
			{
				this.draw(stuff);
			}
		}
		.bind(this));
	}
}
(jQuery));