// Instancias
const nave = document.getElementById("nave");
const game = document.getElementById("game");

// Referências de posição
let posicaoNave = game.offsetWidth / 2;
let localNave = game.offsetHeight - nave.offsetHeight - 30;

// Preparação para receber movimento
let esquerda = false;
let direita = false;

// Posiciona a nave dentro do jogo
function moveShip() {
    nave.style.left = `${posicaoNave}px`;
    nave.style.top = `${localNave}px`;
}

// Evento de pressão de tecla
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") esquerda = true;
    if (event.key === "ArrowRight") direita = true;
});

// Evento de soltar tecla
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") esquerda = false;
    if (event.key === "ArrowRight") direita = false;
});

// Loop para movimentação por pressão continua
function gameLoop() {
    if (esquerda && posicaoNave > 0) {
        posicaoNave -= 10;
    }
    if (direita && posicaoNave < game.offsetWidth - nave.offsetWidth) {
        posicaoNave += 10;
    }

    requestAnimationFrame(gameLoop);
    moveShip(); // Função explicada na linha 16
}

gameLoop(); // Execução do jogo