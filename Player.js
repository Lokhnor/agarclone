class Player {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.r = 20;
    this.color = "red";
    this.width = 30;
    this.height = 30;
    this.stepX = 2;
    this.stepY = 2;
    this.moveRight = false;
    this.moveLeft = false;
    this.moveUp = false;
    this.moveDown = false;
  }
  move() {
    if (this.moveRight == true) {
      this.x += this.stepX;
    }
    if (this.moveLeft == true) {
      this.x -= this.stepX;
    }
    if (this.moveUp == true) {
      this.y -= this.stepY;
    }
    if (this.moveDown == true) {
      this.y += this.stepY;
    }
  }
  drawPlayer() {
    // ball
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    // border
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 5, 10 * Math.PI);
    ctx.stroke();
  }
}
