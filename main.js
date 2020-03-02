var ctx = document.getElementById("ctx").getContext("2d");
var canvas = document.getElementById("ctx");
ctx.font = "30px Arial";

const settings = {
  growthRate: 0.4
};
// creating Player instances
let player = new Player();
player.color = "blue";
let player2 = new Player();
// creating Food instances
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

function foodCollision(player) {
  let distanceX = 0;
  let distanceY = 0;
  let distance = 0;

  for (let i = 0; i < foodPellets.length; i++) {
    distanceX = player.x - foodPellets[i].x;
    distanceY = player.y - foodPellets[i].y;

    distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= player.r + 5) {
      delete foodPellets[i];
      player.score++;
      regenPellet(i);

      function regenPellet(pellet) {
        player.r += player.growthRate;

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

  player.drawPlayer();
  player2.drawPlayer();

  player.move();
  player2.move();

  player.growthControl();
  player2.growthControl();

  window.scrollTo(player.x - 760, player.y - 360);

  drawFood(); // draw all foodPellets
  foodCollision(player); // monitors distance between player and foodPellets, deletes food on collision
  foodCollision(player2);

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
