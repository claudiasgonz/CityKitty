class Mouse {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.right = -100                  //right se encarga del plano x. tiene valor negativo para que aparezca fuera del screen primero
        this.top = 525                     //responsible for making it appear at the top, 
        this.width = 63
        this.height = 90
        this.element = document.createElement("img");
        this.element.src = '../mice.gif';
        this.element.style.position = "absolute"; 
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;
    
        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.right += 3 //incrementa el speed del movement del right property, causandolo que se mueva para el lado gradualmente
        this.updatePostion() 
    }

    updatePostion() {
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`;
    }

    createSplash() {
        let newElement = document.createElement("img");
        newElement.src = "../plus1.gif";
        newElement.style.position = "absolute";
        newElement.style.right = `${this.right}px`;
        newElement.style.top = `${this.top}px`;
        newElement.style.width = `${this.width}px`;
        newElement.style.height = `${this.height}px`;
    
        this.gameScreen.appendChild(newElement);
    
        setTimeout(() => {
          newElement.remove();
        }, 1250);
      }
}