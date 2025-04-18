// Instancias
const nave = document.getElementById("nave");
const game = document.getElementById("game");

// Referências de posição
let posicaoNave = game.offsetWidth / 2;
let localNave = game.offsetHeight - nave.offsetHeight - 30;

// Preparação para receber movimento
let esquerda = false;
let direita = false;
let baixo = false;
let cima = false;

// Movimentação com referencia para esquerda e para cima
function moveShip() {
    nave.style.left = `${posicaoNave}px`;
    nave.style.top = `${localNave}px`;
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
    if (esquerda && posicaoNave > 0) {
        posicaoNave -= 10;
    }
    if (direita && posicaoNave < game.offsetWidth - nave.offsetWidth) {
        posicaoNave += 10;
    }
    if (baixo && localNave > 0) {
        localNave -= 10;
    }
    if (cima && localNave < game.offsetHeight - nave.offsetHeight) {
        localNave += 10;
    }

    requestAnimationFrame(gameLoop);
    moveShip(); // Função explicada na linha 16
}

gameLoop(); // Execução do jogo

// Função para detectar a posição atual da nave 
function Coordenada() {
    return { x: posicaoNave, y: localNave };
}

// Comando para exportar a posição da nave 
window.Coordenada = Coordenada;