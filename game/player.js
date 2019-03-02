
// Scene needed for input
let gamescene;

// Velocities
let velocityY = -330;
let velocityX = 100;

let maxVelocityX = 200;
let maxVelocityY = 2000;

// Acceleration
let accX = 300;

// Bonus acceleration value
let bonusAccLeft = 0;
let bonusAcc = 500;
const bonusAccTimeToAdd = 500;
const bonusMaxVelocityX = 500;

// Sliding acceleration (slowing down) Should be smaller than normal acceleration
let slideAccX = 200;

let direction = 1;

// Flags for telling if there is jump or slide in progress
let jumping = false;
let sliding = false;

export class Player extends Phaser.Physics.Arcade.Sprite {

    

    constructor (scene, x, y)
    {
        super(scene, x, y);
        gamescene = scene;

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);
        this.body.setSize(24,64);
        this.body.offset = {x: 16, y: 4}
       
        this.setMaxVelocity(maxVelocityX, maxVelocityY);
        this.setCollideWorldBounds(true);
        this.setDisplaySize(16,16);
        let runFrames = gamescene.anims.generateFrameNames('runningman', {
            start: 1, end: 5, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });
        

        let idleFrames = gamescene.anims.generateFrameNames('runningman', {
            start: 4, end: 4, zeroPad: 0,
            prefix: 'running', suffix: '.png'
        });
        scene.anims.create({ key: 'idle', frames: idleFrames, frameRate: 20, repeat: -1 });
        scene.anims.create({ key: 'run', frames: runFrames, frameRate: 20, repeat: -1 });
        this.anims.play('idle');
        this.setOrigin(0.5,1);
        
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        // Check if controller is in use
        if (gamescene.input.gamepad != null 
                && gamescene.input.gamepad.total !== 0) {
            var controller;
            for (var i = 0; i < gamescene.input.gamepad.gamepads.length; i++) {
                controller = gamescene.input.gamepad.gamepads[i];
//                if (this.useController(controller)) {
//                    return;
//                }
            }
        }

        // If controller was not used, use keyboard
        var cursors = gamescene.input.keyboard.createCursorKeys();
        this.useKeyboard(cursors);
    }

    isTouchingGround() {
        return (this.body.blocked.down);
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
                this.body.setMaxVelocity(bonusMaxVelocityX, maxVelocityY);
            }
        }
        console.log("BONUS LEFT " + bonusAccLeft);
        var changeInJump = false;
        if (cursors.down.isDown) {
            console.log("DOWN " + this.body.velocity.x);
            if (sliding === false
                && (this.body.velocity.x > 5 || this.body.velocity.x < -5)
                && this.isTouchingGround()) {
                // Start sliding.
                this.body.setGravityX(-direction * slideAccX);
                sliding = true;
               // this.setTexture('pl_slide');
            } else if (this.body.velocity.x <= 5 && this.body.velocity.x >= -5) { // practically zero
                this.body.setGravityX(0);
                this.body.setVelocityX(0);
                sliding = false;
                //this.setTexture('pl_normal');
            }
            return;
        } else if (sliding === true) {
//            console.log("SLIDING");
            // Sliding is true, but down is not pressed
            this.body.setGravityX(0);
            this.body.setVelocityX(0);
            sliding = false;
            //this.setTexture('pl_normal');
            return
        } else if (jumping === true) {
//            console.log("JUMPING + " + this.body.velocity.x);
            if (this.isTouchingGround()) {
                jumping = false;
                changeInJump = true;
            } else {
                this.body.setGravityX(0);
                return;
            }
        }
        if (cursors.left.isDown) {
//            console.log("LEFT");
            if (changeInJump && direction != -1) {
                this.body.setVelocityX(0);
            }
            this.body.setGravityX(-(accX + ((bonusAccLeft > 0) ? bonusAcc : 0)));
            direction = -1;
            if(this.anims.currentAnim.key!== 'run'){
                this.anims.play('run');
            }
            this.flipX = true;
        } else if (cursors.right.isDown) {
//            console.log("RIGHT");
            if (changeInJump && direction != 1) {
                this.body.setVelocityX(0);
            }
            this.body.setGravityX(accX + ((bonusAccLeft > 0) ? bonusAcc : 0));
            direction = 1;
            if(this.anims.currentAnim.key!== 'run'){
                this.anims.play('run');
            }
            this.flipX = false;
        } else if (!cursors.up.isDown) {
//            console.log("ELSE");
            this.body.setGravityX(0);
            this.body.setVelocityX(0);
            if(this.anims.currentAnim.key!== 'idle'){
                this.anims.play('idle');
            }
          
        }
        if (cursors.up.isDown && this.isTouchingGround()) {
            jumping = true;
            this.body.setVelocityY(velocityY);
        }
    }

    /*
     *
     */
    addBonusAcceleration() {
        bonusAccLeft = bonusAccTimeToAdd;
        this.body.setMaxVelocity(bonusMaxVelocityX, maxVelocityY);

    }
}
