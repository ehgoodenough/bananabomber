Object.prototype.inherits = function(that)
{
	this.constructor = this;
	this.prototype = Object.create(that.prototype);
}