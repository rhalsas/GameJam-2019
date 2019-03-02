export class bootScene extends Phaser.Scene{

    preload(){
        this.load.image('playButton', 'img/tools/playButton.png');
        this.load.image('exitButton', 'img/tools/exitButton.png');
    }

    create(){
        this.scene.start('menuScene');
    }

}
