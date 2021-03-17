var ctx = document.getElementById("ctx").getContext("2d");
var canvas = document.getElementById("ctx");
ctx.font = "30px Arial";

let player = new Player();
player.color = "blue";
let player2 = new Player();
let food = new Food();

let foodPellets = [];

for (let i = 0; i <= 500; i++) {
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
    value: food.value,
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
          color: food.color,
        };
      }
    }
  }
}

const gameLoop = setInterval(drawGame, 17);

let i = 0;

function collision() {
  if (
    Math.abs(player.x - player2.x) <= player.r + player2.r &&
    Math.abs(player.y - player2.y) <= player.r + player2.r
  ) {
    if (player.r > player2.r) {
      player2 = "loser";
      alert("Player 1 Wins!");
      clearInterval(gameLoop);
    } else {
      player = "loser";
      alert("Player 2 Wins!");
      clearInterval(gameLoop);
    }
  }
}
player2.x = 400;
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen to draw next frame
  ctx.fillStyle = "#1a1a1a"; // background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.drawPlayer();
  player2.drawPlayer();

  player.move();
  player2.move();

  player.growthControl();
  player2.growthControl();

  collision();

  window.scrollTo(player.x - 760, player.y - 360);

  drawFood(); // draw all foodPellets
  foodCollision(player); // monitors distance between player and foodPellets, deletes food on collision
  foodCollision(player2);

  document.onkeydown = function (event) {
    if (event.key === "d") {
      player.moveRight = true;
    }
    if (event.key === "a") {
      player.moveLeft = true;
    }
    if (event.key === "w") {
      player.moveUp = true;
    }
    if (event.key === "s") {
      player.moveDown = true;
    }
    //player 2
    if (event.key === "ArrowRight") {
      player2.moveRight = true;
    }
    if (event.key === "ArrowLeft") {
      player2.moveLeft = true;
    }
    if (event.key === "ArrowUp") {
      player2.moveUp = true;
    }
    if (event.key === "ArrowDown") {
      player2.moveDown = true;
    }
  };

  document.onkeyup = function (event) {
    if (event.key === "d") {
      player.moveRight = false;
    }
    if (event.key === "a") {
      player.moveLeft = false;
    }
    if (event.key === "w") {
      player.moveUp = false;
    }
    if (event.key === "s") {
      player.moveDown = false;
    }
    // player 2
    if (event.key === "ArrowRight") {
      player2.moveRight = false;
    }
    if (event.key === "ArrowLeft") {
      player2.moveLeft = false;
    }
    if (event.key === "ArrowUp") {
      player2.moveUp = false;
    }
    if (event.key === "ArrowDown") {
      player2.moveDown = false;
    }
  };
}
