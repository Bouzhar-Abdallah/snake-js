// Create the canvas
const contentElement = document.getElementById("content");

//creating grid
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
  direction = "down"; // Initial direction
  speed = 2;
  x = 1;
  y = 1;

  setDirection(direction) {
    this.direction = direction;
  }

  mouve(x = this.x, y = this.y) {
    let square = document.getElementById(x + "-" + y);
    setTimeout(() => {
      activateSquare(x, y);

      // Determine the previous square's position
      let prevX = x;
      let prevY = y;
      switch (this.direction) {
        case "right":
          if (x === 0) {
            prevX = 19;
          } else {
            prevX--;
          }
          break;
        case "left":
          if (x === 19) {
            prevX = 0;
          } else {
            prevX++;
          }
          break;
        case "up":
          if (y === 19) {
            prevY = 0;
          } else {
            prevY++;
          }
          break;
        case "down":
          if (y === 0) {
            prevY = 19;
          } else {
            prevY--;
          }
          break;
      }

      // Turn off the previous square
      shutdownSquare(prevX, prevY);

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
