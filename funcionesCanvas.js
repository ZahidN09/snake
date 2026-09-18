let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const COLOR_SNAKE = "#2cac12";
const COLOR_SNAKE_1 = "#2cac12";
const COLOR_SNAKE_2 = "#1b640c";
const COLOR_COMIDA = "#b30000";
const LADO_CUADRADO = 25;
const POS_INIT_X = 225;//Math.floor((canvas.width - LADO_CUADRADO) / 2);
const POS_INIT_Y = 225;//Math.floor((canvas.height - LADO_CUADRADO) / 2);
const DESPLAZAMIENTO = 25;
const POS_COMIDA_X = POS_INIT_X + 150;
const POS_COMIDA_Y = POS_INIT_Y;

let direccion = "R";
let siguienteDireccion = "R";

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
    let ultimo = snake.length - 1;
    let color = COLOR_SNAKE_1;
    dibujarCabeza(snake[0][0], snake[0][1]);
    for (let i = 1; i < snake.length; i++) {
        if (i % 2 == 0) {
            color = COLOR_SNAKE_1;
        } else {
            color = COLOR_SNAKE_2;
        }
        dibujarRectangulo(snake[i][0], snake[i][1], LADO_CUADRADO, LADO_CUADRADO, color);
    }

    dibujarCola(snake[ultimo][0], snake[ultimo][1], snake[ultimo - 1][0], snake[ultimo - 1][1]);
}

function dibujarCabeza(x, y) {
    dibujarRectangulo(x, y, LADO_CUADRADO, LADO_CUADRADO, COLOR_SNAKE);

    let tamanoOjo = 5;
    let colorOjo = "#000000";

    switch (direccion) {
        case "R":
            dibujarRectangulo(x + 15, y + 4, tamanoOjo, tamanoOjo, colorOjo);
            dibujarRectangulo(x + 15, y + 16, tamanoOjo, tamanoOjo, colorOjo);
            break;
        case "L":
            dibujarRectangulo(x + 5, y + 4, tamanoOjo, tamanoOjo, colorOjo);
            dibujarRectangulo(x + 5, y + 16, tamanoOjo, tamanoOjo, colorOjo);
            break;
        case "U":
            dibujarRectangulo(x + 4, y + 5, tamanoOjo, tamanoOjo, colorOjo);
            dibujarRectangulo(x + 16, y + 5, tamanoOjo, tamanoOjo, colorOjo);
            break;
        case "D":
            dibujarRectangulo(x + 4, y + 15, tamanoOjo, tamanoOjo, colorOjo);
            dibujarRectangulo(x + 16, y + 15, tamanoOjo, tamanoOjo, colorOjo);
            break;
    }
}

function dibujarCola(x, y, xAnterior, yAnterior) {
    let colorCascabel = "#c99a3c"; // Color ocre/dorado
    let colorAnillos = "#5c4015";  // Marrón oscuro para las rayas
    dibujarRectangulo(x, y, LADO_CUADRADO, LADO_CUADRADO, colorCascabel);
    if (x === xAnterior) {
        dibujarRectangulo(x, y + 6, LADO_CUADRADO, 4, colorAnillos);
        dibujarRectangulo(x, y + 16, LADO_CUADRADO, 4, colorAnillos);
    } else {
        dibujarRectangulo(x + 6, y, 4, LADO_CUADRADO, colorAnillos);
        dibujarRectangulo(x + 16, y, 4, LADO_CUADRADO, colorAnillos);
    }
}

function moverSnake() {
    direccion = siguienteDireccion;

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
    if (direccion !== "L") {
        siguienteDireccion = "R";
    }
}

function moverIzquierda() {
    if (direccion !== "R") {
        siguienteDireccion = "L";
    }
}

function moverArriba() {
    if (direccion !== "D") {
        siguienteDireccion = "U";
    }
}

function moverAbajo() {
    if (direccion !== "U") {
        siguienteDireccion = "D";
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
    let nuevaVelocidad = 400;
    if (puntaje < 5) {
        nuevaVelocidad = 400;
    } else if (puntaje < 15) {
        nuevaVelocidad = 340;
    } else if (puntaje < 30) {
        nuevaVelocidad = 280;
    } else if (puntaje < 50) {
        nuevaVelocidad = 220;
    } else if (puntaje < 75) {
        nuevaVelocidad = 160;
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

    // Evaluamos contra 'direccion' (la realidad física en el canvas)
    if (tecla === "ArrowRight" && direccion !== "L") {
        siguienteDireccion = "R";
    }
    else if (tecla === "ArrowLeft" && direccion !== "R") {
        siguienteDireccion = "L";
    }
    else if (tecla === "ArrowUp" && direccion !== "D") {
        siguienteDireccion = "U";
    }
    else if (tecla === "ArrowDown" && direccion !== "U") {
        siguienteDireccion = "D";
    }
});