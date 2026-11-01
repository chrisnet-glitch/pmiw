class Principal {
  constructor(imgInicio) {
    this.estado = "INICIO"; 
    this.fondoinicio = imgInicio; // Aquí se llama fondoinicio
    
    // Botón de inicio
    this.btnInicioX = width / 2;
    this.btnInicioY = height / 2 + 50;
    this.btnInicioAncho = 160;
    this.btnInicioAlto = 45;

    this.personaje = new Personaje(width / 2, height - 120);
    this.pasillo = new Pasillo();
    
    this.puertas = [];
    for (let i = 0; i < 5; i++) {
      this.puertas.push(new Puerta(-10 + (i * 550), height - 150, i));
    }
  }

  actualizar() {
    if (this.estado === "INICIO") {
      this.Inicio();
    } else if (this.estado === "JUEGO") {
      this.juego();
    }
  }

  Inicio() {
    // Corregido aquí para usar this.fondoinicio
    if (this.fondoinicio) {
      image(this.fondoinicio, 0, 0, width, height);
    }

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(26);
    text("juego", width / 2, height / 2 - 60);
    
    // Botón verde turquesa
    // Botón verde turquesa
    push();
    rectMode(CENTER); // Hace que las coordenadas X e Y sean exactamente el centro del rectángulo
    fill(43, 129, 114); // Turquesa
    stroke(255);
    strokeWeight(2);
    rect(this.btnInicioX, this.btnInicioY, this.btnInicioAncho, this.btnInicioAlto, 8);
    
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    textStyle(BOLD);
    text("INICIAR", this.btnInicioX, this.btnInicioY);
    pop();
  }

  juego() {
    let xP0 = this.puertas[0].posX;
    let xP4 = this.puertas[4].posX;

    let desplaX = this.personaje.mover(xP0, xP4);

    this.pasillo.mover(desplaX);
    for (let i = 0; i < this.puertas.length; i++) {
      this.puertas[i].mover(desplaX);
    }

    // 4. Dibujamos todo en orden de capas
    this.pasillo.dibujar();
    for (let i = 0; i < this.puertas.length; i++) {
      this.puertas[i].dibujar();
    }
    this.personaje.dibujar();
  }

  manejarClick() {
    if (this.estado === "INICIO") {
      let dentroX = mouseX > this.btnInicioX - this.btnInicioAncho / 2 && mouseX < this.btnInicioX + this.btnInicioAncho / 2;
      let dentroY = mouseY > this.btnInicioY - this.btnInicioAlto / 2 && mouseY < this.btnInicioY + this.btnInicioAlto / 2;
      if (dentroX && dentroY) {
        this.estado = "JUEGO";
      }
    }
  }
}
