import {bootScene} from './boot/boot.js';
import {gameScene} from './game/game.js';
import {menuScene} from './menu/menu.js';
import {MyConfig} from './config/config.js';



var game = new Phaser.Game(MyConfig.GAME_WIDTH, MyConfig.GAME_HEIGHT, Phaser.WEBGL, '');
console.log("HALOO");
console.log(bootScene);
console.log(menuScene);
game.scene.add('bootScene', bootScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);

game.scene.start('bootScene');





