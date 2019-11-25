p1x=0;
p2x=0;
vel=5;

px_b=75;
py_b=32;


function setup() {
  createCanvas(1000, 1000);
   bg = loadImage('https://raw.githubusercontent.com/talesjoabe/pongGame/master/background.png');
}

function draw() {
  background(bg);

  fill(51, 102, 204);
  rect(p1x,0,150,20);

  fill(255, 0, 0);
  rect(p2x,980,150,20);

  fill(255,255,255);
  ellipse(px_b,py_b,25,25);


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
