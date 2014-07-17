function Tile(x, y, type)
{
	this.x = x;
	this.y = y;
	this.type = type;
	
	this.dispobj = new PIXI.Graphics();
	
	if(this.type == "wall")
	{
		this.dispobj.beginFill(0x444444);
	}
	else if(this.type == "crate")
	{
		this.dispobj.beginFill(0x888888);
	}
	else if(this.type == "floor")
	{
		this.dispobj.beginFill(0xCCCCCC);
	}
	
	this.dispobj.drawRect(x * SCALE, y * SCALE, SCALE, SCALE);
}