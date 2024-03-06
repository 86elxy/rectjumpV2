let rectX,rectY    //player attributes
const rectWidth = 50
let rectYvel = 0
let jumpForce = -8.5
let floating = false
let standing = true
const gravity = 0.25

let squareX, squareY,squareWidth  //object attributes
const squareWidthStart = 35
let squareXvel = 3

let standingCollide = false
let notStandingCollide = false
let count = 0
let highest = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  rectX = 80 ; rectY = height*3/4-rectWidth*2
  squareWidth = random(0.8,1.2)*squareWidthStart
  squareX = width ; squareY = height*3/4-squareWidth
}

function draw() {
  background('lightblue');
  
  //check standing
  if(touches.length == 2 || (keyIsPressed && key=='s')){
    standing = false
  }
  else{
    standing = true
  }
  
  //check landed
  if(rectY > height*3/4-rectWidth*2){
    
    rectYvel = 0
    floating = false
    rectY = height*3/4-rectWidth*2
  }
  else{
    rectYvel += gravity
  }
  
  //update positions
  rectY += rectYvel
  squareX -= squareXvel
  
  //display objects
  strokeWeight(0)
  fill('salmon')
  if(!standing){
    rectY = height*3/4-rectWidth
    rect(rectX,rectY,rectWidth*2,rectWidth,10)
  }
  else{
    rect(rectX,rectY,rectWidth,rectWidth*2,10)
  }
  fill('violet')
  rect(squareX,squareY,squareWidth,squareWidth,5)
  //line(0,height*3/4,width,height*3/4)
  fill('lightgreen')
  rect(0,height*3/4,width,height/4)
  
  //Hi-Score
  fill(0)
  textAlign(CENTER)
  textSize(30)
  textFont('Micro 5')
  text('Hi-Score: '+str(highest),width/2,50)
  
  //game rule
  text('keyboard: \'w\' to jump, \'s\' to duck',width/2,height-100)
  text('touch screen: tap to jump, double touch to duck',width/2,height-70)
  
  //restart button
  push()
  fill('rgb(219,219,118)')
  rectMode(CENTER)
  rect(width/2,height-25,80,40,10)
  fill(0)
  textFont('Micro 5')
  textSize(30)
  textAlign(CENTER)
  text('restart',width/2,height-18)
  pop()
  
  
  //"spawn" new square
  if(squareX <= 0-squareWidth){
    squareX = width
    squareXvel = random([2.8,3.2,3.5,3.8,4,4.2,5])
    squareWidth = floor(random(0.7,1.2)*squareWidthStart)
    if(random()<0.5){
      squareY = height*3/4-squareWidth
    }
    else{
      squareY = height*3/4-squareWidth-rectWidth-10
    }
    
    count++    
  }
  
  //detect collision
  standingCollide = rectX+rectWidth>squareX && rectY+rectWidth*2>squareY && rectX<squareX+squareWidth
  
  notStandingCollide = rectX+rectWidth*2>squareX && rectX<squareX+squareWidth && rectY+rectWidth>squareY && rectY<squareY+squareWidth
  
  if((!standing && notStandingCollide) || (standing && standingCollide)){
    noLoop()
    fill(0)
    textFont('Micro 5')
    textAlign(CENTER)
    textSize(40)
    text('You dodged '+str(count)+' squares',width/2,height/2)
    if(highest < count){
      highest = count
    }
  }
  
}

function keyPressed(){
  if(key == 'w' && !floating){
    rectYvel += jumpForce
    floating = true
  }
}

function mousePressed(){
  // if(!floating || touches.length == 1){
  //   rectYvel += jumpForce
  //   floating = true
  // }
  if(mouseX > width/2-40 && mouseX < width/2+40 && mouseY > height-18-20 && mouseY < height-18+20){
    count = 0
    squareXvel = 3.5
    rectX = 80 ; rectY = height*3/4-rectWidth
    squareWidth = random(0.8,1.2)*squareWidthStart
    squareX = width ; squareY = height*3/4-squareWidth
    loop()
  }
}

function touchStarted(){
  if(!floating){
    rectYvel += jumpForce
    floating = true
  }
  if(mouseX > width/2-40 && mouseX < width/2+40 && mouseY > height-18-20 && mouseY < height-18+20){
    count = 0
    squareXvel = 3.5
    rectX = 80 ; rectY = height*3/4-rectWidth
    squareWidth = floor(random(0.8,1.2)*squareWidthStart)
    squareX = width ; squareY = height*3/4-squareWidth
    loop()
  }
}
