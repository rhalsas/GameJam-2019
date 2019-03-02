
export class Booster extends Phaser.Physics.Arcade.Image {
    preload() {
        this.load.image('collectable_item', './img/tools/liuku.png');
    }

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setBlendMode(1);
        this.setDepth(1);
        this.setPosition(x, y);
        this.setTexture('collectable_item');
    }

    preUpdate (time, delta) {
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
