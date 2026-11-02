let imgInicio;
let principal;
let imgTitulo;
let imgPasillo;
let imgsProta = [];
let imgsPuerta = [];

function preload() {
  // Pantalla inicial
  imgInicio = loadImage("data/portada.png");
  imgTitulo = loadImage("data/titulo.png");

  // Pasillo
  imgPasillo = loadImage("data/pasillo.png");

  // Sprites del Personaje
  for (let i = 0; i <= 6; i++) {
    imgsProta[i] = loadImage("data/prota" + i + ".png");
  }

  // Imágenes de las Puertas 
  for (let i = 0; i <= 4; i++) {
    imgsPuerta[i] = loadImage("data/puerta" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 400);
  principal = new Principal(imgInicio, imgTitulo);
}

function draw() {
  background(0);
  principal.actualizar();
}

function mousePressed() {
  principal.manejarClick();
}
