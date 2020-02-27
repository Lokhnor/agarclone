// make these functions reusable by other entities:

// directionalInput();
// movePlayer();
// foodCollision();

var ctx = document.getElementById("ctx").getContext("2d");
var canvas = document.getElementById("ctx");
ctx.font = "30px Arial";

const settings = {
  growthRate: 0.01
};

class Player {
  constructor() {
    (this.x = 200),
      (this.y = 200),
      (this.r = 20),
      (this.color = "red"),
      (this.width = 30),
      (this.height = 30),
      (this.stepX = 2),
      (this.stepY = 2),
      (this.moveRight = false),
      (this.moveLeft = false),
      (this.moveUp = false),
      (this.moveDown = false);
  }
}
let player = new Player();

class Food {
  constructor() {
    (this.x = 300),
      (this.y = 300),
      (this.r = 6),
      (this.color = "yellow"),
      (this.width = 10),
      (this.height = 10),
      (this.value = 10);
  }
}
let food = new Food();

function drawPlayer({ color, x, y, r }) {
  // ball
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  // border
  ctx.beginPath();
  ctx.arc(x, y, r, 5, 10 * Math.PI);
  ctx.stroke();
}

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

function directionalInput() {
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
  };
}

function movePlayer() {
  if (player.moveRight == true) {
    player.x += player.stepX;
  }
  if (player.moveLeft == true) {
    player.x -= player.stepX;
  }
  if (player.moveUp == true) {
    player.y -= player.stepY;
  }
  if (player.moveDown == true) {
    player.y += player.stepY;
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
        player.r += 0.2;

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
  //ctx.translate(player.x - canvas.width / 2, player.y - canvas.height / 2);
  drawPlayer(player); // draw player on current frame
  window.scrollTo(player.x - 760, player.y - 360);
  ctx.restore();

  directionalInput(); // watch for WASD directional input
  movePlayer(); // change player.x and player.y to move accordingly, in increments of "step"
  drawFood(); // draw all foodPellets
  foodCollision(); // monitors distance between player and foodPellets, deletes food on collision
  ctx.fillStyle = "white";
  ctx.fillText(`${leaderboard}`, player.x - 10, player.y + 10);
}
//   var player = { x, y, r, color, width, height, stepX, stepY, moveRight, moveLeft,
// moveUp, moveDown };
