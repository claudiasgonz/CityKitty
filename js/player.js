class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
      this.gameScreen = gameScreen;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.directionX = 0;
      this.directionY = 0;
      this.element = document.createElement("img");
      this.element.src = imgSrc;
      this.element.style.position = "absolute";
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.width = `${this.width}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      this.left += this.directionX;
      this.top += this.directionY;
  
      if (this.left <= 10) {
        this.left = 10;
        this.directionX *= -0.5;
      }
  
      //gato choca con techo
      if (this.top <= this.height*2) {
        this.top = this.height*2;
        this.directionY *= -0.5;
      }
      //gato choca con pared
      if (this.left >= this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
        this.directionX *= -0.5;
      }
      //gato choca con piso
      if (this.top >= this.gameScreen.offsetHeight - this.height - 10) 
        {
        this.top = this.gameScreen.offsetHeight - this.height - 10;
        this.directionY *= -0.5;
      }
  
      this.updatePosition();
    }
  
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRectangle = obstacle.element.getBoundingClientRect();
  
      if (
        playerRect.left < obstacleRectangle.right &&
        playerRect.right > obstacleRectangle.left &&
        playerRect.top < obstacleRectangle.bottom &&
        playerRect.bottom > obstacleRectangle.top
      ) {
        console.log("Colliding");
        return true;
      } else {
        return false;
      }
    }
  }