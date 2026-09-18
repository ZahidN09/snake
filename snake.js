let largoSnake = 3;
let snake = [];
let snakeX = 0;
let snakeY = 0;

let velocidadActual = 500;
let flag = 0;

function iniciar() {
    puntaje = 0
    mostarEnSpan("txtPuntaje", puntaje);
    largoSnake = 3;
    snake = [];
    velocidadActual = 500;
    snakeX = POS_INIT_X;
    snakeY = POS_INIT_Y;
    comidaX = POS_COMIDA_X;
    comidaY = POS_COMIDA_Y;
    for (let i = 0; i <= largoSnake - 1; i++) {
        snake[i] = [snakeX - (i * LADO_CUADRADO), snakeY];
    }
    dibujarSnake();
    dibujarComida();
}

function start() {
    flag = flag + 1;
    if(flag > 1){
        clearInterval(intervalo);
        flag = 1;
    }
    limpiarCanva();
    iniciar();
    intervalo = setInterval(moverSnake, velocidadActual);
}