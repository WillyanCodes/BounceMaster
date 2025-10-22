let x, y;           // posição da bolinha
let a, b;           // posição da barra
let velocidade = 5;
let pontos = 10;
let velx, vely;
let gameOver = false;
let perdeuPonto = false; // controla se já perdeu ponto ao tocar o fundo

function setup() {
  createCanvas(700, 700);
  a = width / 2;
  b = height - 200;

  x = width / 2;
  y = height / 2;

  // Inicia a bolinha apontando pra cima ou lateral
  velx = random(-10, 10);
  vely = random(-10, -5); // sempre pra cima no começo
}

function draw() {
  background("black");

  if (!gameOver) {
    // Movimento da bolinha
    fill("white");
    circle(x, y, 50);

    x += velx;
    y += vely;

    // Rebater nas laterais
    if (x < 25) {
      x = 25;
      velx *= -1;
    }
    if (x > width - 25) {
      x = width - 25;
      velx *= -1;
    }

    // Rebater no topo
    if (y < 25) {
      y = 25;
      vely *= -1;
    }

    // Barra
    fill("white");
    rect(a, b, 100, 10);

    if (keyIsDown(LEFT_ARROW)) a -= velocidade;
    if (keyIsDown(RIGHT_ARROW)) a += velocidade;

    // Colisão com a barra (só descendo)
    if (x > a && x < a + 100 && y + 25 >= b && y - 25 <= b && vely > 0) {
      y = b - 25; // evita atravessar a barra
      vely *= -1;
      pontos++;
      perdeuPonto = false; // reseta controle para poder perder ponto no próximo fundo
    }

    // Perde ponto ao tocar no fundo (1 vez por descida)
    if (y + 25 >= height) {
      if (!perdeuPonto) {
        pontos--;       // diminui 1 ponto
        perdeuPonto = true;
      }
      y = height - 25;  // reposiciona para não atravessar
      vely *= -1;       // sempre rebate
    } else if (y + 25 < height - 50) {
      // reseta a flag quando sobe o suficiente para descer de novo
      perdeuPonto = false;
    }

    // Verifica game over
    if (pontos < 0) {
      gameOver = true;
    }

    // Pontuação
    fill("red");
    textSize(24);
    textAlign(LEFT, TOP);
    text("PONTOS: " + pontos, 10, 10);

  } else {
    // Tela de Game Over
    fill("white");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Você Perdeu!", width / 2, height / 2 - 50);

    // Botão de reiniciar
    fill("green");
    rect(width / 2 - 75, height / 2 + 10, 150, 50);
    fill("white");
    textSize(24);
    text("Jogar de Novo", width / 2, height / 2 + 35);
  }
}

function mousePressed() {
  if (gameOver) {
    // verifica se clicou no botão
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 + 10 &&
      mouseY < height / 2 + 60
    ) {
      // reinicia o jogo
      pontos = 0;
      x = width / 2;
      y = height / 2;
      velx = random(-10, 10);
      vely = random(-10, -5);
      gameOver = false;
      perdeuPonto = false;
    }
  }
}let x, y;           // posição da bolinha
let a, b;           // posição da barra
let velocidade = 5;
let pontos = 10;
let velx, vely;
let gameOver = false;
let perdeuPonto = false; // controla se já perdeu ponto ao tocar o fundo

function setup() {
  createCanvas(700, 700);
  a = width / 2;
  b = height - 200;

  x = width / 2;
  y = height / 2;

  // Inicia a bolinha apontando pra cima ou lateral
  velx = random(-10, 10);
  vely = random(-10, -5); // sempre pra cima no começo
}

function draw() {
  background("black");

  if (!gameOver) {
    // Movimento da bolinha
    fill("white");
    circle(x, y, 50);

    x += velx;
    y += vely;

    // Rebater nas laterais
    if (x < 25) {
      x = 25;
      velx *= -1;
    }
    if (x > width - 25) {
      x = width - 25;
      velx *= -1;
    }

    // Rebater no topo
    if (y < 25) {
      y = 25;
      vely *= -1;
    }

    // Barra
    fill("white");
    rect(a, b, 100, 10);

    if (keyIsDown(LEFT_ARROW)) a -= velocidade;
    if (keyIsDown(RIGHT_ARROW)) a += velocidade;

    // Colisão com a barra (só descendo)
    if (x > a && x < a + 100 && y + 25 >= b && y - 25 <= b && vely > 0) {
      y = b - 25; // evita atravessar a barra
      vely *= -1;
      pontos++;
      perdeuPonto = false; // reseta controle para poder perder ponto no próximo fundo
    }

    // Perde ponto ao tocar no fundo (1 vez por descida)
    if (y + 25 >= height) {
      if (!perdeuPonto) {
        pontos--;       // diminui 1 ponto
        perdeuPonto = true;
      }
      y = height - 25;  // reposiciona para não atravessar
      vely *= -1;       // sempre rebate
    } else if (y + 25 < height - 50) {
      // reseta a flag quando sobe o suficiente para descer de novo
      perdeuPonto = false;
    }

    // Verifica game over
    if (pontos < 0) {
      gameOver = true;
    }

    // Pontuação
    fill("red");
    textSize(24);
    textAlign(LEFT, TOP);
    text("PONTOS: " + pontos, 10, 10);

  } else {
    // Tela de Game Over
    fill("white");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Você Perdeu!", width / 2, height / 2 - 50);

    // Botão de reiniciar
    fill("green");
    rect(width / 2 - 75, height / 2 + 10, 150, 50);
    fill("white");
    textSize(24);
    text("Jogar de Novo", width / 2, height / 2 + 35);
  }
}

function mousePressed() {
  if (gameOver) {
    // verifica se clicou no botão
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 + 10 &&
      mouseY < height / 2 + 60
    ) {
      // reinicia o jogo
      pontos = 0;
      x = width / 2;
      y = height / 2;
      velx = random(-10, 10);
      vely = random(-10, -5);
      gameOver = false;
      perdeuPonto = false;
    }
  }
}
