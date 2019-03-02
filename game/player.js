

export class Player extends Phaser.Physics.Arcade.Sprite{

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.setTexture('playButton');
        this.setPosition(x, y);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setVelocity(50);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        
    }


}
