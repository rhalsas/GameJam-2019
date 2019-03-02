
let gamescene;

export class Player extends Phaser.Physics.Arcade.Sprite {

    

    constructor (scene, x, y)
    {
        super(scene, x, y);
        gamescene = scene;
        this.setTexture('playButton');
        this.setPosition(x, y);

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setVelocity(50);
        this.setDisplaySize(32,32);
        let runFrames = scene.anims.generateFrameNames('runningman', {
            start: 1, end: 5, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });
        

        let idleFrames = scene.anims.generateFrameNames('runningman', {
            start: 4, end: 4, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });
        scene.anims.create({ key: 'idle', frames: idleFrames, frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'run', frames: runFrames, frameRate: 20, repeat: -1 });
        this.anims.play('idle');
        this.setOrigin(0.5,1);
        
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        var cursors = gamescene.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.body.setVelocityX(-100);
            this.flipX = true;
            if(this.anims.currentAnim.key !== 'run'){
                console.log(this.anims.currentAnim)
                this.anims.play('run');
            }
           
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(100);
            this.flipX = false;
            if(this.anims.currentAnim.key !== 'run'){
                this.anims.play('run');
            }
           
        } else {
            this.body.setVelocityX(0);
            if(this.anims.currentAnim.key!== 'idle'){
                this.anims.play('idle');
            }
          
        }
        if (cursors.up.isDown)
        {
            this.body.setVelocityY(-330);
        }
    }
}
