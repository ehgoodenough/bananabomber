function GameState()
{	
	this.onInitiate = function()
	{
		this.objedex = objedex = new Objedex(["bombers", "bombs"]);
		this.stage = stage = new Stage();
		
		this.stage.addBomber();
	}
	
	this.onUpdate = function(delta)
	{
		this.stage.update();
		this.objedex.bombers.update();
	}
	
	this.onRender = function(delta)
	{
		$("canvas").clearCanvas();
		
		this.objedex.bombers.foreach(function(bomber)
		{
			var camera = new Object();
			camera.x = bomber.x - (SCREEN_WIDTH*SCALE / 2);
			camera.y = bomber.y - (SCREEN_HEIGHT*SCALE / 2);
			
			var rendering = this.stage.render(camera);
			for(var i in rendering) {$("canvas").draw(rendering[i]);}
			
			var rendering = bomber.render();
			$("canvas").draw(rendering);
			
			$("#game > #status > #bombcount").text(bomber.bombcount);
		});
		
		$("#game > #status > #framerate").text(delta);
	}
}