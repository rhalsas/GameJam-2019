Player = function (game, x, y) {
    Phaser.Sprite.call(this,game,x,y,'playButton');
    this.animations.add('idle',[0]);
    this.animations.play('idle');
    console.log("createdtatta", this.x, this.y)
    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        
        this.x -= 5;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        this.x += 5;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        this.y -= 5;
    }

};
