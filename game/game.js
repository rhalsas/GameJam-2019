
import {Player} from './player.js';
import {Booster} from './booster.js';
export class gameScene extends Phaser.Scene{

    preload(){
        this.load.image('mountains', './img/Background.png');
        this.load.image('tiles', './img/Tileset.png');
        this.load.tilemapTiledJSON('map', './level/Level_01.json');
        this.load.multiatlas('runningman', './img/RunningMan.json', './img');

        // Player character images
        this.load.image('pl_normal', './img/tools/normaali.png');
        this.load.image('pl_slide', './img/tools/liuku.png');
        this.load.image('collectable_item', './img/tools/liuku.png');
    }
    create(){
       
        let mountains = this.add.image(0, 0, 'mountains');
        const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage("Terrain","tiles");
        const layer = map.createStaticLayer("World", tileset, 0, 0);
        
        mountains.setDisplaySize(3200, 2000);

        layer.setCollisionByProperty({ collides: true });
        //player = this.physics.add.sprite(200, 200, 'playButton');
      
       
        this.player = new Player(this,150,100);
        this.physics.add.collider(this.player, layer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
    
        // set background color, so the sky is not black    
        this.cameras.main.setBackgroundColor('#ccccff'); 

       


        var boosters = this.physics.add.group({
            classType: Booster,
            maxSize: 60,
            runChildUpdate: false
        });

        this.physics.add.overlap(this.player, boosters, collectItem, null, this);

        boosters.get().addnew(400, 550);
    }

    update(){
    }
}

function collectItem(player, item) {
    item.disableBody(true,true);
    item.kill();
    player.addBonusAcceleration();
}
