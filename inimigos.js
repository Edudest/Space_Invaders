// Instâncias para criação dos inimigos 
const linhas = 4;
const colunas = 6;

// Instâncias para estilização dos inimigos
const larguraInimigo = 40;
const espacamentoHorizontal = 150;

// Instâncias para organização dos inimigos dentro do espaço "game"
const larguraTotal = colunas * (larguraInimigo + espacamentoHorizontal) - espacamentoHorizontal;
const posicaoHorizontal = (game.offsetWidth - larguraTotal) / 2;

const inimigos = [];
let i = 1;

// Repetição para criação de colunas para os inimigos
for (let col = 0; col < colunas; col++) {
  for (let row = 0; row < linhas; row++) {
    const inimigo = document.createElement("div");
    inimigo.classList.add("inimigo");
    inimigo.classList.add(`inimigo${i}` );
    i++;

    // Calcula a posição do inimigo
    const posX = posicaoHorizontal + col * (larguraInimigo + espacamentoHorizontal);
    const posY = 50 + row * 100;

    // Atualiza a posição do inimigo
    inimigo.style.left = `${posX}px`;
    inimigo.style.top = `${posY}px`;

    // Adiciona o inimigo à tela
    game.appendChild(inimigo);
    inimigos.push(inimigo);
  }
}

let direcao = 1; // 1 = direita e -1 = esquerda
let velocidade = 5; // velocidade da nave

// Função responsável por movimentar os inimigos
function moverinimigos() {
  let alterarDirecaoBorda = false;

  inimigos.forEach((inimigo) => {
    if (!document.body.contains(inimigo)) return;

    let posX = parseFloat(inimigo.style.left);
    let novoX = posX + direcao * velocidade;
    inimigo.style.left = `${novoX}px`;

    // Verificação de bordas
    if (novoX <= 0 || novoX + inimigo.offsetWidth >= game.offsetWidth) {
      alterarDirecaoBorda = true;
    }

    // Verificação da colisão com a nave 
    if (colidiu(inimigo, nave)) {
      alert("💥 Game Over!");
      window.location.reload(); // ou chamar tela de "Game Over"
    }
  });

  // Inverte a direção se tocar a borda
  if (alterarDirecaoBorda) {
    direcao *= -1;
  }

  requestAnimationFrame(moverinimigos); // Execução de animação
}

// Função para disparar projetéis dos inimigos
function dispararInimigo() {
  const inimigosVivos = inimigos.filter(inimigo => document.body.contains(inimigo));

  // Calculo para disparo individual 
  if (inimigosVivos.length > 0) {
    const index = Math.floor(Math.random() * inimigosVivos.length);
    const inimigo = inimigosVivos[index];

    // Criar o projetil
    const projetil = document.createElement("div");
    projetil.classList.add("projetil-inimigo");

    // Calculo para posicionamento do disparo
    const larguraProjetil = 10;
    const posX = inimigo.offsetLeft + (inimigo.offsetWidth / 2) - (larguraProjetil / 2);
    const posY = inimigo.offsetTop + inimigo.offsetHeight;

    // Adição do disparo à tela
    projetil.style.left = `${posX}px`;
    projetil.style.top = `${posY}px`;
    game.appendChild(projetil);

    // Iniciar a animação do projetil
    moverProjetilInimigo(projetil);
  }

  // Próximo disparo em tempo fixo 
  setTimeout(dispararInimigo, Math.random() * 150); 
}

// Movimento do projetil inimigo
function moverProjetilInimigo(projetil) {
  const velocidadeProjetil = 9; // velocidade do projetil inimigo

  function animar() {
    // Pega a posição atual do projetil
    const yAtual = parseFloat(projetil.style.top);
    projetil.style.top = `${yAtual + velocidadeProjetil}px`;

    // Verifica colisão com a nave
    if (colisãoCircular(projetil, nave)) {
      mostrarTelaDerrota() // Exibe a tela de derrota
      return;
    }

    // Remove o projetil se ele sair da tela
    if (yAtual > game.offsetHeight) {
      projetil.remove();
      return;
    }

    // Chama a animação novamente
    requestAnimationFrame(animar);
  }

  // Inicia a animação
  requestAnimationFrame(animar);
}

// Troca aleatória de direção horizontal a cada x segundos
function alterarDirecaoAleatoriamente() {
  const tempo = Math.random() * 1200;
  setTimeout(() => {
    direcao *= -1;
    alterarDirecaoAleatoriamente();
  }, tempo);
}

// Inicialização do movimento e disparos
requestAnimationFrame(moverinimigos);
// dispararInimigo(); // disparos independentes
alterarDirecaoAleatoriamente();

// Executa a tela de derrota
function mostrarTelaDerrota() {
  const tela = document.getElementById("telaDerrota");
  tela.style.display = "flex";
}