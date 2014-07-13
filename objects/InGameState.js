function InGameState()
{	
	this.onInitiate = function()
	{
		this.objedex = objedex = new Objedex(["bombers", "bombs"]);
		this.stage = stage = new Stage();
		
		this.stage.addBomber("alpha");
		this.stage.addBomber("theta");
		this.stage.addBomber("sigma");
		this.stage.addBomber("omega");
	}
	
	this.onUpdate = function(delta)
	{
		this.stage.update(delta);
		this.objedex.bombers.update(delta);
	}
	
	this.onRender = function(delta)
	{
		$("canvas").clearCanvas();
		
		this.objedex.bombers.foreach(function(bomber)
		{
			var $game = $("#" + bomber.id);
			var $canvas = $game.find("canvas");
			
			var camera = new Object();
			camera.x = bomber.x - (SCREEN_WIDTH*SCALE / 2);
			camera.y = bomber.y - (SCREEN_HEIGHT*SCALE / 2);
			
			var rendering = this.stage.render(camera);
			for(var i in rendering)
			{
				$canvas.draw(rendering[i]);
			}
			
			$game.find("#bombcount").text(bomber.bombcount);
		});
	}
	
	this.onTerminate = function()
	{
		//console.log("good game!");
		
		this.objedex = objedex = undefined;
		this.stage = stage = undefined;
	}
}