
// Velocities
let velocityY = -330;
let velocityX = 100;

let maxVelocityX = 500;
let maxVelocityY = 500;
let accX = 300;

// Sliding acceleration (slowing down) Should be smaller than normal acceleration
let slideAccX = 200;

let gamescene;

let direction = 1;

let jumping = false;
let sliding = false;

export class Player extends Phaser.Physics.Arcade.Sprite {
    preload() {
    }
    constructor (scene, x, y) {
        super(scene, x, y);
        gamescene = scene;
        this.setTexture('pl_normal');
        this.setPosition(x, y);

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);
        this.body.setMaxVelocity(maxVelocityX, maxVelocityY);
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        // Check if controller is in use
        if (gamescene.input.gamepad !== null
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
        return (this.body.touching.down  || this.y >= 568);
    }

    /*
     *
     */
    useController (controller) {
        if (controller.leftStick.x < 0) {
            console.log("LEFT");
            this.body.setGravityX(-accX);
            direction = -1;
            return true;
        } else if (controller.leftStick.x > 0) {
            console.log("RIGHT");
            this.body.setGravityX(accX);
            direction = 1;
            return true;
        }
        return false;
    }

    /*
     *
     */
    useKeyboard (cursors) {
        var changeInJump = false;
        if (cursors.down.isDown) {
            console.log("DOWN " + this.body.velocity.x);
            if (sliding === false
                && (this.body.velocity.x > 5 || this.body.velocity.x < -5)
                && this.isTouchingGround()) {
                // Start sliding.
                this.body.setGravityX(-direction * slideAccX);
                sliding = true;
                this.setTexture('pl_slide');
            } else if (this.body.velocity.x <= 5 && this.body.velocity.x >= -5) { // practically zero
                this.body.setGravityX(0);
                this.body.setVelocityX(0);
                sliding = false;
                this.setTexture('pl_normal');
            }
            return;
        } else if (sliding === true) {
//            console.log("SLIDING");
            // Sliding is true, but down is not pressed
            this.body.setGravityX(0);
            this.body.setVelocityX(0);
            sliding = false;
            this.setTexture('pl_normal');
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
            this.body.setGravityX(-accX);
            direction = -1;
        } else if (cursors.right.isDown) {
//            console.log("RIGHT");
            if (changeInJump && direction != 1) {
                this.body.setVelocityX(0);
            }
            this.body.setGravityX(accX);
            direction = 1;
        } else {
//            console.log("ELSE");
            this.body.setGravityX(0);
            this.body.setVelocityX(0);
        }
        if (cursors.up.isDown && this.isTouchingGround()) {
            jumping = true;
            this.body.setVelocityY(velocityY);
        }
    }
}
