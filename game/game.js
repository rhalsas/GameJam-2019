var zone1;
var zone2;
var zone3;
var updateTime = true;
var lastZoneTouched;

var boosters;

var bexisting = [null, null, null];


import {Player} from './player.js';
import {Booster} from './booster.js';
export class gameScene extends Phaser.Scene{

    preload(){
        this.load.image('mountains', './img/koodi2.png');
        this.load.image('tiles', './img/Tileset.png');
        this.load.tilemapTiledJSON('map', './level/Level_01.json');
        this.load.multiatlas('runningman', './img/RunningMan.json', './img');
        this.load.multiatlas('powerUp', './img/Powerup.json', './img');

        // Player character images
        this.load.image('pl_normal', './img/tools/normaali.png');
        this.load.image('pl_slide', './img/tools/liuku.png');
        this.load.image('collectable_item', './img/tools/liuku.png');

        this.load.audio('running', [
            'music/sound1.mp3'
        ]);
        this.load.audio('jump',[
            'music/sound2.wav'
        ]);
        this.load.audio('powerup',[
            'music/sound3.wav'
        ]);
        this.load.audio('slide',[
            'music/sound4.wav'
        ]);
        this.load.audio('music',[
            'music/music.wav'
        ])
    }
    create(){

        let mountains = this.add.image(750, 200, 'mountains');
        const map = this.make.tilemap({ key: 'map'});
        const tileset = map.addTilesetImage("Terrain","tiles");
        const layer = map.createStaticLayer("World", tileset, 0, 0);

        mountains.setDisplaySize(2000, 1500);

        layer.setCollisionByProperty({ collides: true });
        //player = this.physics.add.sprite(200, 200, 'playButton');
        this.running = this.sound.add('running', { loop: true });
        this.jump = this.sound.add('jump', { loop: false });
        this.jump.volume = 0.1;
        this.powerup = this.sound.add('powerup', { loop: false });
        this.powerup.volume = 0.5;
        this.music = this.sound.add('music', { loop: true });
        this.slide = this.sound.add('slide', {loop: false});

        this.music.play();

        this.player = new Player(this,150,100);
        this.physics.add.collider(this.player, layer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');


        boosters = this.physics.add.group({
            classType: Booster,
            maxSize: 60,
            runChildUpdate: false
        });

        this.createZones();
        this.physics.add.overlap(this.player, boosters, collectItem, null, this);
        this.physics.add.overlap(this.player, zone1);
        this.physics.add.overlap(this.player, zone2);
        this.physics.add.overlap(this.player, zone3);

//        boosters.get().addnew(200, 700);
//        boosters.get().addnew(1500, 500);
//        boosters.get().addnew(800, 150);
        bexisting[0] = boosters.get().addnew(200, 700);
        bexisting[1] = boosters.get().addnew(1500, 500);
        bexisting[2] = boosters.get().addnew(800, 150);

        this.lastBestTimeText = this.add.text(220, 60, "Top Time:",{font: '30px Arial', fill:
        '#FFFFFF', align: 'center'});
        this.lastTopTime = localStorage.getItem("toptime");
        if(this.lastTopTime ){
            this.lastBestTimeText.setText("Top Time:" + this.lastTopTime);
        }
        this.timeInSeconds = 0;
        this.timeText = this.add.text(220, 30, "0:00",{font: '30px Arial', fill:
        '#FFFFFF', align: 'center'});

        this.time.addEvent({ delay: 10, callback: this.updateTimer, callbackScope: this, loop: true });


    }

    reenableBoosters() {
        bexisting[0].enableBody(true, 200, 700, true, true);
        bexisting[1].enableBody(true, 1500, 500, true, true);
        bexisting[2].enableBody(true, 800, 150, true, true);
    }

    updateTimer(){
        if(updateTime == true){
            this.timeInSeconds += 0.01;
            this.timeText.setText(this.timeInSeconds.toFixed(1));
        }

    }

    updateWinTime(){
        this.reenableBoosters();
        if(this.lastTopTime && parseFloat(this.lastTopTime) > parseFloat(this.timeInSeconds)){
            localStorage.setItem("toptime", this.timeInSeconds.toFixed(2).toString());
            this.lastBestTimeText.setText("Top Time:" + this.timeInSeconds.toFixed(2));
        }
    }

    update(){
        if(!zone1.body.touching.none){
            lastZoneTouched = 1;
        }
        if(!zone2.body.touching.none){
            lastZoneTouched = 2;
        }
        if(!zone3.body.touching.none){
            if(lastZoneTouched == 2){
                //Win
                updateTime=false;
                this.updateWinTime();
                this.timeInSeconds = 0;
                updateTime=true;
            }
            lastZoneTouched = 3;
        }

        //zone1.body.debugBodyColor = zone1.body.touching.none ? 0x00ffff : 0xffff00;
        //zone2.body.debugBodyColor = zone2.body.touching.none ? 0x00ffff : 0xffff00;
        //zone3.body.debugBodyColor = zone3.body.touching.none ? 0x00ffff : 0xffff00;


    }

    createZones(){
        zone1 = this.add.zone(1410, 250).setSize(20, 120);
        this.physics.world.enable(zone1);
        zone1.body.setAllowGravity(false);
        zone1.body.moves = false;

        zone2 = this.add.zone(330, 220).setSize(50, 250);
        this.physics.world.enable(zone2);
        zone2.body.setAllowGravity(false);
        zone2.body.moves = false;

        zone3 = this.add.zone(100, 0).setSize(60, 200);
        this.physics.world.enable(zone3);
        zone3.body.setAllowGravity(false);
        zone3.body.moves = false;
    }
}



function collectItem(player, item) {
    this.powerup.play();
    item.disableBody(true,true);
    item.kill();
    player.addBonusAcceleration();
}
