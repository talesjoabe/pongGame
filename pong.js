p1x=0;
p2x=0;
vel=5;

score1=0;
score2=0;

px_b=75;
py_b=32;

var bx_speed = -4;
var by_speed = -4;


function setup() {
  createCanvas(1000, 1000);
   bg = loadImage('https://raw.githubusercontent.com/talesjoabe/pongGame/master/background.png');
}

function draw() {
  background(bg);
  Score();

  fill(51, 102, 204);
  rect(p1x,0,150,20);

  fill(255, 0, 0);
  rect(p2x,980,150,20);

  fill(255,255,255);
  ellipse(px_b,py_b,25,25);

  moveBall();
  movePlayers();
  bounce();

}

function movePlayers(){
  if(p1x>=0 && p1x<=850){
    if(keyIsDown(RIGHT_ARROW)) p1x=p1x+vel;
    else if(keyIsDown(LEFT_ARROW)) p1x=p1x-vel;
  }
  else if(p1x<=0) p1x=850;
  else p1x=0;

  if(p2x>=0 && p2x<=850){
    if(keyIsDown(68)&& p1x>=0 && p1x<=850) p2x=p2x+vel;
    else if(keyIsDown(65)&& p1x>=0 && p1x<=850) p2x=p2x-vel;
  }
  else if(p2x<=0) p2x=850;
  else p2x=0;
}

function Score(){
  fill(255);
  textSize(24);
  text(" Jogador 1: " + score1, 850, 20);
  text("Jogador 2: " + score2, 850, 980);
}

function moveBall() {
  px_b += bx_speed;
  py_b += by_speed;
}


function bounce() {
  if (px_b < 10 ||
    px_b > 1000 - 25) {
    bx_speed *= -1;
  }
  if(px_b>=p1x && px_b<= p1x+150 && py_b<=25 ){
      bx_speed*=-1;
      by_speed*=-1;
  }else if(py_b<=0){
    py_b=p2x+75;
    px_b=980;
    score2++;
  }
  if(px_b>=p2x && px_b<= p2x+150 && py_b>=985){
      bx_speed*=-1;
      by_speed*=-1;
  } else if(py_b>=1000){
    px_b=p1x+75;
    py_b=32;
    score1++;
  }
}
