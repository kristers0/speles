const mansZimejums = document.getElementById("mansZimejums");
const ctx = mansZimejums.getContext("2d");

let man_x = 100; 
let man_y = mansZimejums.height - 30;

const manImg = new Image(); // labots mainīgais
manImg.src = "man.png";
let bumba_x = Math.random() * (mansZimejums.width - 25);
let bumba_y = 0; 
const bumbaImg = new Image(); // labots mainīgais
bumbaImg.src = "bumba.png"; 

const man = { width: 30, height: 30 }; 
const bumba = { width: 20, height: 20 }; 

let score = 0;
let bumba_speed = 1; // bumbas ātrums
let FPS = 40; // pikseļi sekundē
let time_remaining = 20;
let gameOver = false;

function restart_game() {
  time_remaining = 20;
  score = 0;
  bumba_speed = 1;
  bumba_y = 0; // Restartē bumbas pozīciju
  bumba_x = Math.random() * (mansZimejums.width - bumba.width); 
  gameOver = false;
}

function ImagesTouching(x1, y1, img1, x2, y2, img2) {
  return !(x1 >= x2 + bumba.width || x1 + man.width <= x2 || y1 >= y2 + bumba.height || y1 + man.height <= y2);
}





function MyKeyDownHandler(MyEvent) {
  if (MyEvent.keyCode === 37 && man_x > 0) { 
    man_x -= 10;
  }
  if (MyEvent.keyCode === 39 && man_x + man.width < mansZimejums.width) {
    man_x += 10;
  }
  if (MyEvent.keyCode === 83) { // "s" restartē
    restart_game();
  }
}

addEventListener("keydown", MyKeyDownHandler);

function Do_a_Frame() {
  ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height); 

  ctx.fillStyle = "blue";
  ctx.font = "15px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("Time Remaining: " + Math.round(time_remaining), 10, 45); 

  if (time_remaining <= 0) { // pārbauda vai laiks beidzies
    gameOver = true;
    ctx.fillStyle = "red";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", mansZimejums.width / 2, mansZimejums.height / 2);
    ctx.font = "bold 20px Arial";
    ctx.fillText("Press S to play again", mansZimejums.width / 2, (mansZimejums.height / 2) + 50);
    ctx.textAlign = "left";
  } else {
    time_remaining -= 1 / FPS;

    bumba_y += bumba_speed; // bumba krīt
    if (bumba_y > mansZimejums.height) {
      bumba_y = 0; //restartē bumbu no paša sākuma
      bumba_x = Math.random() * (mansZimejums.width - bumba.width); // jauna x pozīcija
    }

    if (ImagesTouching(man_x, man_y, man, bumba_x, bumba_y, bumba)) {
      score++; 
      bumba_y = 0; // restartē bumbas pozīciju
      bumba_x = Math.random() * (mansZimejums.width - bumba.width); // jauna x pozīcija
    }

    // zīmē bildes
    ctx.drawImage(manImg, man_x, man_y, man.width, man.height);
    ctx.drawImage(bumbaImg, bumba_x, bumba_y, bumba.width, bumba.height);
  }

  if (!gameOver) {
    requestAnimationFrame(Do_a_Frame); // atkārto animāciju
  }
}

// sāk spēles ciklu
restart_game(); // restartē spēli no sākuma
Do_a_Frame(); // sāk animācijas ciklu