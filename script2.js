// Create the canvas
const contentElement = document.getElementById("content");

// Creating grid
for (let i = 0; i < 20; i++) {
  const line = document.createElement("div");
  for (let j = 0; j < 20; j++) {
    const square = document.createElement("div");
    square.id = j + "-" + i;
    square.classList.add("square");
    line.classList.add("line");
    line.appendChild(square);
  }
  contentElement.appendChild(line);
}

// Function to turn square to light color
function activateSquare(i, j) {
  let square = document.getElementById(i + "-" + j);
  square.style.background = "#fff";
}

// Function to reset square color
function shutdownSquare(i, j) {
  let square = document.getElementById(i + "-" + j);
  try {
    square.style.background = "#05204A";
  } catch (e) {
    console.log(e);
  }
}

class Controle {
    constructor(){
        let square = document.getElementById(this.xBait + "-" + this.yBait);
        square.style.background = "#8734f2";
    }
  direction = "right"; // Initial direction
  speed = 2;
  size = 2;
  x = 4;
  y = 9;
  prevX = this.x; // Initialize prevX to 0
  prevY = this.y; // Initialize prevY to 0
  xBait = Math.floor(Math.random() * (19 - 0 + 1)) + 0
  yBait = Math.floor(Math.random() * (19 - 0 + 1)) + 0
  setDirection(direction) {
    this.direction = direction;
    
  }
  generateBait(){
    let score = document.getElementById("score")
    score.innerText = this.size
    this.xBait = Math.floor(Math.random() * (19 - 0 + 1)) + 0
    this.yBait = Math.floor(Math.random() * (19 - 0 + 1)) + 0
    let square = document.getElementById(this.xBait + "-" + this.yBait);
        square.style.background = "#8734f2";
  }
  mouve(x = this.x, y = this.y) {
    if(this.x === this.xBait && this.y === this.yBait){
        this.generateBait()
        this.size ++
    }
    let square = document.getElementById(x + "-" + y);
    setTimeout(() => {
      activateSquare(x, y);

      // Turn off the previous square
      let prevX = this.prevX
      let prevY = this.prevY
      setTimeout(() => {
        shutdownSquare(prevX, prevY);
      },  (this.size -1) * (400 / this.speed));
     /*  */

      // Update prevX and prevY
      this.prevX = x;
      this.prevY = y;

      // Move the square based on the direction
      switch (this.direction) {
        case "right":
          if (x === 19) {
            this.x = 0;
            this.mouve(this.x, y);
          } else {
            this.x++;
            this.mouve(this.x, y);
          }
          break;
        case "left":
          if (x === 0) {
            this.x = 19;
            this.mouve(this.x, y);
          } else {
            this.x--;
            this.mouve(this.x, y);
          }
          break;
        case "up":
          // Handle movement up
          if (y === 0) {
            this.y = 19;
            this.mouve(x, this.y);
          } else {
            this.y--;
            this.mouve(x, this.y);
          }
          break;
        case "down":
          // Handle movement down
          if (y === 19) {
            this.y = 0;
            this.mouve(x, this.y);
          } else {
            this.y++;
            this.mouve(x, this.y);
          }
          break;
      }
    }, 400 / this.speed);
  }
}

const controle = new Controle();
controle.mouve();

// Event listener for arrow key presses to change direction
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "ArrowDown":
      controle.setDirection("down");
      break;
    case "ArrowUp":
      controle.setDirection("up");
      break;
    case "ArrowLeft":
      controle.setDirection("left");
      break;
    case "ArrowRight":
      controle.setDirection("right");
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);
