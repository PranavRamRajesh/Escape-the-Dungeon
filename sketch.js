var player;
var ground;
var lawnImg;
var lawn;
var dragonWalkingImg;
var hunterImg;
var arrowImg;
var bombImg;
var startButton, startButtonImg;
var gameOver, gameOverImg;
var deathImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jumpSound,dieSound,scoreSound;

var score = 0;

// bring a start button pic, u win pic, u lost pic,win sound, lost sound, jump sound, 

function preload(){
   lawnImg = loadImage("lawn.jpg");
   dragonWalkingImg = loadAnimation("dragon/Walk1.png","dragon/Walk2.png","dragon/Walk3.png","dragon/Walk4.png","dragon/Walk5.png");
   hunterImg = loadAnimation("hunter/attack0.png","hunter/attack1.png","hunter/attack2.png","hunter/attack3.png","hunter/attack4.png");
   arrowImg = loadImage("hunter/arrow.png");
   bombImg = loadImage("hunter/bomb.png");
   gameOverImg = loadImage("hunter/Game_Over.png");
   startButtonImg = loadImage("hunter/start_button.png");
   deathImg = loadImage("dragon/death5.png");
   

   jumpSound = loadSound("sounds/jump.mp3");
   dieSound = loadSound("sounds/you_lose.mp3");
   scoreSound = loadSound("sounds/200_score.mp3");

   
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  lawn = createSprite(windowWidth/2,height-450,windowWidth,20);
  lawn.addImage(lawnImg);
  lawn.scale = 2.5;
  player = createSprite(200,300,20,20);
  player.addAnimation("run",dragonWalkingImg);
  player.addAnimation("death",deathImg);
  player.scale = 1.8;

  hunterGroup = new Group();

  gameOver = createSprite(width/2,height/2,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  player.setCollider("rectangle",0,0,player.width-100,player.height-150);
  ground = createSprite(windowWidth/2,height-20,windowWidth,20);
  ground.visible = false;
  lawn.x= lawn.width/2;
  lawn.velocityX =-4;
  
  
}

function draw() {
  background(255,255,255);  

  if(gameState===PLAY){
    if(lawn.x<0){
      lawn.x = lawn.width/2;
    }

    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space")){
      player.velocityY = -20;
      jumpSound.play();
      }

      if(score>0 && score%100===0){
        scoreSound.play();
      }


    player.velocityY = player.velocityY +0.8;
    player.collide(ground);
  
    spawnHunters();

    if(player.isTouching(hunterGroup)){
      gameState = END;
      dieSound.play();
    }
  }

  if (gameState=== END){
    lawn.velocityX = 0;
    hunterGroup.destroyEach();
    gameOver.visible = true;
    player.velocityX = 0;
    player.collide(ground);
    player.changeAnimation("death",deathImg);

  }
  
  drawSprites();

  fill("orange") 
  textSize(30)
  textStyle(BOLD)
  text ("SCORE : "+score,width-200,100);
}

function spawnHunters() {
  
  if (frameCount % 200 === 0) {
    var hunter = createSprite(width,height-100,40,10);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:hunter.addAnimation("hunter",hunterImg);
      hunter.scale = 2;
      break;

      case 2:hunter.addImage("arrow",arrowImg);
      hunter.scale = 0.3;
      break;

      case 3:hunter.addImage("bomb",bombImg);
      hunter.scale = 0.2
      hunter.y = height-50;
      break;

      
      default:break;
    }
    
    hunter.velocityX = -9;
    
  
    hunter.lifetime = Math.round(width/9);
    
    
    hunterGroup.add(hunter);
  }
  
}