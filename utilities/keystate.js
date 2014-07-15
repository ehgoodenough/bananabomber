var Keystate = new function()
{
	this.state = new Object();
	this.event = new Array();
	
	this.isStroked = function(keycode, options)
	{
		keycode = this.encode(keycode);
		var state = this.state[keycode];
		return state != undefined;
	}
	
	this.stroke = function(keycode)
	{
		if(!Keystate.state[keycode])
		{
			Keystate.state[keycode] = true;
		}
	}
	
	this.unstroke = function(keycode)
	{
		if(Keystate.state[keycode])
		{
			delete Keystate.state[keycode];
		}
	}
	
	this.encode = function(keycode)
	{
		if(isNaN(keycode))
		{
			if(this.keystrings[keycode])
			{
				keycode = this.keystrings[keycode];
			}
		}
		
		return keycode;
	}
	
	this.keystrings = {};
	
	this.keystrings["backspace"]	= 8;
	this.keystrings["tab"]			= 9;
	this.keystrings["enter"]		= 13;
	this.keystrings["return"]		= 13;
	this.keystrings["shift"]		= 16;
	this.keystrings["ctrl"]			= 17;
	this.keystrings["alt"]			= 18;
	this.keystrings["pause"]		= 19;
	this.keystrings["break"]		= 19;
	this.keystrings["caps lock"]	= 20;
	this.keystrings["escape"]		= 27;
	this.keystrings["space bar"]	= 32;
	this.keystrings["page up"]		= 33;
	this.keystrings["page down"]	= 34;
	this.keystrings["end"]			= 35;
	this.keystrings["home"]			= 36;
	this.keystrings["left arrow"]	= 37;
	this.keystrings["up arrow"]		= 38;
	this.keystrings["right arrow"]	= 39;
	this.keystrings["down arrow"]	= 40;
	this.keystrings["insert"]		= 45;
	this.keystrings["delete"]		= 46;
	this.keystrings["0"]			= 48;
	this.keystrings["1"]			= 49;
	this.keystrings["2"]			= 50;
	this.keystrings["3"]			= 51;
	this.keystrings["4"]			= 52;
	this.keystrings["5"]			= 53;
	this.keystrings["6"]			= 54;
	this.keystrings["7"]			= 55;
	this.keystrings["8"]			= 56;
	this.keystrings["9"]			= 57;
	this.keystrings["a"]			= 65;
	this.keystrings["b"]			= 66;
	this.keystrings["c"]			= 67;
	this.keystrings["d"]			= 68;
	this.keystrings["e"]			= 69;
	this.keystrings["f"]			= 70;
	this.keystrings["g"]			= 71;
	this.keystrings["h"]			= 72;
	this.keystrings["i"]			= 73;
	this.keystrings["j"]			= 74;
	this.keystrings["k"]			= 75;
	this.keystrings["l"]			= 76;
	this.keystrings["m"]			= 77;
	this.keystrings["n"]			= 78;
	this.keystrings["o"]			= 79;
	this.keystrings["p"]			= 80;
	this.keystrings["q"]			= 81;
	this.keystrings["r"]			= 82;
	this.keystrings["s"]			= 83;
	this.keystrings["t"]			= 84;
	this.keystrings["u"]			= 85;
	this.keystrings["v"]			= 86;
	this.keystrings["w"]			= 87;
	this.keystrings["x"]			= 88;
	this.keystrings["y"]			= 89;
	this.keystrings["z"]			= 90;
	this.keystrings["left window"]	= 91;
	this.keystrings["right window"]	= 92;
	this.keystrings["select"]		= 93;
	this.keystrings["numpad 0"]		= 96;
	this.keystrings["numpad 1"]		= 97;
	this.keystrings["numpad 2"]		= 98;
	this.keystrings["numpad 3"]		= 99;
	this.keystrings["numpad 4"]		= 100;
	this.keystrings["numpad 5"]		= 101;
	this.keystrings["numpad 6"]		= 102;
	this.keystrings["numpad 7"]		= 103;
	this.keystrings["numpad 8"]		= 104;
	this.keystrings["numpad 9"]		= 105;
	this.keystrings["numpad *"]		= 106;
	this.keystrings["numpad +"]		= 107;
	this.keystrings["numpad -"]		= 109;
	this.keystrings["numpad ."]		= 110;
	this.keystrings["numpad /"]		= 111;
	this.keystrings["f1"]			= 112;
	this.keystrings["f2"]			= 113;
	this.keystrings["f3"]			= 114;
	this.keystrings["f4"]			= 115;
	this.keystrings["f5"]			= 116;
	this.keystrings["f6"]			= 117;
	this.keystrings["f7"]			= 118;
	this.keystrings["f8"]			= 119;
	this.keystrings["f9"]			= 120;
	this.keystrings["f10"]			= 121;
	this.keystrings["f11"]			= 122;
	this.keystrings["f12"]			= 123;
	this.keystrings["num lock"]		= 144;
	this.keystrings["scroll lock"]	= 145;
	this.keystrings[";"]			= 186;
	this.keystrings["="]			= 187;
	this.keystrings[","]			= 188;
	this.keystrings["-"]			= 189;
	this.keystrings["."]			= 190;
	this.keystrings["/"]			= 191;
	this.keystrings["`"]			= 192;
	this.keystrings["["]			= 219;
	this.keystrings["\\"]			= 220;
	this.keystrings["]"]			= 221;
	this.keystrings["'"]			= 222;
}

$(document).on("keydown", function(event)
{
	var keycode = event.keyCode;
	Keystate.stroke(keycode);
});

$(document).on("keyup", function(event)
{
	var keycode = event.keyCode;
	Keystate.unstroke(keycode);
});