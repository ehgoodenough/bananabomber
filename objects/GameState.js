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
			this.stage.render();
			
			var rendering = bomber.render();
			$("canvas").draw(rendering);
			
			$("#game > #status > #bombcount").text(bomber.bombcount);
		});
		
		$("#game > #status > #framerate").text(delta);
	}
}