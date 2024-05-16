class Game {

    constructor() {
        this.startScreen = document.getElementById('game-intro')
        this.gameScreen = document.getElementById("game-screen")
        this.gameEndScreen = document.getElementById('game-end')
        this.gameContainer = document.getElementById('game-container')
        this.player = new Player(this.gameScreen, 215, 450, 66, 150, '../cat.gif')
        this.height = 600
        this.width = 1000 //width de gameScreen
        this.obstacles = []
        this.mice = []
        this.score = 0
        this.lives = 3
        this.timer = 30
        this.gameIsOver = false
        this.gameIntervalId = null
        this.gameLoopFrequency = 1000/60
        this.frames = 0
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.stats = document.getElementById("stats-container");
        this.clockContainer = document.getElementById("clock-container");
        this.clock = document.getElementById("clock");
        this.endMessage = document.getElementById("end-message");
        this.backgroundMusic = new Audio('BkgMusic.mp3');
        this.splashSound = new Audio('splash.wav');
        this.pointSound = new Audio('point.wav');
        this.introMusic = new Audio('introMusic.wav');
    }
    
    start() {
        
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`
        
        this.startScreen.style.display = 'none'
        this.startScreen.style.padding = 0
        this.startScreen.style.height = 0
        //this.gameContainer.style.display = "block"
        this.stats.style.visibility = "visible"
        this.clock.style.visibility = "visible"
        this.clockContainer.style.visibility = "visible"
        this.stats.style.display = "block"   
        this.clock.style.display = "block"   
        this.clockContainer.style.display = 'block'
        this.gameScreen.style.display = 'block'

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)

        this.backgroundMusic.play()
    }

    gameLoop() {
        this.frames += 1
        let random = Math.random()

        if ((random < .005)) {
            this.obstacles.push(new Obstacle(this.gameScreen))
        }
        if ((Math.random() < .005)) {
            this.mice.push(new Mouse(this.gameScreen))
        }

        this.update()

        if (this.lives <= 0) {
            console.log("Lives====>", this.lives);
            this.gameIsOver = true;
          }
        
        if (this.frames % 60 === 0) {
            this.timer --;
            this.clock.innerHTML = this.timer;
        }

        if (this.timer <= 0) {
            this.gameIsOver = true;
          }

        if (this.gameIsOver === true) { 
            clearInterval(this.gameIntervalId)
            this.gameOverScreen();

            this.backgroundMusic.pause();
        }
    }

    update() {
        this.player.move()

        this.obstacles.forEach((obstacle, i) => 
            {
            obstacle.move()

            if (this.player.didCollide(obstacle)) {
                obstacle.createSplash();

                this.splashSound.currentTime = 0;
                this.splashSound.play();

                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives -= 1;
              }

            if (obstacle.right > this.width) {
                obstacle.element.remove()
                this.obstacles.splice(i, 1)
                this.score++
            }
        })

        
        this.mice.forEach((mouse, i) => 
            {
            mouse.move()

            if (this.player.didCollide(mouse)) {
                mouse.createSplash();

                this.pointSound.currentTime = 0;
                this.pointSound.play();

                mouse.element.remove();
                this.mice.splice(i, 1);
                this.score += 1;
              }

            if (mouse.right > this.width) {
                mouse.element.remove()
                this.mice.splice(i, 1)
            }
        })
        

        this.scoreElement.innerHTML = this.score;
        this.livesElement.innerHTML = this.lives;

    }

    returnLivesMessage() {
        return this.lives
    }

    gameOverScreen() {

        console.log("Game over");
        this.player.element.remove();

        this.obstacles.forEach((obstacle) => {
          obstacle.element.remove();
        });

        this.mice.forEach((mouse) => {  
            mouse.element.remove();
        });
        
        this.stats.style.display = "none"   //eliminates them from game end screen pero no aparecen en replay
        this.clock.style.display = "none"   //eliminates them from game end screen pero no aparecen en replay
        this.clockContainer.style.display = "none"  //eliminates them from game end screen pero no aparecen en replay

        this.gameScreen.style.height = `${0}px`;
        this.gameScreen.style.width = `${0}px`;
        this.gameScreen.style.display = "none";
        console.log("Game end screen", this.stats);

        this.gameEndScreen.style.display = "inherit";
        if (this.timer <= 0) {
            let mySound = new Audio('WinGame.wav')
            mySound.play()
          this.endMessage.innerText = `You won! You finished with a score of ${this.score} and ${this.returnLivesMessage()} lives left!`;
        } else {
            let mySound = new Audio('LoseGame.wav')
            mySound.play()
          this.endMessage.innerText = `You lost!  You ran out of lives and finished with a score of ${this.score}.`;
        }
      }
}