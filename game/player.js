

export class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);
        this.setTexture('playButton');
        this.setPosition(x, y);
        scene.add.existing(this);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }

    update (){
    
    }

}
