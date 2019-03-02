
var GAME_HEIGHT = 32*20;
var GAME_WIDTH  = 32*30;
var player = null;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.WEBGL, '');

var saveMapButton;
var selectTerrainButton;
var selectUnitButton;


game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('game', gameState);

game.state.start('boot');





