class MultiPlayers extends Phaser.Scene {
    constructor() {
        super("Multiplayers");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/bullet.png');
        this.load.image('bullet', './assets/bullet2.png');
        this.load.image('bird1', './assets/bird1.png');
        this.load.image('bird2', './assets/bird2.png');
        this.load.image('starfield', './assets/jungle.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xd3d3d3).setOrigin(0, 0).setAlpha(0.5);
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding - 30, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Bullet(this, game.config.width/1.5, game.config.height - borderUISize - borderPadding - 26, 'bullet').setOrigin(0.5, 0);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'bird1', 0, 30).setOrigin(0, 0).setScale(0.1);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bird1', 0, 20).setOrigin(0,0).setScale(0.1);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'bird1', 0, 10).setOrigin(0,0).setScale(0.1);
        this.bird01 = new Bird(this, game.config.width + borderUISize*6, borderUISize*4, 'bird2', 0, 100).setOrigin(0, 0).setScale(0.3);
        this.bird02 = new Bird(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bird2', 0, 75).setOrigin(0,0).setScale(0.3);
        this.bird03 = new Bird(this, game.config.width, borderUISize*6 + borderPadding*4, 'bird2', 0, 50).setOrigin(0,0).setScale(0.3);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p1Hit = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#D3D3D3',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 190
            
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // initialize hit
        
        // display hit
        let hitConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#D3D3D3',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 130
        }
        this.hitLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*6, this.p1Hit, hitConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p2Rocket.update();     
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.bird01.update();
            this.bird02.update();
            this.bird03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollisionBird(this.p1Rocket, this.bird01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.bird01);
        }
        if (this.checkCollisionBird(this.p1Rocket, this.bird02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.bird02);
        }
        if (this.checkCollisionBird(this.p1Rocket, this.bird03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.bird03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollisionBird(this.p2Rocket, this.bird01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.bird01);
        }
        if (this.checkCollisionBird(this.p2Rocket, this.bird02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.bird02);
        }
        if (this.checkCollisionBird(this.p2Rocket, this.bird03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.bird03);
        }

        this.scoreLeft.setText('Score: ' + this.p1Score)
        this.hitLeft.setText('Hit: ' + this.p1Hit)
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width * 0.1 && 
            rocket.x + rocket.width * 0.3> ship.x && 
            rocket.y < ship.y + ship.height * 0.1 &&
            rocket.height * 0.1 + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    checkCollisionBird(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width * 0.3 && 
            rocket.x + rocket.width * 0.3> ship.x && 
            rocket.y < ship.y + ship.height * 0.3 &&
            rocket.height * 0.1 + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.p1Hit ++;
        this.scoreLeft.text = this.p1Score;
        this.hitLeft.text = this.p1Hit; 
        
        this.sound.play('sfx_explosion');
      }
    birdKill(bird) {
        // temporarily hide ship
        bird.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(bird.x, bird.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            bird.reset();                         // reset ship position
            bird.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += bird.points;
        this.p1Hit ++;
        this.scoreLeft.text = this.p1Score;
        this.hitLeft.text = this.p1Hit; 
        
        this.sound.play('sfx_explosion');
    }
      
}