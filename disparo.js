let ultimoDisparo = 0;
const intervaloDisparo = 750; // Intervalo entre cada disparo em milissegundos

// Função responsável por executar o disparo
function disparo() {
    const posicaoAtual = window.Coordenada();

    // Cria o projetil
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");

    // Referencias de criação do projetil para a nave
    const larguraNave = nave.offsetWidth;
    const larguraProjetil = 10;

    const posicaoX = nave.offsetLeft + (larguraNave / 2) - (larguraProjetil / 2);
    const posicaoY = nave.offsetTop; // parte de cima da nave

    projetil.style.left = `${posicaoX}px`;
    projetil.style.top = `${posicaoY}px`;

    // Adiciona o projetil ao corpo do jogo
    document.getElementById("game").appendChild(projetil);

    console.log(`Disparo! x:${posicaoAtual.x}px, y:${posicaoAtual.y}px`);
}

// Pressão de tecla
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.repeat) {
        tentarDisparar();
    }
});

function tentarDisparar() {
    const inicioContador = Date.now();
    if (inicioContador - ultimoDisparo >= intervaloDisparo) {
        disparo();
        ultimoDisparo = inicioContador;
    }
}
