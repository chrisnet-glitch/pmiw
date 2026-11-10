
//------------------------------------CLASE PERSONAJE----------------------------------
class Personaje {
  constructor(x, y, ancho, alto, vel) {
    this.posX = x;
    this.posY = y;
    this.vel = 4;
    this.ancho = 100;
    this.alto = 220;
    this.sprites = imgsProta;

    this.frameActual = 0;
    this.contador = 0;
    this.mirandoIzquierda = false;
    this.estaMovindose = false;
  }

  mover(posXPuerta0, posXPuerta4) {
    let desplaX = 0;
    this.estaMovindose = false;


    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.mirandoIzquierda = true;
      this.estaMovindose = true;


      if (posXPuerta0 < width / 2) {
        desplaX = this.vel;
      }
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.mirandoIzquierda = false;
      this.estaMovindose = true;


      if (posXPuerta4 > width / 2) {
        desplaX = -this.vel;
      }
    }


    if (this.estaMovindose) {
      this.contador++;
      if (this.contador % 5 === 0) {
        this.frameActual = (this.frameActual + 1) % 6;
      }
    } else {
      this.frameActual = 6; // Quieto
    }

    return desplaX;
  }

  dibujar() {
    push();
    translate(this.posX, this.posY);
    imageMode(CENTER);

    if (this.mirandoIzquierda) {
      scale(-1, 1);
    }

    if (this.sprites[this.frameActual]) {
      image(this.sprites[this.frameActual], 0, 0, this.ancho, this.alto);
    }
    pop();
  }
}


//---------------------------------------CLASE PASILLO--------------------------------------


class Pasillo {
  constructor() {
   this.posX = 0;
    this.anchoPasillo = width * 2; 
    this.img = imgPasillo;
  }

  mover(desplaX) {
    this.posX += desplaX;

    if (this.posX >= this.anchoPasillo) {
      this.posX -= this.anchoPasillo;
    } else if (this.posX <= -this.anchoPasillo) {
      this.posX += this.anchoPasillo;
    }
  }

  dibujar() {
    push();
    imageMode(CORNER);
    //lo dibujamos dos veces mas el pasillo a los lados porque quedo corto
    image(this.img, this.posX, 0, this.anchoPasillo, height);
    image(this.img, this.posX + this.anchoPasillo, 0, this.anchoPasillo, height);
    image(this.img, this.posX - this.anchoPasillo, 0, this.anchoPasillo, height);

    pop();
  }
}
//---------------------------CLASE PUERTA---------------------------------------

class Puerta {
  constructor(x, y, i) {
    this.posX = x;
    this.posY = y;
    this.ancho = 130;
    this.alto = 230;
    this.imgPuerta = imgsPuerta[i];
  }

  mover(desplaX) {
    this.posX += desplaX;
  }


  dibujar() {
    push();
    imageMode(CENTER);
    image(this.imgPuerta, this.posX, this.posY, this.ancho, this.alto);
    pop();
  }
}

//---------------------------------------CLASE HABITACION--------------------------------------
class Habitacion {
  constructor(numero, imagenHabitacion) {
    this.nHabitacion = numero; 
    this.imgHabitacion = imagenHabitacion;

    // Botón flecha para volver
    this.btnX = 60;
    this.btnY = 60;
    this.btnAncho = 50;
    this.btnAlto = 50;
  }

  dibujar() {
    push(); 
    background(0); 

    if (this.imgHabitacion) {
      image(this.imgHabitacion, 0, 0, width, height);
    }
   
    // Caja de la flecha
    rectMode(CENTER);
    fill(0, 100); 
   
    rect(this.btnX, this.btnY, this.btnAncho, this.btnAlto, 10);
    
    // Flecha para volver al pasillo
    fill(255);
    noStroke();
    triangle(this.btnX + 6, this.btnY - 12, this.btnX + 6, this.btnY + 12, this.btnX - 10, this.btnY);

    pop(); 
  }

  verificarClic(mx, my) {
    return mx > this.btnX - this.btnAncho / 2 && 
           mx < this.btnX + this.btnAncho / 2 && 
           my > this.btnY - this.btnAlto / 2 && 
           my < this.btnY + this.btnAlto / 2;
  }
}
