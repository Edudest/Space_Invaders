let ultimoDisparo = 0;
const intervaloDisparo = 1500; // Intervalo entre cada disparo em milissegundos

// Função responsável por executar o disparo
function disparo() {
    const posicaoAtual = window.Coordenada();
    console.log(`Disparo! x:${posicaoAtual.x}px, y:${posicaoAtual.y}px`);
}

// Pressão de tecla
document.addEventListener("keydown", (event) => {
    // Ignora repetições automáticas
    if (event.key === "Enter" && !event.repeat) {
        tentarDisparar();
    }
});

function tentarDisparar() {
    const inicioContador = Date.now(); // Inicia contagem de tempo 

    // Bloco lógico para habilitar e executar o disparo
    if (inicioContador - ultimoDisparo >= intervaloDisparo) {
        disparo();
        ultimoDisparo = inicioContador;
    }
}