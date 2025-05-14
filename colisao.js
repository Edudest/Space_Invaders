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

    // colide em formato 
    function colisãoCircular(a, b) {
      const objetoA = a.offsetWidth * 0.25;
      const objetoB = b.offsetWidth / 2.5;
    
      const x1 = a.offsetLeft + objetoA;
      const y1 = a.offsetTop + objetoA;
    
      const x2 = b.offsetLeft + objetoB;
      const y2 = b.offsetTop + objetoB;
    
      const dx = x1 - x2;
      const dy = y1 - y2;
    
      const distancia = Math.hypot(dx, dy);
      return distancia < objetoA + objetoB;
    }
    