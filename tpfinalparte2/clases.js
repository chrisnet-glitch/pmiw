
//------------------------------------CLASE PERSONAJE----------------------------------
class Personaje {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.vel = 4;
    
    this.ancho = 100;  
    this.alto = 220;   
    
    this.sprites = [];
    for (let i = 0; i <= 6; i++) {
      this.sprites.push(loadImage("data/prota" + i + ".png"));
    }
    
    this.frameActual = 0;
    this.timerAnimacion = 0;
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
      this.timerAnimacion++;
      if (this.timerAnimacion % 5 === 0) {
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
    this.img = loadImage("data/pasillo.png");
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
    //lo dibujamos dos veces el pasillo porque quedo corto
    image(this.img, this.posX, 0, this.anchoPasillo, height);
    image(this.img, this.posX + this.anchoPasillo, 0, this.anchoPasillo, height);
    image(this.img, this.posX - this.anchoPasillo, 0, this.anchoPasillo, height);
    
    pop();
  }
}
//---------------------------CLASE PUERTA---------------------------------------

class Puerta {
  constructor(x, y, index) {
    this.posX = x;
    this.posY = y;
    this.ancho = 130;  
    this.alto = 230;
    
 
 this.imgPuerta = loadImage("data/puerta" + index + ".png");
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
