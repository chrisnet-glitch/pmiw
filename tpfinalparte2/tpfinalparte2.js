let imgInicio;
let principal;

function preload() {
  // Carga tu imagen de fondo (reemplaza 'fondo.jpg' por tu archivo)
  imgInicio = loadImage("data/portada.png");
}

function setup() {
  createCanvas(800, 400);
  principal = new Principal(imgInicio);
}

function draw() {
  background(0);
  principal.actualizar();
}

function mousePressed() {
  principal.manejarClick();
}
