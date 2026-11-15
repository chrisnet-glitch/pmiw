//---------------------------------------CLASE PRINCIPAL--------------------------------------

class Principal {
  constructor(imgInicio, imgTitulo, imgsHabitacion) {

    this.estado = "INICIO";
    this.imgInicio = imgInicio;
    this.imgTitulo = imgTitulo;

    this.btnInicioX = width / 2;
    this.btnInicioY = height / 2 + 50;
    this.btnInicioAncho = 160;
    this.btnInicioAlto = 45;



    this.btnReglasX = 60;
    this.btnReglasY = 370;
    this.btnReglasAncho = 100;
    this.btnReglasAlto = 45;



    this.btnVolverX = 60;
    this.btnVolverY = 60;
    this.btnVolverAncho = 50;
    this.btnVolverAlto = 50;



    this.personaje = new Personaje(width / 2, height - 120);
    this.pasillo = new Pasillo();

    this.puertas = [];
    for (let i = 0; i < 5; i++) {
      this.puertas.push(new Puerta(-10 + (i * 550), height - 150, i));
    }



    this.habitaciones = [];
    for (let i = 0; i < 5; i++) {
      this.habitaciones.push(new Habitacion(i, imgsHabitacion[i], imgsObj, imgBotonObj));
    }
    this.habitacionSeleccionada = 0;
    this.tiempoFinPantalla = 0;
    this.duracionFinPantalla = 2000;

    // intentos de llamar
    this.intentosFallidos = 0;
    this.habitacionActual = null;
    this.desplaX = 0;
    this.xP0 = 0;
    this.xP4 = 0;
    this.index = -1;
    this.p = null;
    this.accion = null;
    this.quiereVolver = false;
    this.habActual = null;
    this.indiceImgVidas = 0;
  }



