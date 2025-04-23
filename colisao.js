// A e B são métricas genéricas
function colidiu(a, b) {
    const objeto1 = a.getBoundingClientRect();
    const objeto2 = b.getBoundingClientRect();

    return (
      // Medidas sao usadas em ingles, pois o comando as retorna em ingles
      objeto1.left < objeto2.right &&
      objeto1.right > objeto2.left &&
      objeto1.top < objeto2.bottom &&
      objeto1.bottom > objeto2.top
    );
  }
  