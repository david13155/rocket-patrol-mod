let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, MultiPlayers]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyA, keyD, keyLEFT, keyRIGHT, keyDOWN, keySPACE;

/*Name: Tingyuan Lu
  Project Name: Huntsman (Rocket Patrol Mod)
  Date: 7/10/2021
  How long it took: 4 hours
  Really sorry for submitting it late but these days my cat ill really badly I had to bring him to several animal hospitals for help. Fortunately now it seems to be recovered.

/*Finishing the Tutorial: an automatic 20 points.
  Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
  Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)
  Implement a simultaneous two-player mode (30)
  Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)*/

/* All Assets I used in my project are all free online.
  Pixel Bird 1:http://pixelartmaker.com/art/39782b73aef24af
  Pixel Bird 2:https://ma9ici4n.itch.io/pixel-art-bird-16x16
  Background: https://jesse-m.itch.io/jungle-pack
  Pickel Bullet 1: https://www.pixilart.com/art/pixel-bullet-00e5a8660c772f2
  Pickel Bullet 2: I edited it based on the Pickel Bullet 1
  Background Music: https://www.chosic.com/download-audio/?t=27009&tag=Games
  Bird Kill Sound: https://elements.envato.com/bad-crow-bird-kill-Y9KS3CV
  Select Effect Sound: https://mixkit.co/free-sound-effects/game/ */

  

