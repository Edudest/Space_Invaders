// Instancias
const ship = document.getElementById("nave");
const game = document.getElementById("game");

// Referências de posição
let posiçãoNave = game.offsetWidth / 2 - ship.offsetWidth / 2;
let localNave = game.offsetHeight - ship.offsetHeight - 30;

// Preparação para receber movimento
let esquerda = false;
let direita = false;
let baixo = false;
let cima = false;

// Movimentação com referencia para esquerda e para cima
function moveShip() {
    ship.style.left = `${posiçãoNave}px`;
    ship.style.top = `${localNave}px`;
}

// Evento de pressão de tecla
document.addEventListener("keydown", (event) => {
    if (event.key === "a") esquerda = true;
    if (event.key === "d") direita = true;
    if (event.key === "w") baixo = true;
    if (event.key === "s") cima = true;
});

// Evento de soltar tecla
document.addEventListener("keyup", (event) => {
    if (event.key === "a") esquerda = false;
    if (event.key === "d") direita = false;
    if (event.key === "w") baixo = false;
    if (event.key === "s") cima = false;
});

// Loop para movimentação por pressão continua
function gameLoop() {
    if (esquerda && posiçãoNave > 0) {
        posiçãoNave -= 10;
    }
    if (direita && posiçãoNave < game.offsetWidth - ship.offsetWidth) {
        posiçãoNave += 10;
    }
    if (baixo && localNave > 0) {
        localNave -= 10;
    }
    if (cima && localNave < game.offsetHeight - ship.offsetHeight) {
        localNave += 10;
    }

    requestAnimationFrame(gameLoop);
    moveShip(); // Função explicada na linha 16
}

gameLoop();