
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
  constructor(numero, imagenHabitacion, imgsObj, imgBoton) {
    this.nHabitacion = numero; 
    this.imgHabitacion = imagenHabitacion;
    this.imgsObj = imgsObj;
    this.imgBoton = imgBoton;

    this.objSeleccionado = -1;  

    // Los objetos mostrados
    this.anchoObj = 300; 
    this.altoObj = 160;  
    this.xObj = (width - this.anchoObj) / 2; 
    this.yObj = 20;

    // Control de elecciones de 3 segundos
    this.eleccionActiva = null; 
    this.tiempoInicioTexto = 0; 
    this.duracionTexto = 3000;  

    // Pregunta y opciones de respuesta
    this.anchoPregunta = 450;
    this.altoPregunta = 180;
    this.yPregunta = 190; 

    this.anchoBotonRespuesta = 90;
    this.altoBotonRespuesta = 35;
    this.yBotonesRespuesta = 300;

    this.xBtnSi = width / 2 - 110;
    this.xBtnNada = width / 2;
    this.xBtnIndeciso = width / 2 + 110;

    // Respuestas
    this.anchoRespuesta = 350;
    this.altoRespuesta = 150;
    this.yRespuesta = 260; 

    this.diametroBtn = 30;
    this.tiempoActual = 0;
    this.xResp = 0;
    this.sobreSi = false;
    this.sobreNada = false;
    this.sobreIndeciso = false;

    this.botones = [];
    this.inicializarBotones();
  }

  dibujar() {
    push(); 
    background(0); 

    if (this.imgHabitacion) {
      image(this.imgHabitacion, 0, 0, width, height);
    }

    if (this.eleccionActiva === null) {
      for (let i = 0; i < this.botones.length; i++) {
        this.botones[i].dibujar();
      }
    }

    if (this.objSeleccionado !== -1 && this.eleccionActiva === null) {
      imageMode(CORNER); 
      if (this.imgsObj[this.objSeleccionado]) {
        image(this.imgsObj[this.objSeleccionado], this.xObj, this.yObj, this.anchoObj, this.altoObj);
      }
      if (imgTextoEleccion) {
        image(imgTextoEleccion, (width - this.anchoPregunta) / 2, this.yPregunta, this.anchoPregunta, this.altoPregunta);
      }

      imageMode(CENTER);
      if (imgBotonSi) image(imgBotonSi, this.xBtnSi, this.yBotonesRespuesta, this.anchoBotonRespuesta, this.altoBotonRespuesta);
      if (imgBotonNada) image(imgBotonNada, this.xBtnNada, this.yBotonesRespuesta, this.anchoBotonRespuesta, this.altoBotonRespuesta);
      if (imgBotonIndeciso) image(imgBotonIndeciso, this.xBtnIndeciso, this.yBotonesRespuesta, this.anchoBotonRespuesta, this.altoBotonRespuesta);
    }

    if (this.eleccionActiva !== null) {
      this.tiempoActual = millis();
      if (this.tiempoActual - this.tiempoInicioTexto < this.duracionTexto) {
        imageMode(CORNER);
        this.xResp = (width - this.anchoRespuesta) / 2;
        if (this.eleccionActiva === "SI" && imgTextoSi) {
          image(imgTextoSi, this.xResp, this.yRespuesta, this.anchoRespuesta, this.altoRespuesta);
        } else if (this.eleccionActiva === "NADA" && imgTextoNada) {
          image(imgTextoNada, this.xResp, this.yRespuesta, this.anchoRespuesta, this.altoRespuesta);
        } else if (this.eleccionActiva === "INDECISO" && imgTextoIndeciso) {
          image(imgTextoIndeciso, this.xResp, this.yRespuesta, this.anchoRespuesta, this.altoRespuesta);
        }
      } else {
        this.eleccionActiva = null;
        this.objSeleccionado = -1;
      }
    }

    pop(); 
  }

  inicializarBotones() {
    if (this.nHabitacion === 0) {
      this.botones.push(new BotonObjeto(200, 70, this.diametroBtn, 0, this.imgBoton));
      this.botones.push(new BotonObjeto(350, 240, this.diametroBtn, 1, this.imgBoton));
    } else if (this.nHabitacion === 1) {
      this.botones.push(new BotonObjeto(190, 225, this.diametroBtn, 2, this.imgBoton));
      this.botones.push(new BotonObjeto(420, 330, this.diametroBtn, 3, this.imgBoton));
      this.botones.push(new BotonObjeto(690, 350, this.diametroBtn, 4, this.imgBoton));
    } else if (this.nHabitacion === 2) {
      this.botones.push(new BotonObjeto(230, 230, this.diametroBtn, 5, this.imgBoton));
      this.botones.push(new BotonObjeto(670, 250, this.diametroBtn, 6, this.imgBoton));
      this.botones.push(new BotonObjeto(570, 190, this.diametroBtn, 7, this.imgBoton));
    } else if (this.nHabitacion === 3) {
      this.botones.push(new BotonObjeto(479, 302, this.diametroBtn, 8, this.imgBoton));
      this.botones.push(new BotonObjeto(709, 139, this.diametroBtn, 9, this.imgBoton));
      this.botones.push(new BotonObjeto(493, 44, this.diametroBtn, 10, this.imgBoton));
    } else if (this.nHabitacion === 4) {
      this.botones.push(new BotonObjeto(268, 212, this.diametroBtn, 11, this.imgBoton));
      this.botones.push(new BotonObjeto(700, 87, this.diametroBtn, 12, this.imgBoton));
      this.botones.push(new BotonObjeto(710, 217, this.diametroBtn, 13, this.imgBoton));
    }
  }

  verificarClic(mx, my) {
    if (this.eleccionActiva !== null) return null;

    if (this.objSeleccionado !== -1) {
      this.sobreSi = mx > this.xBtnSi - this.anchoBotonRespuesta / 2 && mx < this.xBtnSi + this.anchoBotonRespuesta / 2 &&
                    my > this.yBotonesRespuesta - this.altoBotonRespuesta / 2 && my < this.yBotonesRespuesta + this.altoBotonRespuesta / 2;
      if (this.sobreSi) { this.eleccionActiva = "SI"; this.tiempoInicioTexto = millis(); return null; }

      this.sobreNada = mx > this.xBtnNada - this.anchoBotonRespuesta / 2 && mx < this.xBtnNada + this.anchoBotonRespuesta / 2 &&
                       my > this.yBotonesRespuesta - this.altoBotonRespuesta / 2 && my < this.yBotonesRespuesta + this.altoBotonRespuesta / 2;
      if (this.sobreNada) { this.eleccionActiva = "NADA"; this.tiempoInicioTexto = millis(); return null; }

      this.sobreIndeciso = mx > this.xBtnIndeciso - this.anchoBotonRespuesta / 2 && mx < this.xBtnIndeciso + this.anchoBotonRespuesta / 2 &&
                           my > this.yBotonesRespuesta - this.altoBotonRespuesta / 2 && my < this.yBotonesRespuesta + this.altoBotonRespuesta / 2;
      if (this.sobreIndeciso) { this.eleccionActiva = "INDECISO"; this.tiempoInicioTexto = millis(); return null; }

      this.objSeleccionado = -1;
      return null; 
    }

    for (let i = 0; i < this.botones.length; i++) {
      if (this.botones[i].estaSobre(mx, my)) {
        this.objSeleccionado = this.botones[i].idImagen; 
        this.eleccionActiva = null; 
        return null; 
      }
    }

    return null;
  }
}
//---------------------------------------CLASE TELEFONO--------------------------------------
class Telefono {
  constructor(x, y, ancho, alto, img) {
    this.posX = x;
    this.posY = y;
    this.ancho = ancho;
    this.alto = alto;
    this.imgTelefono = img;
  }

