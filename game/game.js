
import {Player} from './player.js';
export class gameScene extends Phaser.Scene{

    preload(){
        this.load.image("tiles", "./img/Tileset.png");
        this.load.tilemapCSV("map", "./level/Level_01.csv");
    }
    create(){
       
        const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("tiles");
        const layer = map.createStaticLayer(0, tileset, 0, 0);
        //player = this.physics.add.sprite(200, 200, 'playButton');
      
        this.player = new Player(this,150,150);
       
    }

    update(){
    }

}
