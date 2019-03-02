import {bootScene} from './boot/boot.js';
import {gameScene} from './game/game.js';
import {menuScene} from './menu/menu.js';
import {MyConfig} from './config/config.js';


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    input: {
         gamepad: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

function preload() {

}

function create() {

}

function update() {
}

var game = new Phaser.Game(config);
game.scene.add('bootScene', bootScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);

game.scene.start('bootScene');
