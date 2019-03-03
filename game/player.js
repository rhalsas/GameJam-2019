
// Scene needed for input
let gamescene;

// Velocities
let velocityY = -200;
let velocityX = 100;

const maxVelocityX = 500;
const maxVelocityY = 2000;

// Acceleration
const accX = 200;

// Bonus acceleration value
const bonusAccTimeToAdd = 500;
const bonusVelocityBonusX = 200;
let bonusVelocityX = 0;
let bonusAccLeft = 0;

// Sliding acceleration (slowing down) Should be smaller than normal acceleration
const slideAccX = 90;

let direction = 1;

// Flags for telling if there is jump or slide in progress
let sliding = false;

export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);
        gamescene = scene;

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);
        this.body.setSize(16,64, true);
        this.body.setOffset(16,4);
       
        this.setMaxVelocity(maxVelocityX, maxVelocityY);
        this.setCollideWorldBounds(true);
        this.setDisplaySize(24,24);
        let runFrames = gamescene.anims.generateFrameNames('runningman', {
            start: 1, end: 5, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });


        let idleFrames = gamescene.anims.generateFrameNames('runningman', {
            start: 4, end: 4, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });

        let slidingFrames = gamescene.anims.generateFrameNames('runningman', {
            start: 6, end: 10, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });

        let slidingLoopFrames = [
            slidingFrames[2],
            slidingFrames[3],
            slidingFrames[4],
            slidingFrames[3],
            slidingFrames[2],
            slidingFrames[3],
            slidingFrames[4],
            slidingFrames[3],
        ]

        let toSlidingLoopFrames = [
            slidingFrames[0],
            slidingFrames[1]
        ]
        scene.anims.create({ key: 'idle', frames: idleFrames, frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'run', frames: runFrames, frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'toSlide', frames: toSlidingLoopFrames, frameRate: 20, repeat: 1});
        scene.anims.create({ key: 'slide', frames: slidingLoopFrames, frameRate: 20, repeat: -1 });
        this.anims.play('idle');
        this.setOrigin(0.5,1);

    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        // Check if controller is in use
        

        if(sliding == true){
            this.body.setSize(16,32, true);
            this.body.setOffset(16,24);
        } else {
            this.body.setSize(16,64, true);
            this.body.setOffset(16,4);
        }
        // If controller was not used, use keyboard
        var cursors = gamescene.input.keyboard.createCursorKeys();
        this.useKeyboard(cursors);
    }

    isTouchingGround() {
        return (this.body.blocked.down);
    }

    update(){

        
    }
    /*
     *
     */
    useController (controller) {
        if (controller.leftStick.x < 0) {
            console.log("LEFT");
            this.body.setGravityX(-accX);
            direction = -1;
            this.flipX = true;
            return true;
        } else if (controller.leftStick.x > 0) {
            console.log("RIGHT");
            this.body.setGravityX(accX);
            direction = 1;
            this.flipX = false;
            return true;
        }
        return false;
    }

    /*
     *
     */
    useKeyboard (cursors) {
        if (bonusAccLeft > 0) {
            bonusAccLeft--;
            if (bonusAccLeft === 0) {
                bonusVelocityX = 0;
            }
        }
        if (cursors.down.isDown) {
//            console.log("DOWN " + this.body.velocity.x);
            if (sliding === false
                && (this.body.velocity.x > 5 || this.body.velocity.x < -5)
                && this.isTouchingGround()) {
                // Start sliding.
                if(this.anims.currentAnim.key != 'toSlide' || this.anims.currentAnim.key != 'slide'){
                    this.anims.play('toSlide');
                    this.once('animationcomplete', () => this.anims.play('slide'));
                }
                
                this.body.setAccelerationX(-direction * slideAccX);
                sliding = true;
               // this.setTexture('pl_slide');
            } else if (this.body.velocity.x <= 5 && this.body.velocity.x >= -5) { // practically zero
                this.body.setVelocityX(0);
                this.body.setAccelerationX(0);
                sliding = false;
                //this.setTexture('pl_normal');
            }
            return;
        } else if (sliding === true) {
            // Sliding is true, but down is not pressed
            this.body.setVelocityX(0);
            this.body.setAccelerationX(0);
            sliding = false;
            return
        }
        if (cursors.left.isDown) {
            this.body.setVelocityX(-(accX + bonusVelocityX));
            direction = -1;
            if(this.anims.currentAnim.key!== 'run'){
                this.anims.play('run');
            }
            this.flipX = true;
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(accX + bonusVelocityX);
            direction = 1;
            if(this.anims.currentAnim.key!== 'run'){
                this.anims.play('run');
            }
            this.flipX = false;
        } else if (!cursors.up.isDown) {
            this.body.setVelocityX(0);
            if(this.anims.currentAnim.key!== 'idle'){
                this.anims.play('idle');
            }

        }
        if (cursors.up.isDown && this.isTouchingGround()) {
            this.body.setVelocityY(velocityY);
        }
    }

    /*
     *
     */
    addBonusAcceleration() {
        bonusAccLeft = bonusAccTimeToAdd;
        bonusVelocityX = bonusVelocityBonusX;
    }
}
