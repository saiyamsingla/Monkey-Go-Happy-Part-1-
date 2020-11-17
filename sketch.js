
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  obstacleGroup=new Group();
  FoodGroup=new Group();

}


function draw() {
  background(220);
  
  if(gameState===PLAY){
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    
  if(keyDown("space")&&monkey.y>=250){
    monkey.velocityY=-12;
  }
 
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  food();
  spawnObstacles();
    
 survivalTime=Math.ceil(frameCount/frameRate());
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  else if(gameState===END){
    ground.velocityX=0;
    monkey.velocityY=0;
    monkey.collide(ground);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  

  drawSprites();
  
  text("Survival Time= " + survivalTime,150,50);

}

function food(){ 
if(frameCount % 80===0){
  banana=createSprite(200,200,20,20);
  banana.y=Math.round(random(120,250));
  banana.velocityX=-4;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  FoodGroup.add(banana);
  FoodGroup.setLifetimeEach(100);
}
}

function spawnObstacles(){ 
if(frameCount % 100===0){
 obstacle=createSprite(350,325,20,20);
 obstacle.addImage("obstacles",obstacleImage);        obstacle.velocityX=-5;
 obstacle.scale=0.1;
 obstacleGroup.add(obstacle);
  obstacleGroup.setLifetimeEach(80);
}
}





