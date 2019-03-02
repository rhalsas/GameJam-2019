
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
        
        this.body.setCollideWorldBounds(true);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        var cursors = gamescene.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.body.setVelocityX(-100);
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(100);
        } else {
            this.body.setVelocityX(0);
        }
        if (cursors.up.isDown)
        {
            this.body.setVelocityY(-330);
        }
    }
}
