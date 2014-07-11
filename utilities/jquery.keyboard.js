var key = new function()
{
	this.events = new Array();
	this.state = new Object();
	
	this.getState = function(keyCode)
	{
		keyCode = this.encode(keyCode);
		return this.state[keyCode];
	};
	
	this.hasEvent = function()
	{
		return this.events.length > 0;
	}
	
	this.getEvent = function()
	{
		return this.events.shift();
	}
	
	this.encode = function(keyCode)
	{
		if(isNaN(keyCode))
		{
			if(this.keyStrings[keyCode])
			{
				keyCode = this.keyStrings[keyCode];
			}
		}
		
		return keyCode;
	}
	
	this.keyStrings = new Object();
	
	this.keyStrings["up arrow"] = 38;
	this.keyStrings["left arrow"] = 37;
	this.keyStrings["down arrow"] = 40;
	this.keyStrings["right arrow"] = 39;
	this.keyStrings["space bar"] = 32;
	this.keyStrings["enter"] = 13;
	this.keyStrings["return"] = 13;
	
	this.keyStrings["w"] = 87;
	this.keyStrings["a"] = 65;
	this.keyStrings["s"] = 83;
	this.keyStrings["d"] = 68;
	
	this.keyStrings["i"] = 73;
	this.keyStrings["j"] = 74;
	this.keyStrings["k"] = 75;
	this.keyStrings["l"] = 76;
	
	this.keyStrings["g"] = 71;
	this.keyStrings["z"] = 90;
	this.keyStrings["/"] = 191;
	this.keyStrings[","] = 188;
}

$(document).on("keydown", function(event)
{
	var keyCode = event.keyCode;
	
	if(!key.state[keyCode])
	{
		key.state[keyCode] = true;
		key.events.push(keyCode);
	}
});

$(document).on("keyup", function(event)
{
	var keyCode = event.keyCode;
	delete key.state[keyCode];
	//key.events.push(keyCode);
});