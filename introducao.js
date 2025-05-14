// Executa o bloco de instruções
function mostrarInstrucoes() {
    alert("🕹️ Use as setas do teclado para mover a nave.\n🔫 Pressione espaço para atirar.\n👾 Derrote todos os invasores!");
}

// Define variaveis para a criação do movimento de estrelas
const fundo = document.getElementById('fundo-estrelado');
const numeroDeEstrelas = 100;

// Geração das estrelas em movimento
for (let i = 0; i < numeroDeEstrelas; i++) {
    const estrela = document.createElement('div');
    const tamanho = Math.random() * 3 + 2; // entre 2px e 5px
    estrela.classList.add('estrela');
    estrela.style.width = `${tamanho}px`;
    estrela.style.height = `${tamanho}px`;
    estrela.style.left = `${Math.random() * 100}%`;
    estrela.style.animationDuration = `${Math.random() * 10 + 5}s`;
    estrela.style.animationDelay = `${Math.random() * 10}s`;
    fundo.appendChild(estrela);
}