var canvas;
var backgroundImage, bgImg, animal1_img, animal2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, animal1, animal2,bush, grass;
var animals = [];
var bushImage, grassImage;
//BP
function preload() {
  backgroundImage = loadImage("background.jpg");
  animal1_img = loadImage("animal1.png");
  animal2_img = loadImage("animal2.png");
  track = loadImage("track.png");
  bushImage = loadImage("bush.png");
 grassImage = loadImage("grass.png");
}

//BP
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
 
}

//BP
function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
