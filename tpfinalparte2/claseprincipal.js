class Principal {
  constructor(imgInicio, imgTitulo, imgsHabitacion) {
    this.estado = "INICIO"; // "INICIO", "JUEGO", "HABITACION"
    this.imgInicio = imgInicio; 
    this.imgTitulo = imgTitulo;
    
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

    // Las 5 habitaciones
    this.habitaciones = [];
    for (let i = 0; i < 5; i++) {
      this.habitaciones.push(new Habitacion(i, imgsHabitacion[i]));
    }

    this.habitacionSeleccionada = 0;
  }

  actualizar() {
    if (this.estado === "INICIO") {
      this.dibujarInicio();
    } else if (this.estado === "JUEGO") {
      this.juego();
    } else if (this.estado === "HABITACION") {
      this.habitaciones[this.habitacionSeleccionada].dibujar();
    }
  }

  dibujarInicio() {
    if (this.imgInicio && this.imgTitulo) {
      image(this.imgInicio, 0, 0, width, height);
      image(this.imgTitulo, 185, 40, 400, 200);
    }
  
    push();
    rectMode(CENTER); 
    fill(67, 85, 76); 
    stroke(194, 214, 196);
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

    this.pasillo.dibujar();
    for (let i = 0; i < this.puertas.length; i++) {
      this.puertas[i].dibujar();
    }
    this.personaje.dibujar();
  }

  manejarClick() {
    if (this.estado === "INICIO") {
      if (abs(mouseX - this.btnInicioX) < this.btnInicioAncho / 2 && 
          abs(mouseY - this.btnInicioY) < this.btnInicioAlto / 2) {
        this.estado = "JUEGO";
      }
    } 
    else if (this.estado === "JUEGO") {
      let index = -1;
      for (let i = 0; i < this.puertas.length; i++) {
        let p = this.puertas[i];
        if (mouseX > p.posX - p.ancho / 2 && mouseX < p.posX + p.ancho / 2 && mouseY > p.posY - p.alto / 2 && mouseY < p.posY + p.alto / 2) 
        {
          index = i;
          break;
        }
      }

      if (index !== -1) {
        this.estado = "HABITACION";
        this.habitacionSeleccionada = index;
      }
    } 
    else if (this.estado === "HABITACION") {
      if (this.habitaciones[this.habitacionSeleccionada].verificarClic(mouseX, mouseY)) {
        this.estado = "JUEGO";
      }
    }
  }
}
