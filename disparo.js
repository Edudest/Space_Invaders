let ultimoDisparo = 0; // Tempo desde o ultimo disparo
const intervaloDisparo = 600; // Intervalo de tempo entre cada disparo em ms

// Evento de pressão de tecla
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.repeat) {
    tentarDisparar();
  }
});

// Execução de disparo
function disparo() {

  // Crição do disparo
  const projetil = document.createElement("div");
  projetil.classList.add("projetil");

  // Parametros para o posicionamento do disparo
  const larguraNave = nave.offsetWidth;
  const larguraProjetil = 10;
  const alturaProjetil = 25;

  // Calculo de posicionamento disparo
  const posicaoX = nave.offsetLeft + (larguraNave / 2) - larguraProjetil / 2;
  const posicaoY = nave.offsetTop - alturaProjetil;

  // Atribuição de posição ao projetil
  projetil.style.left = `${posicaoX}px`;
  projetil.style.top = `${posicaoY}px`;

  // Adição do projetil à tela
  document.getElementById("game").appendChild(projetil);
  console.log`${posicaoX}` // Lembrar de apagar depois !!!!!!!!!!
  return projetil;
}

// Verifica se é possivel disparar
function tentarDisparar() {
  const agora = Date.now();
  if (agora - ultimoDisparo >= intervaloDisparo) {
    moverProjetilPorFrame(disparo());
    ultimoDisparo = agora;
  }
}

// Animação por frames
function moverProjetilPorFrame(projetil) {
  const velocidade = 8;

  // Lógica de movimento do projetil
  function animar() {
    const posicaoAtual = parseInt(projetil.style.top);
    const novaPosicao = posicaoAtual - velocidade;

    // Eliminação de projetil ao sair da tela
    if (novaPosicao < -25) {
      projetil.remove();
      return;
    }

    // Atualição de movimento
    projetil.style.top = `${novaPosicao}px`;
    
    const inimigos = document.querySelectorAll(".inimigo");
    inimigos.forEach((inimigo) => {
      if (colidiu(projetil, inimigo)) {
        projetil.remove();
        inimigo.remove();
      }
    });
    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar); // Executa a animação
}