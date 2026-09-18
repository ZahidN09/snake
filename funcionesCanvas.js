let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const COLOR_SNAKE = "#2cac12";
const COLOR_COMIDA = "#b30000";
const LADO_CUADRADO = 25;
const POS_INIT_X = 225;//Math.floor((canvas.width - LADO_CUADRADO) / 2);
const POS_INIT_Y = 225;//Math.floor((canvas.height - LADO_CUADRADO) / 2);
const DESPLAZAMIENTO = 25;
const POS_COMIDA_X = POS_INIT_X + 150;
const POS_COMIDA_Y = POS_INIT_Y;

let direccion = "R";
let direccion_new = "R";
let direccion_old = "R";

let comidaX = POS_COMIDA_X;
let comidaY = POS_COMIDA_Y;

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarRectangulo(X, Y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(X, Y, ancho, alto);
}

function dibujarSnake() {
    for (let i = 1; i <= snake.length; i++) {
        dibujarRectangulo(snake[i - 1][0], snake[i - 1][1], LADO_CUADRADO, LADO_CUADRADO, COLOR_SNAKE);
    }
}

function moverSnake() {
    let cambio_x = 0;
    let cambio_y = 0;

    limpiarCanva();
    if (direccion == "R") {
        cambio_x = 1;
        cambio_y = 0;
    } else if (direccion == "L") {
        cambio_x = -1;
        cambio_y = 0;
    } else if (direccion == "U") {
        cambio_x = 0;
        cambio_y = -1;
    } else if (direccion == "D") {
        cambio_x = 0;
        cambio_y = 1;
    }

    snake.unshift([snake[0][0] + cambio_x * DESPLAZAMIENTO, snake[0][1] + cambio_y * DESPLAZAMIENTO]);
    snake.pop();
    dibujarSnake();
    detectarColision();
    dibujarComida();
}

function moverDerecha() {
    direccion_new = "R";
    validarCambioDireccion();
}

function moverIzquierda() {
    direccion_new = "L";
    validarCambioDireccion();
}

function moverArriba() {
    direccion_new = "U";
    validarCambioDireccion();
}

function moverAbajo() {
    direccion_new = "D";
    validarCambioDireccion();
}

function validarCambioDireccion() {
    if ((direccion_new == "R") && (direccion_old == "L")) {
        direccion = "L";
    } else if ((direccion_new == "L") && (direccion_old == "R")) {
        direccion = "R";
    } else if ((direccion_new == "U") && (direccion_old == "D")) {
        direccion = "D";
    } else if ((direccion_new == "D") && (direccion_old == "U")) {
        direccion = "U";
    } else {
        direccion = direccion_new;
        direccion_old = direccion_new;
    }
}

function dibujarComida() {
    dibujarRectangulo(comidaX, comidaY, LADO_CUADRADO, LADO_CUADRADO, COLOR_COMIDA);
}

function detectarColision() {
    if (snake[0][0] == comidaX && snake[0][1] == comidaY) {
        comidaX = LADO_CUADRADO * generarAleatorio(0, canvas.width / LADO_CUADRADO);
        comidaY = LADO_CUADRADO * generarAleatorio(0, canvas.height / LADO_CUADRADO);
    }
}

function generarAleatorio(min, max) {
    let random = Math.random();
    let numero = Math.ceil(random * (max - min)) + min;
    return numero - 1;
}