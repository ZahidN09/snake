let largoSnake = 4;
let snake = [];
let snakeX = 0;
let snakeY = 0;

let velocidadActual = 400;
let flag = 0;

function iniciar() {
    puntaje = 0;
    mostarEnSpan("txtPuntaje", puntaje);
    largoSnake = 4;
    snake = [];
    velocidadActual = 400;
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
    if (flag > 1) {
        clearInterval(intervalo);
        flag = 1;
    }
    limpiarCanva();
    iniciar();
    direccion = "R";
    siguienteDireccion = "R";
    intervalo = setInterval(moverSnake, velocidadActual);
}