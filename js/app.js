/************Superclass******************/
//defines common properties and method
//for all players on the game board
class Players {
  constructor(sprite, x, y) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  // Draw the players on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**************Subclasses*****************/
//inherit from parent class
//and add unique properties and method
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
  }
};

class Warrior extends Players {
  constructor(sprite, x, y) {
    super(sprite, x, y);
  }
  update() {

  }
  handleInput(key) {
    if ((this.x > -10 && this.x < 450) && (this.y > 0 && this.y < 400)) {
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
};

// instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Warrior('images/char-cat-girl.png', 200, 380);
let bugA = new Enemy('images/enemy-bug.png', -40, 50, 350);
let bugB = new Enemy('images/enemy-bug.png', -50, 140, 250);
let bugC = new Enemy('images/enemy-bug.png', -30, 230, 250);
let bugD = new Enemy('images/enemy-bug.png', -300, 230, 250);
const allEnemies = [bugA, bugB, bugC, bugD];



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