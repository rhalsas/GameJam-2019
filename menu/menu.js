

import {MyConfig} from '../config/config.js';

export class menuScene extends Phaser.Scene{

    create(){
        let myConfig = new MyConfig();
        this.playButton = this.add.sprite(myConfig.GAME_WIDTH/2 - 64, myConfig.GAME_HEIGHT/2, 'playButton'); 
        
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', this.onPlayButton.bind(this));
     
        //this.input.on('gameobjectdown', this.onPlayButton);
    }

    onPlayButton(e, scene){
        this.scene.start('gameScene');
    }

}


