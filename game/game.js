
import {Player} from './player.js';
import {Booster} from './booster.js';
export class gameScene extends Phaser.Scene{

    preload() {
        this.load.image("tiles", "./img/Tileset.png");
        this.load.tilemapCSV("map", "./level/Level_01.csv");

        // Player character images
        this.load.image('pl_normal', './img/tools/normaali.png');
        this.load.image('pl_slide', './img/tools/liuku.png');
        this.load.image('collectable_item', './img/tools/liuku.png');
    }

    create() {
        const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("tiles");
        const layer = map.createStaticLayer(0, tileset, 0, 0);
        //player = this.physics.add.sprite(200, 200, 'playButton');

        this.player = new Player(this,150,150);

        var boosters = this.physics.add.group({
            classType: Booster,
            maxSize: 60,
            runChildUpdate: false
        });

        this.physics.add.overlap(this.player, boosters, collectItem, null, this);

        boosters.get().addnew(400, 450);
    }

    update(){
    }
}

function collectItem(player, item) {
    item.disableBody(true,true);
    item.kill();
}
