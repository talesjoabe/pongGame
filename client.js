var socket;

p1y = 0;
p2y = 0;
vel = 4;

score1 = 0;
score2 = 0;

px_b = 75;
py_b = 32;

var bx_speed = -6;
var by_speed = -6;
var level = 3;

let segundos = 0;
let minutos = 0;
var start = false;
var win = false;

function tela_win() {
  fill(255, 255, 255);
  text('RESTART', 350, height / 2 + 200);
  text('EXIT', 650, height / 2 + 200);
  if (mouseIsPressed) {
    if (
      mouseX >= 350 &&
      mouseX <= 350 + 220 &&
      mouseY >= height / 2 + 160 && mouseY <= height / 2 + 200
    ) {
      win = false;
      score1 = 0;
      score2 = 0;
      minutos = 0;
      segundos = 0;
    }
    if (
      mouseX >= 650 &&
      mouseX <= 650 + 110 &&
      mouseY >= height / 2 + 160 && mouseY <= height / 2 + 200
    ) {
      remove();
    }
  }
}

function setup() {
  createCanvas(1200, 940);
  bg = loadImage(
    'https://raw.githubusercontent.com/talesjoabe/pongGame/master/background2.png'
  );

  // socket de comunicação com o server
  socket = io.connect('http://localhost:3000');
  socket.on('recv', newDrawing);
}

function newDrawing(data) {
  noStroke();

  if (data == 'as') {
    // amarelo - sobe
    p1y = p1y - vel;
  } else if (data == 'ad') {
    // amarelo - desce
    p1y = p1y + vel;
  } else if (data == 'vs') {
    // vermelho - sobe
    p2y = p2y - vel;
  } else if (data == 'vd') {
    // vermelho - desce
    p2y = p2y + vel;
  } else {
    var directionx;
    var directiony;
    bx_speed < 0 ? (directionx = -1) : (directionx = 1);
    by_speed < 0 ? (directiony = -1) : (directiony = 1);
    vel = data / 25;
    var s = data / 25;

    if (bx_speed != 2 && bx_speed != -2 && s > 0 && s < 1) {
      bx_speed = 2 * directionx;
      by_speed = 2 * directiony;
      level = 1;
    } else if (bx_speed != 4 && bx_speed != -4 && s > 1 && s < 2) {
      bx_speed = 4 * directionx;
      by_speed = 4 * directiony;
      level = 2;
    } else if (bx_speed != 6 && bx_speed != -6 && s > 2 && s < 3) {
      bx_speed = 6 * directionx;
      by_speed = 6 * directiony;
      level = 3;
    } else if (bx_speed != 8 && bx_speed != -8 && s > 3 && s < 4) {
      bx_speed = 8 * directionx;
      by_speed = 8 * directiony;
      level = 4;
    } else if (bx_speed != 10 && bx_speed != -10 && s > 4 && s < 5) {
      bx_speed = 10 * directionx;
      by_speed = 10 * directiony;
      level = 5;
    } else if (bx_speed != 12 && bx_speed != -12 && s > 5 && s < 6) {
      bx_speed = 12 * directionx;
      by_speed = 12 * directiony;
      level = 6;
    } else if (bx_speed != 14 && bx_speed != -14 && s > 6 && s < 7) {
      bx_speed = 14 * directionx;
      by_speed = 14 * directiony;
      level = 7;
    } else if (bx_speed != 16 && bx_speed != -16 && s > 7 && s < 8) {
      bx_speed = 16 * directionx;
      by_speed = 16 * directiony;
      level = 8;
    } else if (bx_speed != 18 && bx_speed != -18 && s > 8 && s < 9) {
      bx_speed = 18 * directionx;
      by_speed = 18 * directiony;
      level = 9;
    } else if (bx_speed != 20 && bx_speed != -20 && s > 9 && s < 10) {
      bx_speed = 20 * directionx;
      by_speed = 20 * directiony;
      level = 10;
    }
    // console.log(s);
  }
}

function counting_time() {
  if (frameCount % 60 == 0) {
    if (segundos < 60) {
      segundos++;
    }
    if (segundos == 60) {
      segundos = 0;
      minutos++;
    }
  }
}

function draw() {
  background(bg);
  if (start == false) {
    textSize(100);
    fill(255, 255, 255);
    text('START', 450, height / 2);
    if (mouseIsPressed) {
      if (
        mouseX >= 450 &&
        mouseX <= 450 + 300 &&
        mouseY >= height / 2 - 60 && mouseY <= height / 2
      ) {
        start = true;
      }
    }
  } else {
    if (score1 == 21) {
      win = true;
      fill(255, 255, 255);
      textSize(50);
      text('JOGADOR 1 GANHOU!!!', 325, height / 2);
      tela_win();
    }
    if (score2 == 21) {
      win = true;
      fill(255, 255, 255);
      textSize(50);
      text('JOGADOR 2 GANHOU!!!', 325, height / 2);
      tela_win();
    }
    if (win == false) {
      fill(0);
      rect(-1, 800, 1250, 900);

      Score();
      fill(255, 204, 0);
      rect(0, p1y, 20, 150);

      fill(255, 0, 0);
      rect(1180, p2y, 20, 150);

      fill(255, 255, 255);
      ellipse(px_b, py_b, 25, 25);

      moveBall();
      movePlayers();
      bounce();
    }
  }
}

function movePlayers() {
  if (p1y >= 0 && p1y <= 800 - 150) {
    if (keyIsDown(UP_ARROW)) p1y = p1y - vel;
    else if (keyIsDown(DOWN_ARROW)) p1y = p1y + vel;
  } else if (p1y < 0) p1y = 0;
  else p1y = 650;

  if (p2y >= 0 && p2y <= 800 - 150) {
    if (keyIsDown(87)) p2y = p2y - vel;
    else if (keyIsDown(83)) p2y = p2y + vel;
  } else if (p2y < 0) p2y = 0;
  else p2y = 650;
}

function Score() {
  textSize(24);
  fill(255, 204, 0);
  text(' Jogador 1: ' + score1, 20, 925);
  fill(255, 0, 0);
  text('Jogador 2: ' + score2, 1000, 925);
  fill(255, 255, 255);
  text('DIFICULDADE: ' + level, 500, 870);
  counting_time();
  fill(255, 255, 255);
  text('TEMPO ' + minutos + ':' + segundos, 500, 900);
}

function moveBall() {
  px_b += bx_speed;
  py_b += by_speed;
}

function bounce() {
  if (py_b < 10 || py_b > 800 - 25) {
    by_speed *= -1;
  }

  if (py_b >= p1y && py_b <= p1y + 150 && px_b <= 25) {
    bx_speed *= -1;
    if (Math.random > 0.5) {
      by_speed *= -1;
    }
  } else if (px_b <= 0) {
    px_b = 50;
    py_b = p1y + 75;
    score2++;
    socket.emit('ponto2', score2);
  }

  if (py_b >= p2y && py_b <= p2y + 150 && px_b >= 1185) {
    bx_speed *= -1;
    if (Math.random > 0.5) {
      by_speed *= -1;
    }
  } else if (px_b >= 1200) {
    px_b = 1150;
    py_b = p2y + 75;
    score1++;
    socket.emit('ponto1', score1);
  }
}
