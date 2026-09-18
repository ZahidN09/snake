let largoSnake = 3;
let snake = [];
let snakeX = 0;
let snakeY = 0;

let velocidadActual = 500;

function iniciar() {
    snakeX = POS_INIT_X;
    snakeY = POS_INIT_Y;
    for (let i = 0; i <= largoSnake - 1; i++) {
        snake[i] = [snakeX - (i * LADO_CUADRADO), snakeY];
    }
    dibujarSnake();
    dibujarComida();
}

function start() {
    intervalo = setInterval(moverSnake, velocidadActual);
}