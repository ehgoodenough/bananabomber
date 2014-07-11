function GameState()
{	
	this.onInitiate = function()
	{
		this.objedex = objedex = new Objedex(["bombers", "bombs"]);
		this.stage = stage = new Stage();
		
		this.stage.addBomber();
		
		this.delta = Date.now();
	}
	
	this.onUpdate = function(delta)
	{
		this.stage.update();
		this.objedex.bombers.update();
		this.objedex.bombs.update();
	}
	
	this.onRender = function()
	{
		$("canvas").clearCanvas();
		
		this.stage.render();
		this.objedex.bombs.render();
		
		this.objedex.bombers.foreach(function(bomber)
		{
			var rendering = bomber.render();
			$("canvas").draw(rendering);
			
			$("#game   #bombcount").text(bomber.bombcount);
		});
	}
}