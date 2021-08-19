// variáveis do jogo
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random()* 15 + 1) * box,
    y: Math.floor(Math.random()*15 + 1) * box
}
let score = 0;

//Alteração constante do placar
document.getElementById("score").innerHTML = score;

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  }
  setInterval(function() {
    var script = document.createElement("script");
    script.src = "require.js";
    document.getElementsByTagName("body")[0].insertBefore(script, document.getElementsByTagName("body")[0].childNodes[0]);
    document.getElementsByTagName("script")[0].remove();
    document.getElementById("score").innerHTML = score;
  }, 100)

//background
function criarBG() {
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box )
}

//função da cobrinha() 
function criarCobrinha(){
   for(i=0; i<snake.length; i++) {
       context.fillStyle = "green"
       context.fillRect(snake[i].x, snake[i].y, box, box);
   }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//função das teclas;
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 65 && direction != "right") direction = "left";
    if(event.keyCode == 87 && direction != "down") direction = "up";
    if(event.keyCode == 68 && direction != "left") direction = "right";
    if(event.keyCode == 83 && direction != "up") direction = "down"; 
}

function iniciarJogo(){
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; 
  if(snake[0].y > 15 * box && direction == "down") snake [0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++) {
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
          clearInterval(jogo);
          alert("Game Over :c")
          alert("Sua pontuação foi de: " + score + " pontos");
      }
  }


  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == 'right') snakeX += box;
  if(direction == 'left') snakeX -= box;
  if(direction == 'up') snakeY -= box;
  if(direction == 'down') snakeY +=box;

  if(snakeX != food.x || snakeY != food.y) {
      snake.pop();
  }else {
      food.x = Math.floor(Math.random()* 15 + 1) * box;
      food.y = Math.floor(Math.random() * 15 + 1) * box;
      score += 1;
  }

  let newHead = {
      x: snakeX,
      y: snakeY
  }
  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
