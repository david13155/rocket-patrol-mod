class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion', './assets/bird_kill.mp3');
        this.load.audio('sfx_rocket', './assets/gun_shot.mp3');
        this.load.audio('bgm', './assets/bgm.mp3');
        this.load.image('starfield', './assets/jungle.png');
    }

    create() {  

      this.sound.play('bgm');
      
      this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
      
      // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#964B00',
            color: '#FFFF00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'Huntsman', {fill: '#D3D3D3', font: '900 55px Courier', resolution: 5}).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 40, 'P1: Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'P2: Use (A),(D) to move & SPACEBAR to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#552583';
        menuConfig.color = '#FFFF00';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 40, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 80, 'Press ↓ for Multiplayers', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            birdSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            birdSpeed: 6,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // Multiplayers
          game.settings = {
            spaceshipSpeed: 3,
            birdSpeed: 5,
            gameTimer: 60000   
          }
          this.sound.play('sfx_select');
          this.scene.start("Multiplayers");    
        }
      }
}