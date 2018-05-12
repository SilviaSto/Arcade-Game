/******Lives******/
let hearts = document.querySelectorAll('.hearts li');
let heartCounter = [...hearts];

/************Superclass******************/
//defines common properties and methods
//for all players on the game board
class Players {
  constructor(sprite, x, y) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  // Draw all players on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**************Subclasses*****************/
//inherit from parent class
//and add unique properties and methods
class Enemy extends Players {
  constructor(sprite, x, y, speed) {
    super(sprite, x, y, speed);
    this.speed = speed;
  }
  // multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  update(dt) {
    this.x += this.speed * (Math.random() * dt);
    if (this.x > 505) {
      this.x = -100;
    }

    /*
    simple collision detection from
    https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    */
    if (player.lives > 0 && player.lives <= 5) {
      for (hearts of heartCounter) {
        if (this.x < player.x + 50 &&
          this.x + 50 > player.x &&
          this.y < player.y + 60 &&
          this.y + 60 > player.y) {
          player.lives--;
          player.position();
          player.life();
        }
      }
    } else {
      player.position();
    }
  }
}



class Warrior extends Players {
  constructor(sprite, x, y, lives) {
    super(sprite, x, y, lives);
    this.lives = lives;
  }
  update(dt) {
    if (this.y < 30) {
      console.log('hi');
    }
  }
  handleInput(key) {
    if ((this.x > -10 && this.x < 450) && (this.y > 30 && this.y < 400)) {
      switch (key) {
        case 'left':
          this.x -= 50;
          break;
        case 'right':
          this.x += 50;
          break;
        case 'up':
          this.y -= 50;
          break;
        case 'down':
          this.y += 50;
          break;
      }
    } else {
      this.x = 200;
      this.y = 380;
    }
  }
  position() {
    player.x = 200;
    player.y = 380;
  }
  life() {
    hearts.classList.add('hide');
    heartCounter.shift();
    console.log(hearts);
    console.log(heartCounter);
  }
}

// instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Warrior('images/char-cat-girl.png', 200, 380, 5);
let bugA = new Enemy('images/enemy-bug.png', -40, 50, 350);
let bugB = new Enemy('images/enemy-bug.png', -40, 80, 550);
let bugC = new Enemy('images/enemy-bug.png', -50, 140, 250);
let bugD = new Enemy('images/enemy-bug.png', -30, 230, 250);
let bugE = new Enemy('images/enemy-bug.png', -300, 230, 200);
const allEnemies = [bugA, bugB, bugC, bugD, bugE];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});