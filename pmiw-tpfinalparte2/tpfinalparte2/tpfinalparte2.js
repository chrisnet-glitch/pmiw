/*TRABAJO FINAL PARTE 2 - VIDEO JUEGO 
Cuento: "Casa tomada"
/Chris Caro - Ciro Minardi - PMIW 2026

Link Chris: https://youtube.com/shorts/OHzCfqUNOI0?si=IvFbz1gC-Y0FHne4

Link Ciro:https://youtu.be/WxwySiKsYE4

*/
let imgInicio;
let principal; 
let imgTitulo;
let imgPasillo;
let imgsProta = [];
let imgsPuerta = [];
let imgsHabitacion = [];
let imgTelefono;
let imgsObj = [];
let imgBotonObj;
let imgsPolicia = [];
let imgTextoEleccion;
let imgBotonSi, imgBotonNada, imgBotonIndeciso;
let imgTextoSi, imgTextoNada, imgTextoIndeciso;
let imgPoliBoton;
let imgsVidas = [];
let imgInstrucciones;
let sonido;

function preload() {
  imgInicio = loadImage("data/portada.png");
  imgTitulo = loadImage("data/titulo.png");

  imgPasillo = loadImage("data/pasillo.png");

  for (let i = 0; i <= 6; i++) {
    imgsProta[i] = loadImage("data/prota" + i + ".png");
  }

  for (let i = 0; i <= 4; i++) {
    imgsPuerta[i] = loadImage("data/puerta" + i + ".png");
  }
  for (let i = 0; i < 5; i++) {
    imgsHabitacion[i] = loadImage("data/habitacion" + i + ".png");
  }

  imgTelefono = loadImage("data/telefono.png");
  imgPoliBoton = loadImage("data/poliboton.png");
  imgsPolicia[0] = loadImage("data/policia.png");        // Estado normal
  imgsPolicia[1] = loadImage("data/policiaenojado.png"); // Estado enojado
  imgsPolicia[2] = loadImage("data/policiaamable.png");  // Estado amable

  imgBotonObj = loadImage("data/botonObj.png");

  for (let i = 0; i < 14; i++) {
    imgsObj[i] = loadImage("data/obj" + i + ".png");
  }

  imgTextoEleccion = loadImage("data/textoeleccion.png");
  imgBotonSi = loadImage("data/botonsi.png");
  imgBotonNada = loadImage("data/botonnada.png");
  imgBotonIndeciso = loadImage("data/botonindeciso.png");
  imgTextoSi = loadImage("data/textosi.png");
  imgTextoNada = loadImage("data/textonada.png");
  imgTextoIndeciso = loadImage("data/textoindeciso.png");


  for (let i = 0; i <= 2; i++) {
    imgsVidas[i] = loadImage("data/vida" + i + ".png");
  }
  imgInstrucciones = loadImage("data/instrucciones.png");

  sonido = loadSound ("data/dread.mp3");
}

function setup() {
  createCanvas(800, 400);
  principal = new Principal(imgInicio, imgTitulo, imgsHabitacion);
  sonido = new Sonido ();
}

function draw() {
  background(0);
  principal.actualizar();
}

function mousePressed() {
  principal.manejarClick();
  sonido.reproducir();
}
