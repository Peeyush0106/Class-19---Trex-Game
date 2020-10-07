var trex, trex_running, edges, trexCollided;
var groundImage, ground, invisibleGround;
var score = 0;
var cloud, cloudImage, obstacle, cloudImageNumber, clouds;
var obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6, obstacleImageNumber, obstacles;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var reset, resetButton;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  trexCollided = loadAnimation("trex_collided.png");
  resetButton = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollided);
  ground = createSprite(200, 175);
  ground.addImage(groundImage);
  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = false;
  edges = createEdgeSprites();
  clouds = createGroup();
  obstacles = createGroup();
  
  reset = createSprite(300, 100);
  reset.addImage("reset", resetButton);
  reset.visible = false;

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
}


function draw() {
  //set background color 
  background(160);
  
  
  if(gameState === PLAY)
  {
    spawnClouds();
    spawnObstacles();

    score += Math.round(frameRate()/50);

    ground.velocityX = -(1 + (score / 10));

    //logging the y position of the trex
    // console.log(trex.y)

    //reset the ground
    if (ground.x < 200) {
      ground.x = ground.width / 2;
    }


    //jump when space key is pressed
    if (keyDown("space") || keyDown("up")) {
      if (trex.y > 160) {
        trex.velocityY = -10;
      }
    }
    
    trex.velocityY = trex.velocityY + 0.5;
    if(obstacles.isTouching(trex))
    {
      gameState = END;
    }
  }

  if(gameState === END)
  {
      console.log(mousePressedOver(reset));
      obstacles.setLifetimeEach(-1);
      clouds.setLifetimeEach(-1);
      obstacles.setVelocityEach(0, 0);
      clouds.setVelocityEach(0, 0);
      trex.setVelocity(0, 0);
      trex.changeAnimation("collided", trexCollided);
      ground.velocityX = 0;
      fill("black");
      textSize(20);
      text("Game Over!", 245, 60);
      reset.visible = true;
    
      if(mousePressedOver(reset))
      {
        restart();
      }
  }
      

  trex.collide(invisibleGround);
  
  drawSprites();
  fill("black");
  textSize(14);
  text("Score: " + score, 500, 70);  
}

function restart()
{
  gameState = PLAY;
  obstacles.destroyEach();
  clouds.destroyEach();
  trex.changeAnimation("running", trex_running);
  reset.visible = false;
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloudY = random(80, 110);
    cloud = createSprite(620, cloudY);
    cloud.addImage(cloudImage);
    cloud.scale = random(0.4, 0.7);
    cloud.setVelocity(random(-5, -8), random(-2.3, 0));
    clouds.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacleImageNumber = Math.round(random(1, 6));
    obstacle = createSprite(620, 165);
    switch(obstacleImageNumber)
    {
      case 1 : obstacle.addImage(obstacleImage1);
      break;
      case 2 : obstacle.addImage(obstacleImage2);
      break;
      case 3 : obstacle.addImage(obstacleImage3);
      break;
      case 4 : obstacle.addImage(obstacleImage4);
      break;
      case 5 : obstacle.addImage(obstacleImage5);
      break;
      case 6 : obstacle.addImage(obstacleImage6);
      break;
      default : break;
    }
    obstacle.scale = 0.5;
    obstacle.setVelocity(-6, 0);
    obstacles.add(obstacle);
    obstacle.lifetime = 110;
  }
}
