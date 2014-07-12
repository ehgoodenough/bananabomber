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
			var camx = bomber.x - (960 / 2);
			var camy = bomber.y - (540 / 2);
			
			/*camx = Math.max(camx, 0);
			camy = Math.max(camy, 0);
			camx = Math.min(camx, 960 - (960 / 2));
			camy = Math.min(camy, 540 - (540 / 2));*/
			
			this.stage.render(camx, camy);
			
			var rendering = bomber.render();
			$("canvas").draw(rendering);
			
			$("#game > #status > #bombcount").text(bomber.bombcount);
		});
		
		$("#game > #status > #framerate").text(delta);
	}
}