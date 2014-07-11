function GameState()
{
	this.onInitiate = function()
	{
		this.objedex = objedex = new Objedex(["bombers", "bombs"]);
		this.stage = stage = new Stage();
		
		this.stage.spawnBomber();
	}
	
	this.onUpdate = function()
	{
		this.objedex.bombers.update();
		this.objedex.bombs.update();
	}
	
	this.onRender = function()
	{
		$("canvas").clearCanvas();
		
		this.stage.render();
		this.objedex.bombs.render();
		this.objedex.bombers.render();
	}
}