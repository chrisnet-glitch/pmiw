let imgInicio;
let principal;

function preload() {

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
