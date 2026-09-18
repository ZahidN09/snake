function recuperarTexto(idComponente) {
    let cmp = document.getElementById(idComponente);
    let valor = cmp.value;
    return valor;
}

function recuperarFloat(idComponente) {
    let texto = recuperarTexto(idComponente);
    let valor = parseFloat(texto);
    return valor;
}

function recuperarInt(idComponente) {
    let texto = recuperarTexto(idComponente);
    let valor = parseInt(texto);
    return valor;
}

function mostarEnSpan(idComponente, valor) {
    let cmp = document.getElementById(idComponente);
    cmp.textContent = valor;
}

function mostarEnSpanTxt(idComponente, valor) {
    let cmp = document.getElementById(idComponente);
    cmp.textContent = valor;
}