let velocidad = 200;

function iniciar(){
    snakeX = POS_INIT_X;
    snakeY = POS_INIT_Y;
    dibujarSnake();
}

function start(){
    intervalo = setInterval(moverSnake, velocidad);
}