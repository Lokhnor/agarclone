// make these functions reusable by other entities:

// foodCollision();

var ctx = document.getElementById("ctx").getContext("2d");
var canvas = document.getElementById("ctx");
ctx.font = "30px Arial";

const settings = {
  growthRate: 0.4
};

let player = new Player();
let player2 = new Player();

class Food {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.r = 6;
    this.color = "yellow";
    this.width = 10;
    this.height = 10;
    this.value = 10;
  }
}
let food = new Food();

let foodPellets = [];

for (let i = 0; i <= 1000; i++) {
  generateFood();
}

function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width);
  food.y = Math.floor(Math.random() * canvas.height);

  if (
    food.x >= player.x - player.r &&
    food.x <= player.x + player.r &&
    food.y >= player.y - player.r &&
    food.y <= player.y + player.r
  ) {
    return;
  }

  food.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  foodPellets.push({
    x: food.x,
    y: food.y,
    r: food.r,
    color: food.color,
    value: food.value
  });
}

function drawFood() {
  for (let i = 0; i < foodPellets.length; i++) {
    ctx.fillStyle = foodPellets[i].color;
    ctx.beginPath();
    ctx.arc(foodPellets[i].x, foodPellets[i].y, food.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function foodCollision() {
  let distanceX = 0;
  let distanceY = 0;
  let distance = 0;

  for (let i = 0; i < foodPellets.length; i++) {
    distanceX = player.x - foodPellets[i].x;
    distanceY = player.y - foodPellets[i].y;

    distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= player.r + 5) {
      delete foodPellets[i];
      leaderboard++;
      player.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      regenPellet(i);

      function regenPellet(pellet) {
        player.r += settings.growthRate;

        food.x = Math.floor(Math.random() * canvas.width);
        food.y = Math.floor(Math.random() * canvas.height);

        if (
          food.x >= player.x - player.r &&
          food.x <= player.x + player.r &&
          food.y >= player.y - player.r &&
          food.y <= player.y + player.r
        ) {
          regenPellet(i);
          return;
        }

        food.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        foodPellets[i] = {
          x: food.x,
          y: food.y,
          r: food.r,
          color: food.color
        };
      }
    }
  }
}

setInterval(drawGame, 17);

let leaderboard = 1;
let bgColor = "#1a1a1a";

let i = 0;

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen to draw next frame
  ctx.fillStyle = bgColor; // background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (leaderboard % 200 == 0) {
    settings.growthRate = settings.growthRate / 2;
  }

  ctx.save();
  player.drawPlayer();
  player2.drawPlayer();
  window.scrollTo(player.x - 760, player.y - 360);
  ctx.restore();

  player.move();
  player2.move();

  drawFood(); // draw all foodPellets
  foodCollision(); // monitors distance between player and foodPellets, deletes food on collision
  ctx.fillStyle = "white";
  ctx.fillText(`${leaderboard}`, player.x - 10, player.y + 10);

  document.onkeydown = function(event) {
    if (event.keyCode === 68) {
      player.moveRight = true;
    }
    if (event.keyCode === 65) {
      player.moveLeft = true;
    }
    if (event.keyCode === 87) {
      player.moveUp = true;
    }
    if (event.keyCode === 83) {
      player.moveDown = true;
    }
    //player 2
    if (event.keyCode === 39) {
      player2.moveRight = true;
    }
    if (event.keyCode === 37) {
      player2.moveLeft = true;
    }
    if (event.keyCode === 38) {
      player2.moveUp = true;
    }
    if (event.keyCode === 40) {
      player2.moveDown = true;
    }
  };

  document.onkeyup = function(event) {
    if (event.keyCode === 68) {
      player.moveRight = false;
    }
    if (event.keyCode === 65) {
      player.moveLeft = false;
    }
    if (event.keyCode === 87) {
      player.moveUp = false;
    }
    if (event.keyCode === 83) {
      player.moveDown = false;
    }
    // player 2
    if (event.keyCode === 39) {
      player2.moveRight = false;
    }
    if (event.keyCode === 37) {
      player2.moveLeft = false;
    }
    if (event.keyCode === 38) {
      player2.moveUp = false;
    }
    if (event.keyCode === 40) {
      player2.moveDown = false;
    }
  };
}
// x,
// y,
// r,
// color,
// width,
// height,
// stepX,
// stepY,
// moveRight,
// moveLeft,
// moveUp,
// moveDown
