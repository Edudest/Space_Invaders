let ultimoDisparo = 0; // Tempo desde o último disparo
const intervaloDisparo = 600; // Intervalo de tempo entre cada disparo em ms

const pontuacao = document.getElementById("pontuacao");
let pontosAtuais = 0; // Pega valor atual

// Evento de pressão de tecla
document.addEventListener("keydown", (event) => {
  if (event.key === " " && !event.repeat) {
    tentarDisparar();
  }
});

// Execução de disparo
function disparo() {
  const projetil = document.createElement("div");
  projetil.classList.add("projetil");

  const larguraNave = nave.offsetWidth;
  const larguraProjetil = 10;
  const alturaProjetil = 25;

  const posicaoX = nave.offsetLeft + (larguraNave / 2) - larguraProjetil / 2;
  const posicaoY = nave.offsetTop - alturaProjetil;

  projetil.style.left = `${posicaoX}px`;
  projetil.style.top = `${posicaoY}px`;

  document.getElementById("game").appendChild(projetil);
  console.log(posicaoX); // Corrigido

  return projetil;
}

// Verifica se é possível disparar
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

  function animar() {
    const posicaoAtual = parseInt(projetil.style.top);
    const novaPosicao = posicaoAtual - velocidade;

    if (novaPosicao < -25) {
      projetil.remove();
      return;
    }

    projetil.style.top = `${novaPosicao}px`;

    const inimigos = document.querySelectorAll(".inimigo");
    inimigos.forEach((inimigo) => {
      if (colidiu(projetil, inimigo)) {
        projetil.remove();
        inimigo.remove();
        pontosAtuais += 100;
        pontuacao.textContent = pontosAtuais;
        console.log(pontosAtuais)
      }
    });

    requestAnimationFrame(animar);
  }

  requestAnimationFrame(animar);
}
