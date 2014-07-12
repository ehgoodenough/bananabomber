var Keystate = new function()
{
	this._state = new Object();
	
	this.get = function(keyCode)
	{
		keyCode = this.encode(keyCode);
		return this._state[keyCode];
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
	this.keyStrings["ctrl"] = 17;
	
	this.keyStrings["w"] = 87;
	this.keyStrings["a"] = 65;
	this.keyStrings["s"] = 83;
	this.keyStrings["d"] = 68;
	this.keyStrings["e"] = 69;
	
	this.keyStrings["i"] = 73;
	this.keyStrings["j"] = 74;
	this.keyStrings["k"] = 75;
	this.keyStrings["l"] = 76;
	this.keyStrings["o"] = 79;
	
	this.keyStrings["t"] = 84;
	this.keyStrings["f"] = 70;
	this.keyStrings["g"] = 71;
	this.keyStrings["h"] = 72;
	this.keyStrings["y"] = 89;
}

$(document).on("keydown", function(event)
{
	var keyCode = event.keyCode;
	Keystate._state[keyCode] = true;
});

$(document).on("keyup", function(event)
{
	var keyCode = event.keyCode;
	delete Keystate._state[keyCode];
});