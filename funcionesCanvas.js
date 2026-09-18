let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const COLOR_SNAKE = "#2cac12";
const LADO_CUADRADO = 25;
const POS_INIT_X = Math.floor((canvas.width - LADO_CUADRADO) / 2);
const POS_INIT_Y = Math.floor((canvas.height - LADO_CUADRADO) / 2);

let largoSnake = 3;
let snakeX = 0;
let snakeY = 0;

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarRectangulo(X, Y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(X, Y, ancho, alto);
}

function dibujarSnake() {
    snakeX = POS_INIT_X;
    snakeY = POS_INIT_Y;
    for (let i = 1; i <= largoSnake; i++) {
        dibujarRectangulo(snakeX,snakeY,LADO_CUADRADO,LADO_CUADRADO,COLOR_SNAKE);
        snakeX = snakeX - LADO_CUADRADO;
    }
}