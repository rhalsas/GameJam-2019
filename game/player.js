
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
const bonusVelocityBonusX = 500;
let bonusVelocityX = 0;
let bonusAccLeft = 0;

// Sliding acceleration (slowing down) Should be smaller than normal acceleration
const slideAccX = 90;

let direction = 1;

// Flags for telling if there is jump or slide in progress
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
            var pads = gamescene.input.gamepad.gamepads;
            for (var i = 0; i < pads.length; i++) {
                var gamepad = pads[i];
                if (!gamepad) {
                    continue;
                }
                if (gamepad.left) {
                    console.log("LEFT button");
                }
                if (gamepad.leftStick.x < 0) {
                    console.log("LEFT STICK");
                }
            }
        }

        // If controller was not used, use keyboard
        var cursors = gamescene.input.keyboard.createCursorKeys();
        this.useKeyboard(cursors);
    }

    isTouchingGround() {
        return (this.body.touching.down  || this.y >= 584);
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
        console.log("DIRECTION " + direction);
        if (bonusAccLeft > 0) {
            bonusAccLeft--;
            if (bonusAccLeft === 0) {
                bonusVelocityX = 0;
            }
        }
        var changeInJump = false;
        if (cursors.down.isDown) {
//            console.log("DOWN " + this.body.velocity.x);
            if (sliding === false
                && (this.body.velocity.x > 5 || this.body.velocity.x < -5)
                && this.isTouchingGround()) {
                // Start sliding.
                this.body.setAccelerationX(-direction * slideAccX);
                sliding = true;
                this.setTexture('pl_slide');
            } else if (this.body.velocity.x <= 5 && this.body.velocity.x >= -5) { // practically zero
                this.body.setVelocityX(0);
                this.body.setAccelerationX(0);
                sliding = false;
                this.setTexture('pl_normal');
            }
            return;
        } else if (sliding === true) {
            // Sliding is true, but down is not pressed
            this.body.setVelocityX(0);
            this.body.setAccelerationX(0);
            sliding = false;
            this.setTexture('pl_normal');
            return
        } else if (jumping === true) {
            if (this.isTouchingGround()) {
                jumping = false;
                changeInJump = true;
            } else if (cursors.left.isDown && direction === -1) {
                this.body.setVelocityX(-(accX + bonusVelocityX));
                return;
            } else if (cursors.right.isDown && direction === 1) {
                this.body.setVelocityX(accX + bonusVelocityX);
                return;
            } else {
                this.body.setVelocityX(0);
                return;
            }
        }
        if (cursors.left.isDown) {
            if (changeInJump && direction != -1) {
                this.body.setVelocityX(0);
            }
            this.body.setVelocityX(-(accX + bonusVelocityX));
            direction = -1;
        } else if (cursors.right.isDown) {
            if (changeInJump && direction != 1) {
                this.body.setVelocityX(0);
            }
            this.body.setVelocityX(accX + bonusVelocityX);
            direction = 1;
        } else if (!cursors.up.isDown) {
            this.body.setVelocityX(0);
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
        bonusVelocityX = bonusVelocityBonusX;
    }
}
