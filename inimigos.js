// Instancias para criação dos inimigos 
const linhas = 4;
const colunas = 6;

// Instancias para estilização dos inimigos
const larguraInimigo = 40;
const espacamentoHorizontal = 150;

// Instancias para organização dos inimigos dentro do espaco "game" 
const larguraTotal = colunas * (larguraInimigo + espacamentoHorizontal) - espacamentoHorizontal;
const posicaoHorizontal = (game.offsetWidth - larguraTotal) / 2;

const formacao = []; // Recebe as hordas de inimigos

i = 1;
// Repetição para criação de colunas para os inimigos
for (let col = 0; col < colunas; col++) {
  const coluna = document.createElement("div");
  coluna.classList.add("coluna");

  // Define o local de criação das colunas
  const posicaoX = posicaoHorizontal + col * (larguraInimigo + espacamentoHorizontal);
  coluna.style.left = `${posicaoX}px`; // Horizontal
  coluna.style.top = `50px`; // Vertical

  // Repetição de adição dos inimigos às colunas
  for (let row = 0; row < linhas; row++) {
    const inimigo = document.createElement("div"); 
    inimigo.classList.add("inimigo");
    inimigo.classList.add(`${i}`);
    i++;
    coluna.appendChild(inimigo); 
  }
  game.appendChild(coluna); // Adiciona as colunas ao jogo
  formacao.push(coluna); // Adiciona as colunas prontas à formação
}

let direcao = 1; // 1 = direita e -1 = esquerda
let velocidade = 5;

// Função responsável por movimentar os inimigos
function moverColunas() {
  let alterarDirecao = false;

  // Realiza o deslocamento 
  formacao.forEach((coluna) => {
    let esquerdaAtual = parseFloat(coluna.style.left);
    let novaEsquerda = esquerdaAtual + direcao * velocidade;
    coluna.style.left = `${novaEsquerda}px`;

    // Verificação de bordas
    if (
      novaEsquerda <= 0 || // lado esquerdo
      novaEsquerda + coluna.offsetWidth >= game.offsetWidth // lado direito
    ) {
      alterarDirecao = true;
    }
  });

  // Realiza a troca de direção
  if (alterarDirecao) {
    direcao = -1;
  }

  // Atualização por frames
  requestAnimationFrame(moverColunas);
}

// Inicio de animação
requestAnimationFrame(moverColunas);