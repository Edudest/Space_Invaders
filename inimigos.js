const linhas = 4;
const colunas = 6;
const larguraInimigo = 40;
const espacamentoHorizontal = 150;

const larguraTotal = colunas * (larguraInimigo + espacamentoHorizontal) - espacamentoHorizontal;
const posicaoHorizontal = (game.offsetWidth - larguraTotal) / 2;

const formacao = [];

for (let col = 0; col < colunas; col++) {
  const coluna = document.createElement("div");
  coluna.classList.add("coluna");

  const posicaoX = posicaoHorizontal + col * (larguraInimigo + espacamentoHorizontal);
  coluna.style.left = `${posicaoX}px`;
  coluna.style.top = `50px`;

  for (let row = 0; row < linhas; row++) {
    const inimigo = document.createElement("div");
    inimigo.classList.add("inimigo", "inimigo" + (row + 1));
    coluna.appendChild(inimigo);
  }

  game.appendChild(coluna);
  formacao.push(coluna);
}

let direcao = 1; // 1 fará com que vá para direita, -1 para a esquerda
let passos = 10;

function moveColunas() {
  let alterarDirecao = false;

  formacao.forEach((coluna) => {
    let esquerdaAtual = parseFloat(coluna.style.left);
    let novaEsquerda = esquerdaAtual + direcao * passos;
    coluna.style.left = `${novaEsquerda}px`;

    // Verifica bordas
    if (
      novaEsquerda <= 200 ||
      novaEsquerda + coluna.offsetWidth >= 2100
    ) {
      alterarDirecao = true;
    }
  });

  if (alterarDirecao) {
    direcao *= -1;
  }
}

setInterval(moveColunas, 50); 