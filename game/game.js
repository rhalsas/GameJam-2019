
import {Player} from './player.js';
export class gameScene extends Phaser.Scene{

    create(){
        this.player = new Player(this,150,150);
    }

}
