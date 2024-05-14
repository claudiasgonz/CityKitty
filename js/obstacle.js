class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.left = Math.random() * 300 + 100
        this.top = -150 // responsible for making it appear at the top, tiene valor negativo para que aparezca fuera del screen primero
        this.width = 63
        this.height = 150
        this.element = document.createElement("img");
        this.element.src = '../water-puddle.png';
        this.element.style.position = "absolute";
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;
    
        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.top += 3 //incrementa el valor del top property, causandolo que se mueva para abajo gradualmente
        this.updatePostion()
    }

    updatePostion() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    createSplash() {
        let newElement = document.createElement("img");
        newElement.src = "../splash2.gif";
        newElement.style.position = "absolute";
        newElement.style.left = `${this.left}px`;
        newElement.style.top = `${this.top}px`;
        newElement.style.width = `${this.width}px`;
        newElement.style.height = `${this.height}px`;
    
        this.gameScreen.appendChild(newElement);
    
        setTimeout(() => {
          newElement.remove();
        }, 1250);
      }
}