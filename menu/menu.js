var menuState = {
    create: function(){
        this.playButton = game.add.button(GAME_WIDTH/2 - 64, GAME_HEIGHT/2, 'playButton', this.onPlayButton, this);
        this.playButton.anchor.set(0.5);
        this.editorButton = game.add.button(GAME_WIDTH/2 + 64, GAME_HEIGHT/2, 'editorButton', this.onEditorButton, this);
        this.editorButton.anchor.set(0.5);
    },
    onPlayButton: function(){
        game.state.start('game');
    }
};