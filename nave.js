// Instâncias
const ship = document.getElementById("nave");
const game = document.getElementById("game");

// Referências de posição
let posiçãoNave = game.offsetWidth / 2 - ship.offsetWidth / 2;
let localNave = game.offsetHeight - ship.offsetHeight - 30;

// Movimento
let esquerda = false;
let direita = false;
let cima = false;
let baixo = false;

// Estado do jogo
let gameOver = false;

// Posicionar a nave visualmente
function moveShip() {
    ship.style.left = `${posiçãoNave}px`;
    ship.style.top = `${localNave}px`;
}

// Mostrar mensagem de game over
function mostrarGameOver() {
    const gameOverDiv = document.createElement("div");
    gameOverDiv.id = "gameOverMessage";
    gameOverDiv.style.position = "absolute";
    gameOverDiv.style.top = "50%";
    gameOverDiv.style.left = "50%";
    gameOverDiv.style.transform = "translate(-50%, -50%)";
    gameOverDiv.style.fontSize = "48px";
    gameOverDiv.style.color = "red";
    gameOverDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    gameOverDiv.style.padding = "20px 40px";
    gameOverDiv.style.borderRadius = "10px";
    gameOverDiv.style.zIndex = "1000";
    gameOverDiv.textContent = "Game Over! Você perdeu!";
    game.appendChild(gameOverDiv);
}

// Colisão
function detectarColisao(el1, el2) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    return (
        r1.left < r2.right &&
        r1.right > r2.left &&
        r1.top < r2.bottom &&
        r1.bottom > r2.top
    );
}

// Teclas pressionadas
document.addEventListener("keydown", (event) => {
    if (gameOver) return; // Desabilita movimento após game over
    if (event.key === "a") esquerda = true;
    if (event.key === "d") direita = true;
    if (event.key === "w") cima = true;
    if (event.key === "s") baixo = true;
});

document.addEventListener("keyup", (event) => {
    if (gameOver) return; // Desabilita movimento após game over
    if (event.key === "a") esquerda = false;
    if (event.key === "d") direita = false;
    if (event.key === "w") cima = false;
    if (event.key === "s") baixo = false;
});

// Loop
function gameLoop() {
    if (gameOver) return; // Para o loop após game over

    // Movimento
    if (esquerda && posiçãoNave > 0) {
        posiçãoNave -= 10;
    }
    if (direita && posiçãoNave < game.offsetWidth - ship.offsetWidth) {
        posiçãoNave += 10;
    }
    if (cima && localNave > 0) {
        localNave -= 10;
    }
    if (baixo && localNave < game.offsetHeight - ship.offsetHeight) {
        localNave += 10;
    }

    moveShip();

    // Verifica colisão com todos os inimigos
    const inimigosAtuais = document.querySelectorAll(".inimigo");
    for (const inimigo of inimigosAtuais) {
        if (detectarColisao(ship, inimigo)) {
            gameOver = true;
            mostrarGameOver();
            break;
        }
    }

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
