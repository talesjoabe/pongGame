p1y = 0;
p2y = 0;
vel = 5;

score1 = 0;
score2 = 0;

px_b = 75;
py_b = 32;

var bx_speed = -4;
var by_speed = -4;

function setup() {
  createCanvas(1200, 850);
  bg = loadImage(
    'https://raw.githubusercontent.com/talesjoabe/pongGame/master/background2.png'
  );
}

function draw() {
  background(bg);

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

function movePlayers() {
  if (p1y >= 0 && p1y <= 800 - 150) {
    if (keyIsDown(UP_ARROW)) p1y = p1y - vel;
    else if (keyIsDown(DOWN_ARROW)) p1y = p1y + vel;
  } else if (p1y < 0) p1y = 650;
  else p1y = 50;

  if (p2y >= 0 && p2y <= 800 - 150) {
    if (keyIsDown(87)) p2y = p2y - vel;
    else if (keyIsDown(83)) p2y = p2y + vel;
  } else if (p2y < 0) p2y = 650;
  else p2y = 50;
}

function Score() {
  textSize(24);
  fill(255, 204, 0);
  text(' Jogador 1: ' + score1, 20, 825);
  fill(255, 0, 0);
  text('Jogador 2: ' + score2, 1000, 825);
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
  }
}
