inherits = function(subclass, supclass)
{
	subclass.constructor = subclass;
	subclass.prototype = Object.create(supclass.prototype);
	subclass.prototype.supconstructor = supclass;
}