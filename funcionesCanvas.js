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

let puntaje = 0;
let msgLose = 0;

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarRectangulo(X, Y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(X, Y, ancho, alto);
}

function dibujarSnake() {
    for (let i = 0; i < snake.length; i++) {
        dibujarRectangulo(snake[i][0], snake[i][1], LADO_CUADRADO, LADO_CUADRADO, COLOR_SNAKE);
    }
}

function moverSnake() {
    let cambio_x = 0;
    let cambio_y = 0;

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
    
    if (!detectarColisionComida()) {
        snake.pop(); 
    }

    if (detectarColisionSnake()) {
        perder();
        return;
    }

    limpiarCanva();
    dibujarSnake();
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

function detectarColisionComida() {
    if (snake[0][0] == comidaX && snake[0][1] == comidaY) {
        generarPosicionComida();
        puntaje = puntaje + 1;
        mostarEnSpan("txtPuntaje", puntaje);
        largoSnake = largoSnake + 1;
        aumentarVelocidad();
        return true;
    }
    return false;
}

function generarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generarPosicionComida() {
    let posicionSegura = false;
    while (posicionSegura === false) {

        comidaX = LADO_CUADRADO * generarAleatorio(0, canvas.width / LADO_CUADRADO);
        comidaY = LADO_CUADRADO * generarAleatorio(0, canvas.height / LADO_CUADRADO);

        posicionSegura = true;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i][0] === comidaX && snake[i][1] === comidaY) {
                posicionSegura = false;
                break;
            }
        }
    }
}

function detectarColisionSnake() {
    for (let i = 3; i < snake.length; i++) {
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
            msgLose = 1; // msg1: Perder por chocar con si mismo
            return true;
        }
    }

    if (snake[0][0] < 0 || snake[0][0] > canvas.width - LADO_CUADRADO ||
        snake[0][1] < 0 || snake[0][1] > canvas.height - LADO_CUADRADO) {
        msgLose = 2; // msg2: Perder por chocar con borde
        return true;
    }
    
    return false;
}

function aumentarVelocidad() {
    let nuevaVelocidad = 500;
    if (puntaje < 6) {
        nuevaVelocidad = 500;
    } else if (puntaje < 16) {
        nuevaVelocidad = 400;
    } else if (puntaje < 31) {
        nuevaVelocidad = 300;
    } else if (puntaje < 51) {
        nuevaVelocidad = 200;
    } else if (puntaje < 76) {
        nuevaVelocidad = 140;
    } else {
        nuevaVelocidad = 100;
    }
    if (nuevaVelocidad !== velocidadActual) {
        velocidadActual = nuevaVelocidad;
        clearInterval(intervalo);
        intervalo = setInterval(moverSnake, velocidadActual);
    }
}

function perder() {
    let msg;
    switch (msgLose) {
        case 1:
            msg = "NO TE COMAS A TI MISMO!!";
            break;

        case 2:
            msg = "NO TRATES DE ESCAPAR!!";
            break;

        default:
            break;
    }
    alert(msg);
    clearInterval(intervalo);
}

// Entradas de teclado
document.addEventListener("keydown", function (evento) {
    let tecla = evento.key;

    if (tecla === "ArrowRight" && direccion !== "L") {
        direccion = "R";
    }
    else if (tecla === "ArrowLeft" && direccion !== "R") {
        direccion = "L";
    }
    else if (tecla === "ArrowUp" && direccion !== "D") {
        direccion = "U";
    }
    else if (tecla === "ArrowDown" && direccion !== "U") {
        direccion = "D";
    }
});