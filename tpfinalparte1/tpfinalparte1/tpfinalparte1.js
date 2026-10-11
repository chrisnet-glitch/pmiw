// Trabajo Practico Final Parte 1

//Minardi Ciro, Caro Chris

let texto;
let pantalla = 0;
let imgInicio;
let imgTitulo;
let img = [];
let btn0, btn1, btn2a, btn3b, btn4a, btn5b, btn6a, btn7b;
let cancion;


let tamtitulo = 2.0;

let tiempoCreditos = 0;

function preload() {
  texto = loadStrings("data/casatomadaprueba.txt");
  imgInicio = loadImage("data/Pinicio.png");
  imgTitulo = loadImage("data/titulo.png");

  for (let i = 1; i <= 14; i++) {
    img[i] = loadImage("data/pnt" + i + ".png");
  }

  btn0 = loadImage("data/btn0.png");
  btn1 = loadImage("data/btn1.png");
  btn2a = loadImage("data/btn2a.png");
  btn3b = loadImage("data/btn3b.png");
  btn4a = loadImage("data/btn4a.png");
  btn5b = loadImage("data/btn5b.png");
  btn6a = loadImage("data/btn6a.png");
  btn7b = loadImage("data/btn7b.png");

  cancion = loadSound("data/dread.mp3");
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(0);

  if (pantalla === 0) {
    pantallaInicio();
  } else if (pantalla === 1) {
    dibujarpantallas(img[1], 1, true, btn1);
  } else if (pantalla === 2) {
    dibujarpantallas(img[2], 2, true, btn1);
  } else if (pantalla === 3) {
    pantallaDecision(3, btn2a, btn3b);
  } else if (pantalla === 4) {
    pantallaDecision(4, btn4a, btn5b);
  } else if (pantalla === 5) {
    dibujarpantallas(img[5], 5, true, btn1);
  } else if (pantalla === 6) {
    pantallaDecision(6, btn6a, btn7b);
  } else if (pantalla === 7) {
    dibujarpantallas(img[7], 7, true, btn1);
  } else if (pantalla === 8) {
    pantallaFinal(8, true, btn1);
  } else if (pantalla === 9) {
    dibujarpantallas(img[9], 9, true, btn1);
  } else if (pantalla === 10) {
    dibujarpantallas(img[10], 10, true, btn1);
  } else if (pantalla === 11) {
    pantallaFinal(11, true, btn1);
  } else if (pantalla === 12) {
    dibujarpantallas(img[12], 12, true, btn1);
  } else if (pantalla === 13) {
    dibujarpantallas(img[13], 13, true, btn1);
  } else if (pantalla === 14) {
    pantallaFinal(14, true, btn1);
  } else if (pantalla === 15) {
    pantallaCreditos();
  }
}

function pantallaInicio() {
  image(imgInicio, 0, 0, width, height);

  imageMode(CENTER);
  
  if (tamtitulo > 1.0) {
    tamtitulo -= 0.03;
    if (tamtitulo < 1.0) {
      tamtitulo = 1.0;
    }
  }

  let anchoActual = 530 * tamtitulo;
  let altoActual = 250 * tamtitulo;

  image(imgTitulo, width / 2, height / 2 - 60, anchoActual, altoActual);
  imageMode(CORNER);

  dibujarBotonImagen(width / 2, height / 2 + 50, 200, 60, btn0);
}

function dibujarpantallas(imagenFondo, numPantalla, tieneSiguiente, imgBotonSig) {
  image(imagenFondo, 0, 0, width, height);
  dibujarCajaTexto(numPantalla);

  if (tieneSiguiente) {
    dibujarBotonImagen(710, 395, 120, 42, imgBotonSig);
  }
}

function pantallaDecision(numPantalla, imgBtnIzq, imgBtnDer) {
  image(img[numPantalla], 0, 0, width, height);
  dibujarCajaTexto(numPantalla);

  dibujarBotonImagen(225, 395, 320, 42, imgBtnIzq);
  dibujarBotonImagen(575, 395, 320, 42, imgBtnDer);
}

function pantallaFinal(numPantalla, tieneSiguiente, imgBotonSig) {
  background(0);
  image(img[numPantalla], 0, 0, width, height);
  dibujarCajaTexto(numPantalla);
  
  if (tieneSiguiente) {
    dibujarBotonImagen(710, 395, 120, 42, imgBotonSig);
  }
}

function pantallaCreditos() {
  background(0);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  
  let movimiento = frameCount - inicioCreditos;
  text("autores = Ciro Minardi y Caro Chris \n PMIW 2026", width / 2, 100 + movimiento * 1.5);

  if (millis() - tiempoCreditos > 3000) {
    pantalla = 0;
    tamtitulo = 2.0;
  }
}

let inicioCreditos = 0;

function dibujarCajaTexto(numPantalla) {
  fill(36, 131, 107, 180);
  rectMode(CORNER);
  rect(30, 300, 740, 80, 10);

  fill(0);
  textSize(16);
  
  let indiceTexto = numPantalla - 1;
  
  if (texto && texto[indiceTexto]) {
    text(texto[indiceTexto], 45, 315, 720, 60);
  }
}

function dibujarBotonImagen(x, y, w, h, imgBoton) {
  imageMode(CENTER);
  image(imgBoton, x, y, w, h);
  imageMode(CORNER);
}

function detectarZona(x, y, ancho, alto) {
  return mouseX > x - ancho / 2 && mouseX < x + ancho / 2 &&
    mouseY > y - alto / 2 && mouseY < y + alto / 2;
}

function decisiones(pantallaIzq, pantallaDer) {
  if (detectarZona(225, 395, 320, 42)) {
    pantalla = pantallaIzq;
  } else if (detectarZona(575, 395, 320, 42)) {
    pantalla = pantallaDer;
  }
}

function mousePressed() {
  if (pantalla === 0) {
    if (detectarZona(width / 2, height / 2 + 50, 200, 60)) {
      pantalla = 1;
    }
  } else if (pantalla === 1 || pantalla === 2 || pantalla === 5 || pantalla === 7 || pantalla === 9 || pantalla === 10 || pantalla === 12 || pantalla === 13) {
    if (detectarZona(710, 395, 120, 42)) {
      if (pantalla === 1) {
        if (!cancion.isPlaying()) {
          cancion.play();
        }
        pantalla = 2;
      } else if (pantalla === 2) {
        pantalla = 3;
      } else if (pantalla === 5) {
        pantalla = 6;
      } else if (pantalla === 7) {
        pantalla = 8;
      } else if (pantalla === 9) {
        pantalla = 10;
      } else if (pantalla === 10) {
        pantalla = 11;
      } else if (pantalla === 12) {
        pantalla = 13;
      } else if (pantalla === 13) {
        pantalla = 14;
      }
    }
  } else if (pantalla === 8 || pantalla === 11 || pantalla === 14) {
    if (detectarZona(710, 395, 120, 42)) {
      pantalla = 15;
      tiempoCreditos = millis(); 
      inicioCreditos = frameCount; 
    }
  } else if (pantalla === 3) {
    decisiones(9, 4);
  } else if (pantalla === 4) {
    decisiones(12, 5);
  } else if (pantalla === 6) {
    decisiones(13, 7);
  }
}

//link video parte1 Chris- https://youtube.com/shorts/vhMOmNQzYhw?si=bX8ED2ke9dm3dTI5
//link video parte1 Ciro-https://youtu.be/-8cy2s9p64A
