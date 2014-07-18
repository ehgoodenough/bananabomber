$("[href=play]").click(function(event)
{
	event.preventDefault();
	game.load(new PlayGameState());
});

$("[href=menu]").click(function(event)
{
	event.preventDefault();
	game.load(new MenuGameState());
});

$(".view").hide();

var game = new Game(new PlayGameState(4));
//var game = new Game(new MenuGameState());