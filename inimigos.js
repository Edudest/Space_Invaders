// Instancias para criação dos inimigos 
const linhas = 4;
const colunas = 6;

// Instancias para estilização dos inimigos
const larguraInimigo = 40;
const espacamentoHorizontal = 150;

// Instancias para organização dos inimigos dentro do espaco "game" 
const larguraTotal = colunas * (larguraInimigo + espacamentoHorizontal) - espacamentoHorizontal;
const posicaoHorizontal = (game.offsetWidth - larguraTotal) / 2;

const inimigos
 = []
i = 1;
// Repetição para criação de colunas para os inimigos
for (let col = 0; col < colunas; col++) {
  for (let row = 0; row < linhas; row++) {
    const inimigo = document.createElement("div");
    inimigo.classList.add("inimigo");
    inimigo.classList.add(`${i}`)
    i ++;

    // Calcula a posição do inimigo
    const posX = posicaoHorizontal + col * (larguraInimigo + espacamentoHorizontal);
    const posY = 50 + row * 100;

    inimigo.style.left = `${posX}px`;
    inimigo.style.top = `${posY}px`;

    game.appendChild(inimigo);
    inimigos.push(inimigo);
  }
}

let direcao = 1; // 1 = direita e -1 = esquerda
let velocidade = 5;

// Função responsável por movimentar os inimigos
function moverinimigos() {
  let alterarDirecao = false;
  
  inimigos.forEach((inimigo) => {
    let posX = parseFloat(inimigo.style.left);
    let novoX = posX + direcao * velocidade;
    inimigo.style.left = `${novoX}px`;

    // Verificação de bordas
    if (
      novoX <= 0 || 
      novoX + inimigo.offsetWidth >= game.offsetWidth
    ) {
      alterarDirecao = true;
    }

    // Verificação da colisão com a nave 
    if (colidiu(inimigo, nave)) {
      window.location.reload(); // ou chamar tela de "Game Over"
    }
  });

  if (alterarDirecao) {
    direcao *= -1;
  }

  function disparo() {

    // Crição do disparo
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");
  
    // Parametros para o posicionamento do disparo
    const larguraInimigo = inimigo.offsetWidth;
    const larguraProjetil = 10;
    const alturaProjetil = 25;
  
    // Calculo de posicionamento disparo
    const posX = inimigo.offsetLeft + (larguraInimigo / 2) - larguraProjetil / 2;
    const posicaoY = inimigo.offsetTop - alturaProjetil;
  
    // Atribuição de posição ao projetil
    projetil.style.left = `${posX}px`;
    projetil.style.top = `${posicaoY}px`;
  
    // Adição do projetil à tela
    document.getElementById("game").appendChild(projetil);
    console.log`${posX}` // Lembrar de apagar depois !!!!!!!!!!
    return projetil;
  }

  requestAnimationFrame(moverinimigos);
}
requestAnimationFrame(moverinimigos);