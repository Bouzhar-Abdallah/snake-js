/*  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    }
  
    switch (event.key) {
      case "ArrowDown":
        alert('down was pressed');
        break;
      case "ArrowUp":
        alert('up was pressed');
        break;
      case "ArrowLeft":
        alert('Left was pressed');
        break;
      case "ArrowRight":
        alert('right was pressed');
        break;
      default:
        return;
    }
  

    event.preventDefault();
  }, true);  */

  var score = 1;
  var posX = 0;
  var posY = 0;

  const headElement = document.getElementById("head"); 

  function mouve(){
    const speed = 5;
    posX +=speed;
    headElement.style.left = posX +'px';
  }

  do {
    setTimeout(mouve(),100);
  } while (posX < 500); 



