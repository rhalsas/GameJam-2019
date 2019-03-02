let bootState = {

    preload: function(){
        game.load.image('playButton', 'img/tools/playButton.png');
        game.load.image('exitButton', 'img/tools/exitButton.png');
    },

    create: function(){
        
        game.state.start('menu');
    }

}