  dibujar() {
    push();
    imageMode(CENTER);
    if (this.imgTelefono) {
      if (this.estaSobre(mouseX, mouseY)) {
        image(this.imgTelefono, this.posX, this.posY, this.ancho * 1.05, this.alto * 1.05);
      } else {
        image(this.imgTelefono, this.posX, this.posY, this.ancho, this.alto);
      }
    }
    pop();
  }

  estaSobre(mx, my) {
    return (
      mx > this.posX - this.ancho / 2 &&
      mx < this.posX + this.ancho / 2 &&
      my > this.posY - this.alto / 2 &&
      my < this.posY + this.alto / 2
    );
  }
}

//---------------------------------------CLASE POLICIA--------------------------------------
class Policia {
  constructor(x, y) {
    this.posX = 400;
    this.posY = 160;
    this.ancho = 550; 
    this.alto = 470;
    this.estado = 0;  // 0: normal, 1: enojado, 2: amable
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  dibujar() {
    push();
    imageMode(CENTER);
    if (imgsPolicia && imgsPolicia[this.estado]) {
      image(imgsPolicia[this.estado], this.posX, this.posY, this.ancho, this.alto);
    }
    pop();
  }
}

//---------------------------------------CLASE BOTON OBJETO--------------------------------------
class BotonObjeto {
  constructor(x, y, diametro, idImagen, imgBoton) {
    this.posX = x;
    this.posY = y;
    this.diametro = diametro; 
    this.idImagen = idImagen; 
    this.imgBoton = imgBoton;

    this.d = diametro;
    this.distancia = 0;
  }

  dibujar() {
    push();
    imageMode(CENTER);
    
    this.d = this.diametro;
    if (this.estaSobre(mouseX, mouseY)) {
      this.d = this.diametro * 1.15; 
    }

    if (this.imgBoton) {
      image(this.imgBoton, this.posX, this.posY, this.d, this.d);
    } else {
      fill(200, 150);
      stroke(255);
      ellipse(this.posX, this.posY, this.d);
    }
    
    pop();
  }

  estaSobre(mx, my) {
    this.distancia = dist(mx, my, this.posX, this.posY);
    return this.distancia < this.diametro / 2;
  }
}
