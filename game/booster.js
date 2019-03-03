
export class Booster extends Phaser.Physics.Arcade.Sprite {
    preload() {
       
    }

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setBlendMode(1);
        this.setDepth(1);
        this.setPosition(x, y);
        this.setDisplaySize(12,12);
        console.log(scene.anims)
        let powerUpFrames = scene.anims.generateFrameNames('powerUp', {
            start: 1, end: 6, zeroPad: 0,
            prefix: 'powerup', suffix: '.png'
        });
        
        console.log(powerUpFrames);
        scene.anims.create({ key: 'powerupping', frames: powerUpFrames, frameRate: 20, repeat: -1 });
        console.log(scene.anims)
        this.anims.play('powerupping');
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
    }

    kill () {
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
    }

    addnew (x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);
        this.body.allowGravity = false;
    }
}
