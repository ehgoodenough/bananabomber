$("[href=play2]").click(function(event)
{
	event.preventDefault();
	game.load(new PlayGameState(2));
});

$("[href=play3]").click(function(event)
{
	event.preventDefault();
	game.load(new PlayGameState(3));
});

$("[href=play4]").click(function(event)
{
	event.preventDefault();
	game.load(new PlayGameState(4));
});

$("[href=menu]").click(function(event)
{
	event.preventDefault();
	game.load(new MenuGameState());
});

$(".view").hide();
$(".status").hide();

var game = new Game(new MenuGameState());