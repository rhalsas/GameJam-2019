
import {Player} from './player.js';
export class gameScene extends Phaser.Scene{

    preload(){
        this.load.image('mountains', './img/Background.png');
        this.load.image('tiles', './img/Tileset.png');
        this.load.tilemapTiledJSON('map', './level/Level_01.json');
        this.load.multiatlas('runningman', './img/RunningMan.json', './img');
    }
    create(){
       
        let mountains = this.add.image(0, 0, 'mountains');
        const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage("Terrain","tiles");
        const layer = map.createStaticLayer("World", tileset, 0, 0);
        
        mountains.setDisplaySize(3200, 2000);

        layer.setCollisionByProperty({ collides: true });
        //player = this.physics.add.sprite(200, 200, 'playButton');
      
       
        this.player = new Player(this,150,50);
        this.physics.add.collider(this.player, layer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff'); 

       
    }

    update(){
    }

}
