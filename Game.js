class Game {
  constructor() {
   

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    animal1 = createSprite(width / 2 - 50, height - 100);
    animal1.addImage(" animal1",  animal1_img);
    animal1.scale = 0.07;

    animal2 = createSprite(width / 2 + 100, height - 100);
    animal2.addImage(" animal2",  animal2_img);
    animal2.scale = 0.07;

    animals = [ animal1,  animal2];

    // C38 TA
    bush = new Group();
   grass = new Group();

    // Adicione o sprite de combustível ao jogo
    this.addSprites(bush, 4, bushImage, 0.02);

    // Adicione o sprite de moeda ao jogo
    this.addSprites(grass, 18, grassImage, 0.09);
  }

  // C38 TA
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    
    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    player.getanimalsAtEnd();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {

      image(track, 0, -height * 5, width, height * 6);
      this.showLeaderboard();

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        animals[index - 1].position.x = x;
        animals[index - 1].position.y = y;

        // C38  SA
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleBush(index);
          this.handleGrass(index);
    camera.position.x =    animals[index - 1].position.x;
          camera.position.y =    animals[index - 1].position.y;
          // Altere a posição da câmera na direção y
         }}
      
      
         const finshLine = height * 6 - 100;

         if (player.positionY > finshLine) {
           gameState = 2;
           this.update(gameState);
           //🟡😉🟡descomente e corrija um desses para aumentar a classificação de um jogador em 1 e atualizar no banco de dados.
           //
          //  player.rank += 1;
          //  player.updateanimalsAtEnd(player.rank);

          //  rank += 1;
          //  Player.updateanimalsAtEnd(rank);

          //  player.rank += 1;
          //  Player.updateanimalsAtEnd(player.rank);


           player.update();
           //this.showRank();
         } 
         if (keyIsDown(UP_ARROW)) {
          player.positionY += 10;
          player.update();
        }
         drawSprites();}}

  showLeaderboard() 
  {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    Esta tag é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

      // manipulação dos eventos do teclado
      


  handleBush(index) {
    // Adicione o combustível
    animals[index - 1].overlap(bush, function(collector, collected) {
      player.bush = 185;
      //collected (coletado) é o sprite no grupo de colecionáveis que desencadeia
      //o evento
      collected.remove();
    });
  }

  handleGrass(index) {
    animals[index - 1].overlap(grass, function(collector, collected) {
      //🟥🟥🟥🟥🟥🟥🟥🟥
      //Remova o comentário da linha de código correta entre essas 4, para aumentar a pontuação em 21 pontos.
      //player.score += 21;
      // score += 21;
      // player.score + 21;
      // player += 21;
      player.update();
      collected.remove();
    });
  }
}
