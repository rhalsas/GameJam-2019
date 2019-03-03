var zone1;
var zone2;
var zone3;
var updateTime = true;
var lastZoneTouched;
import {Player} from './player.js';
import {Booster} from './booster.js';
export class gameScene extends Phaser.Scene{

    preload(){
        this.load.image('mountains', './img/Background.png');
        this.load.image('tiles', './img/Tileset.png');
        this.load.tilemapTiledJSON('map', './level/Level_01.json');
        this.load.multiatlas('runningman', './img/RunningMan.json', './img');
        this.load.multiatlas('powerUp', './img/Powerup.json', './img');

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

        this.createZones();
        this.physics.add.overlap(this.player, boosters, collectItem, null, this);
        this.physics.add.overlap(this.player, zone1);
        this.physics.add.overlap(this.player, zone2);
        this.physics.add.overlap(this.player, zone3);

        boosters.get().addnew(200, 700);
        boosters.get().addnew(1500, 500);
        boosters.get().addnew(800, 150);

        this.lastBestTimeText = this.add.text(220, 60, "Top Time:",{font: '30px Arial', fill: 
        '#FFFFFF', align: 'center'});
        let topTime = localStorage.getItem("toptime");
        if(topTime){
            this.lastBestTimeText.setText(topTime);
        }
        this.timeInSeconds = 0;
        this.timeText = this.add.text(220, 30, "0:00",{font: '30px Arial', fill: 
        '#FFFFFF', align: 'center'});
        
        this.time.addEvent({ delay: 100, callback: this.updateTimer, callbackScope: this, loop: true });
    }

    updateTimer(){
        if(updateTime == true){
            this.timeInSeconds += 0.1;
            this.timeText.setText(this.timeInSeconds.toFixed(1));
        }
        
    }

    updateWinTime(){
        localStorage.setItem("toptime", this.timeInSeconds.toString());
        this.lastBestTimeText.setText("Top Time:" + this.timeInSeconds.toFixed(1));
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
            }
            lastZoneTouched = 3;
        }
        
        zone1.body.debugBodyColor = zone1.body.touching.none ? 0x00ffff : 0xffff00;
        zone2.body.debugBodyColor = zone2.body.touching.none ? 0x00ffff : 0xffff00;
        zone3.body.debugBodyColor = zone3.body.touching.none ? 0x00ffff : 0xffff00;

        if (this.input.gamepad != null
            && this.input.gamepad.total !== 0) {
                let pad = this.input.gamepad.getPad(0);
        var pads = this.input.gamepad.gamepads;
        
        for (var i = 0; i < pads.length; i++) {
            var gamepad = pads[i];
            if (!gamepad) {
               continue;
            }
            if(gamepad.A){
                console.log("A");
            }
            if (gamepad.left) {
                console.log("LEFT button");
            }
            if (gamepad.leftStick.x < 0) {
                console.log("LEFT STICK");
            }
        }
    }
    }

    createZones(){
        zone1 = this.add.zone(1400, 200).setSize(200, 200);
        this.physics.world.enable(zone1);
        zone1.body.setAllowGravity(false);
        zone1.body.moves = false;

        zone2 = this.add.zone(300, 725).setSize(500, 50);
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
    item.disableBody(true,true);
    item.kill();
    player.addBonusAcceleration();
}
