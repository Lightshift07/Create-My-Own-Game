var gamestate = "play";

var bgImg, playerImg, playerImg2, enemyImg
var ground
var player, enemy
var enemyGroup
var restartImg, restart
var lives = 3;


function preload(){
bgImg = loadImage("space.png");
playerImg = loadAnimation("player2.png");
playerImg2 = loadAnimation("player.png");
enemyImg = loadImage("enemy.png");
restartImg = loadImage("restart.png");
}
function setup(){
createCanvas(1100, 400);
ground = createSprite(500, 150, 1000, 5);
ground.addImage(bgImg);
ground.scale = 1.5

player = createSprite(150, 200, 50, 50);
player.addAnimation("rocket", playerImg);
player.addAnimation("move", playerImg2);
player.scale = 0.6;

restart = createSprite(550,200);
restart.addImage(restartImg);
restart.visible =  false;

enemyGroup = new Group();
}
function draw(){
  
  background("black")
  
  player.changeAnimation("rocket", playerImg)

  if (gamestate === "play"){
    if (keyDown("up")){
      player.y = player.y - 3;
      player.changeAnimation("move", playerImg2)
    }
    
    if (keyDown("down")){
      player.y = player.y + 3;
      player.changeAnimation("move", playerImg2)
    }
    
    if (keyDown("right")){
      player.x = player.x + 3;
      player.changeAnimation("move", playerImg2)
    }
    
    if (keyDown("left")){
      player.x = player.x - 3;
    }
    
    if (ground.x < 250){
      ground.x = 500;
    }
    ground.velocityX = -2.5
   
    enemyGroup.setColliderEach("rectangle", 0, 0, 50, 60);
 
    spawnEnemy();
 
  if (player.isTouching(enemyGroup)){
   gamestate = "hit";
   lives = lives - 1;
   enemyGroup.setLifetimeEach(0);
  }
  }
  else if (gamestate === "hit"){
   if (lives > 0 ){
     player.x = 150;
     player.y = 200;
     gamestate = "play";
   }
   if (lives === 0){
     gamestate = "end";
     enemyGroup.setVelocityXEach(0);
   }
  }
  else if (gamestate === "end"){
    ground.velocityX = 0;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  else if (gamestate === "win"){
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }
  }

drawSprites();

fill("red");
text("Lives:" + lives, 30,30);
}

function spawnEnemy() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    enemy = createSprite(1100,120,40,10);
    enemy.y = Math.round(random(50,350));
    enemy.addImage(enemyImg);
    enemy.scale = 0.09;
    enemy.velocityX = -7;
    enemy.lifetime = 600;
    enemyGroup.add(enemy);
  }
  
}
function reset() {
  gamestate = "play";
  restart.visible = false;
  lives = 3;
  player.x = 150;
  player.y = 200;
}