  actualizar() {

    if (this.estado === "INICIO") {

      this.dibujarInicio();
    } else if (this.estado === "REGLAS") {

      this.dibujarReglas();
    } else if (this.estado === "JUEGO") {

      this.juego();

      this.dibujarVidas();
    } else if (this.estado === "HABITACION") {

      this.habitacionActual = this.habitaciones[this.habitacionSeleccionada];

      this.habitacionActual.dibujar();

      this.dibujarVidas();



      if (this.habitacionActual.esperandoFin) {

        if (this.habitacionActual.tipoFin === "ganaste") {

          this.estado = "GANASTE";
        } else {

          this.estado = "PERDISTE";
        }

        this.tiempoFinPantalla = millis();
      }
    } else if (this.estado === "GANASTE") {

      this.dibujarFin("¡Ganaste!", color(0, 255, 0));
    } else if (this.estado === "PERDISTE") {

      this.dibujarFin("¡Perdiste!", color(255, 0, 0));
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


    push();

    rectMode(CENTER);
    fill(67, 85, 76);
    stroke(194, 214, 196);

    strokeWeight(2);
    rect(this.btnReglasX, this.btnReglasY, this.btnReglasAncho, this.btnReglasAlto, 8);



    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text("REGLAS", this.btnReglasX, this.btnReglasY);
    pop();
  }



  dibujarReglas() {

    if (this.imgInicio) {
      image(this.imgInicio, 0, 3, width, height);
    }



    if (imgInstrucciones) {
      imageMode(CENTER);
      image(imgInstrucciones, width / 2, height / 2, 600, 380);
      imageMode(CORNER);
    }



    rectMode(CENTER);
    fill(0, 100);
    stroke(255, 100);
    rect(this.btnVolverX, this.btnVolverY, this.btnVolverAncho, this.btnVolverAlto, 10);


    fill(255);
    noStroke();
    triangle(this.btnVolverX + 6, this.btnVolverY - 12, this.btnVolverX + 6, this.btnVolverY + 12, this.btnVolverX - 10, this.btnVolverY);
  }



  dibujarVidas() {

    push();
    imageMode(CORNER);

    this.indiceImgVidas = this.intentosFallidos;
    if (this.indiceImgVidas > 2) {
      this.indiceImgVidas = 2;
    }



    if (imgsVidas[this.indiceImgVidas]) {
      image(imgsVidas[this.indiceImgVidas], width - 110, 15, 95, 30);
    }



    pop();
  }



  dibujarFin(mensaje, colTexto) {

    push();
    background(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(colTexto);
    text(mensaje, width / 2, height / 2);
    pop();



    if (millis() - this.tiempoFinPantalla >= this.duracionFinPantalla) {
      this.reiniciarJuego();
    }
  }



  reiniciarJuego() {
    this.estado = "INICIO";
    this.intentosFallidos = 0;

    for (let i = 0; i < this.habitaciones.length; i++) {
      this.habitaciones[i] = new Habitacion(i, imgsHabitacion[i], imgsObj, imgBotonObj);
    }

    this.personaje = new Personaje(width / 2, height - 120);
    this.pasillo = new Pasillo();
  }



  juego() {
    this.xP0 = this.puertas[0].posX;
    this.xP4 = this.puertas[4].posX;


    this.desplaX = this.personaje.mover(this.xP0, this.xP4);



    this.pasillo.mover(this.desplaX);

    for (let i = 0; i < this.puertas.length; i++) {

      this.puertas[i].mover(this.desplaX);
    }

    this.pasillo.dibujar();
    for (let i = 0; i < this.puertas.length; i++) {
      this.puertas[i].dibujar();
    }
    this.personaje.dibujar();
  }



  manejarClick() {

    if (this.estado === "INICIO") {




      if (mouseX > this.btnInicioX - this.btnInicioAncho / 2 &&
        mouseX < this.btnInicioX + this.btnInicioAncho / 2 &&
        mouseY > this.btnInicioY - this.btnInicioAlto / 2 &&
        mouseY < this.btnInicioY + this.btnInicioAlto / 2) {

        this.estado = "JUEGO";
      } else if (mouseX > this.btnReglasX - this.btnReglasAncho / 2 &&
        mouseX < this.btnReglasX + this.btnReglasAncho / 2 &&
        mouseY > this.btnReglasY - this.btnReglasAlto / 2 &&
        mouseY < this.btnReglasY + this.btnReglasAlto / 2) {

        this.estado = "REGLAS";
      }
    } else if (this.estado === "REGLAS") {

      this.quiereVolver = mouseX > this.btnVolverX - this.btnVolverAncho / 2 &&
        mouseX < this.btnVolverX + this.btnVolverAncho / 2 &&
        mouseY > this.btnVolverY - this.btnVolverAlto / 2 &&
        mouseY < this.btnVolverY + this.btnVolverAlto / 2;



      if (this.quiereVolver) {

        this.estado = "INICIO";
      }
    } else if (this.estado === "JUEGO") {

      this.index = -1;

      for (let i = 0; i < this.puertas.length; i++) {

        this.p = this.puertas[i];

        if (mouseX > this.p.posX - this.p.ancho / 2 && mouseX < this.p.posX + this.p.ancho / 2 && mouseY > this.p.posY - this.p.alto / 2 && mouseY < this.p.posY + this.p.alto / 2)

        {

          this.index = i;

          break;
        }
      }

      if (this.index !== -1) {

        this.estado = "HABITACION";

        this.habitacionSeleccionada = this.index;
      }
    } else if (this.estado === "HABITACION") {
      this.accion = this.habitaciones[this.habitacionSeleccionada].verificarClic(mouseX, mouseY);



      if (this.accion === "volver") {
        this.estado = "JUEGO";
      } else if (this.accion === "error_policia") {

        this.intentosFallidos++;

        if (this.intentosFallidos >= 3) {
          this.habActual = this.habitaciones[this.habitacionSeleccionada];
          this.habActual.esperandoFin = true;
          this.habActual.tipoFin = "perdiste";
        }
      }
    }
  }
}
