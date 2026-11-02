let imgInicio;
let principal;
let imgTitulo
function preload() {

  imgInicio = loadImage("data/portada.png");
  imgTitulo = loadImage("data/titulo.png");
}

function setup() {
  createCanvas(800, 400);
  principal = new Principal(imgInicio,imgTitulo);
}

function draw() {
  background(0);
  principal.actualizar();
}

function mousePressed() {
  principal.manejarClick();
}
