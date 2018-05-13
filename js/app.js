/******Lives and Treasure******/
let hearts = document.querySelectorAll('.hearts li');
let heartCounter = [...hearts];
let elements = document.querySelectorAll('.treasures li');
let elementCounter = [...elements];

/************Superclass******************/
//defines common properties and methods
//for all characters on the game board
class Characters {
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
class Enemy extends Characters {
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
    if (player.lives > 0 && player.lives <= 5) {
      for (hearts of heartCounter) {
        /*
        simple collision detection from
        https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        */
        if (this.x < player.x + 50 &&
          this.x + 50 > player.x &&
          this.y < player.y + 60 &&
          this.y + 60 > player.y) {
          player.lives--;
          player.life();
          player.position();
        }
      }
    } else {
      player.position();
      player.sprite = 'images/enemy-bug.png';
    }
  }
}

class Girl extends Characters {
  constructor(sprite, x, y, lives, elements) {
    super(sprite, x, y, lives, elements);
    this.lives = lives;
    this.elements = elements;
  }
  update() {
    if (this.elements > 0 && this.elements <= 5) {
      for (elements of elementCounter) {
        if (this.y <= 30) {
          this.treasure();
          this.elements--;
          this.position();
        }
      }
    }
    if (this.elements <= 0) {
      this.position();
      this.sprite = 'images/char-princess-girl.png';
      this.y = 150;
      bugC.x = -100;
    }
  }

  position() {
    this.x = 200;
    this.y = 380;
  }
  treasure() {
    elements.classList.remove('hiden');
    elementCounter.shift();
    console.log(elementCounter);
  }
  life() {
    hearts.classList.add('hide');
    heartCounter.shift();
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
      this.position();
    }
  }
}

// instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Girl('images/char-cat-girl.png', 200, 380, 5, 5);
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