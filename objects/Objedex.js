function Objedex(object)
{
	for(var s in object)
	{
		this[object[s]] = new ObjedexEntry()
	}
}

function ObjedexEntry()
{
	this.objid = 0;
	this.stuff = {};
	
	this.layer = new PIXI.DisplayObjectContainer();
	scene.addChild(this.layer);
}

ObjedexEntry.prototype.add = function(stuff)
{
	var objid = this.objid++;
	this.stuff[objid] = stuff;
	stuff.objid = objid;
	
	this.layer.addChild(stuff);
}

ObjedexEntry.prototype.remove = function(stuff)
{
	var objid = stuff.objid;
	delete this.stuff[objid];
	
	this.layer.removeChild(stuff);
}

ObjedexEntry.prototype.size = function()
{
	return Object.keys(this.stuff).length;
}

ObjedexEntry.prototype.foreach = function(func)
{
	for(var s in this.stuff)
		func(this.stuff[s])
}

ObjedexEntry.prototype.update = function(delta)
{
	this.foreach(function(stuff)
	{
		stuff.update(delta);
	});
}