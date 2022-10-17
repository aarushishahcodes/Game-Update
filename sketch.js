// declaring global variables (involving icons and images)
var blueberries, health, blueberriesImg, healthImg;
var girlZombie, boyZombie, girlZombieImg, boyZombieImg;
var player, playerImg;
var bg, bgImg;
var gameState = 1;

// preloading images for the game
function preload() {
  blueberriesImg = loadImage("assets/blueberries.jpeg");
  healthImg = loadImage("assets/healthboosters.png");
  girlZombieImg = loadImage("assets/girlzombie.png");
  boyZombieImg = loadImage("assets/boyzombie.png");
  playerImg = loadImage("assets/singularplayer.png");
  bgImg = loadImage("assets/bg.jpg");

  // optional/secondary choice for background
  // var background = loadImage("bg.2.webp");
}

// setting up game's default
function setup() {
  createCanvas(displayWidth, displayHeight);
  bg = createSprite(width/2,height/2);
  bg.addImage("forest",bgImg);

  player = createSprite(300,300);
  player.addImage("player",playerImg);
  player.scale = 0.3;
  
  healthGroup = createGroup();
  blueberryGroup = createGroup();
  boyZombieGroup = createGroup();
  girlZombieGroup = createGroup();
}

function draw() {
  background("black");
  
  if(gameState === "play"){

    // navigation for player's journey
    if(keyDown("RIGHT_ARROW")){
      player.x += 5;
    }
    if(keyDown("LEFT_ARROW")){
      player.x -= 5;
    }
    if(keyDown("UP_ARROW")){
      player.velocityY = -10;
    }
  
    // conditions if player hits blueberries or zombies
    player.velocityY += 0.3;
    if (player.isTouching (boyZombieGroup) || player.isTouching (girlZombieGroup) || player.isTouching (blueberryGroup)){
      gameState = "end";
    }

    spawnObjects();
    drawSprites();

  }

  // end state involving sweet alert
  if(gameState === "end"){
    textSize(44);
    fill("pink");
    text("Game Over!",190,300);
  }
}

// creating a function to spawn zombies, blueberries, and health boosters
function spawnObjects(){
  if(frameCount % 160 === 0){
  
    girlZombie = createSprite(random(100,width-100),(random(100,height-100)));
    girlZombie.addImage("girl", girlZombieImg);
    girlZombieGroup.add (girlZombie);
    girlZombie.lifetime = 50;

    boyZombie = createSprite(random(100,width-100),(random(100,height-100)));
    boyZombie.addImage("boy", boyZombieImg);
    boyZombieGroup.add (boyZombie);
    boyZombie.lifetime = 50;

    blueberries = createSprite(random(100,width-100),(random(100,height-100)));
    blueberries.add (invisibleBlock);
    ghost.depth = invisibleBlock.depth +1;
  }

}
