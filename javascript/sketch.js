let canvas;
let button;
let slider;

let displayState = 0;
const eyeSize = 200;
const eyeBallSize = 50;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  rectMode(CENTER);

  addGUI();

  left = new eyes(width/2 - 70);
  right = new eyes(width/2 + 70);
}

function draw() {
  background(50,100,250);
  
  noStroke();
  fill(slider.value());

  if(displayState == 0){
    circle(width/2,height/2,width/6);
  }else{
    rect(width/2,height/2,width/6,width/6);
  }
  rectMode(CENTER);
  fill(245, 224, 80);
  rect(width/2, height/2, width, height); 
  noStroke();
  fill(30);
  
  ellipse(width/2 , height/2, 90, 90);
  fill(30);
  ellipse(width/2 , height/2, 110, 110);
  fill(245, 224, 80);
  ellipse(width/2 + 70, height/2, 90, 90);
  rectMode(CENTER);
  fill(30);
  rect(width/2, height/2 -200, 40, 20);
  if (left.click == 1 && left.sizeY > 0) {
    left.sizeY -= 2;
    if (left.sizeY <= 0) left.click = 2;
  }
  if (left.click == 2 && left.sizeY <= eyeBallSize) {
    left.sizeY += 2;
  }
  if (left.click == 2 && left.sizeY >= eyeBallSize) 
  {
    //left.sizeY = eyeBallSize;
    left.click = 0;
  }
  if (right.click == 1 && right.sizeY > 0) {
    right.sizeY -= 2;
    if (right.sizeY <= 0) right.click = 2;
  }
  if (right.click == 2 && right.sizeY <= eyeBallSize) {
    right.sizeY += 2;
  }
  if (right.click == 2 && right.sizeY >= eyeBallSize) 
  {
    right.sizeY = eyeBallSize;
    right.click = 0;
  }
  left.drawEyes();
  right.drawEyes();
  let a = atan2(mouseY-height/2, mouseX-width/2);
  let length = dist(mouseX, mouseY, width/2, height/2)/15;
  left.rotate(a, length);
  right.rotate(a, length);
}

function addGUI()
{
  //add a slider
  slider = createSlider(0, 255, 100);
  slider.addClass("slider");
  //Add the slider to the parent gui HTML element
  slider.parent("gui-container");

  //add a button
  if(displayState == 0)
  {
      button = createButton("Change to Square");
  }else if(displayState == 1){
      button = createButton("Change to Circle");
  }

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
    
  if(displayState < 1)
  {
    displayState++;
  }else{
    displayState = 0;
  }

  if(displayState == 0)
  {
      button.html("Change to Square");
  }else if(displayState == 1){
      button.html("Change to Circle");
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}
function mouseClicked()
{
  left.blink();
  right.blink();
  //console.log("CLicked");
}

let eyes = function(x)
{
  this.click = 0;
  this.x = x;
  this.y = height/2 -200;
  this.xb = x;
  this.yb = height/2 -200;
  this.sizeX = eyeBallSize;
  this.sizeY = eyeBallSize;
  this.drawEyes = function() {
    fill(255);
  	ellipse(this.x, height/2-200, eyeSize, eyeSize);
    fill(0);
    ellipse(this.xb, this.yb, this.sizeX, this.sizeY);
  }
  this.rotate = function(angle, length)
  {
    //console.log(angle, " ", length);
    if (length < 20) this.xb = this.x + cos(angle)*length;
    else this.xb = this.x + cos(angle)*30;
    if (length < 20) this.yb = this.y + sin(angle)*length;
    else this.yb = this.y + sin(angle)*30;
    if (this.xb > this.x + 30 || this.xb < this.x - 30) this.xb = this.x + cos(angle)*30;
    if (this.yb > this.y + 30 || this.yb < this.y - 30) this.yb = this.y + sin(angle)*30;
  }
  this.blink = function() {
    this.click = 1;
  }
}