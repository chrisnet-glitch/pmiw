//foxy
let sprite1 = [];
let sprite2 = [];
let spritefinal; 
let animar1;
let animar2;
//----------------
let fondo;
let pantallaFinal; 
let fondoX = -550; //para mover la posición X del fondo
let posX, posY, vel;
let anch;
let alt;

// mangle
let sprite3, sprite4, sprite5, spritefinalMangle; 
let posX2, posY2, vel2;
let anch2, alt2;
let centro = false;
let contadorPausa2 = 0;
let retrasoInicio = 120; 

// Nuevas variables para el cambio y crecimiento de Mangle
let estaticoMangle = false;
let agrandarMangle = false;
let contadorEsperaMangle = 0;
let anchof2, altof2;

let anchof, altof;
let agrandar = false;
let estatico = false;
let contadorEspera = 0;

let mostrarFinal = false; 
let animacionIniciada = false;
let tiempoAnimacion = 0;     
let tiempoFinal = 0;         

// Variables del botón de inicio
let bx, by, btam;

function preload() {
  // Carga de las imágenes de foxy
  for (let i = 0; i < 3; i++) {
    sprite1[i] = loadImage("data/fx" + i + ".png");
  }

  for (let i = 0; i < 3; i++) {
    sprite2[i] = loadImage("data/fox" + i + ".png");
  }

  // Carga del sprite que se va a agrandar de foxy
  spritefinal = loadImage("data/fxf.png");

  // Carga de las imágenes de Mangle
  sprite3 = loadImage("data/mng.png"); 
  sprite4 = loadImage("data/mg0.png");   
  sprite5 = loadImage("data/mg1.png");  
  // Carga del sprite que se va a agrandar de mangle
  spritefinalMangle = loadImage("data/mgf.png"); 

  fondo = loadImage("data/fondof.png");
  pantallaFinal = loadImage("data/fxmg.png"); 
}

//si el tiempo transcurrido superó un límite retorna un valor booleano)
function haExcedidoTiempo(tiempoActual, tiempoInicio, limite) {
  return (tiempoActual - tiempoInicio >= limite);
}


function dibujarAnimacionSprite(imgArray, indice, x, y, w, h) {
  image(imgArray[indice], x, y, w, h);
}

function setup() {
  createCanvas(800, 600);
  
  //boton de play
  bx = width / 2;
  by = height / 2;
  btam = 60;
  
  //foxy
  posX = width; 
  posY = 300;
  vel = 3; 
  animar1 = 0;
  animar2 = 0;
  anch = 180;
  alt = 200;

  // mangle
  posX2 = -150;     
  posY2 = 10;       
  vel2 = 6;
  anch2 = 130;
  alt2 = 200;       
  
  anchof2 = anch2;
  altof2 = alt2;

  anchof = anch;
  altof = alt;
}

function draw() {
  background(0);
  
  //PANTALLA DE INICIO 
  if (!animacionIniciada) {
    image(fondo, fondoX, 20, width+600, height-50);
    
    // Filtro oscuro transparente
    fill(0, 160);
    noStroke();
    rect(0, 0, width, height);

    // Botón de inicio
    fill(255);
    stroke(255);
    strokeWeight(2);
    triangle(bx - btam / 3, by - btam / 2, bx - btam / 3, by + btam / 2, bx + btam / 2, by);
    noStroke();
    return;
  }

  tiempoAnimacion++;

  //PANTALLA FINAL ---------------
  if (mostrarFinal) {
    image(pantallaFinal, fondoX, 20, width+200, height-50);
    
    if (haExcedidoTiempo(millis(), tiempoFinal, 1000)) {
      posX = width;
      posY = 300;
      fondoX = -550;
      animar1 = 0;
      animar2 = 0;
      posX2 = -150;
      posY2 = 10;
      centro = false;
      contadorPausa2 = 0;
      estaticoMangle = false;
      agrandarMangle = false;
      anchof2 = anch2;
      altof2 = alt2;
      anchof = anch;
      altof = alt;
      agrandar = false;
      estatico = false;
      mostrarFinal = false;
      animacionIniciada = false;
      tiempoAnimacion = 0;
    }
    return;
  }
  
  image(fondo, fondoX, 20, width+600, height-50);
  
  //Mangle--------------------------------------
  if (tiempoAnimacion > retrasoInicio) {
    if (!centro) {
      posX2 += vel2; // Se mueve hacia la derecha
      dibujarAnimacionSprite([sprite3], 0, posX2, posY2, anch2, alt2); 

      if (posX2 >= width / 2 - 30) {
        centro = true;
        contadorPausa2 = tiempoAnimacion;
      }
    } 
    else {
      if (!estaticoMangle && !agrandarMangle) {
        dibujarAnimacionSprite([sprite4], 0, posX2, posY2, anch2, alt2); 

        if (haExcedidoTiempo(tiempoAnimacion, contadorPausa2, 5)) {
          estaticoMangle = true;
          contadorEsperaMangle = tiempoAnimacion;
        }
      } 
      else if (estaticoMangle && !agrandarMangle) {
        dibujarAnimacionSprite([sprite5], 0, posX2, posY2, anch2, alt2);

        if (agrandar) { 
          estaticoMangle = false;
          agrandarMangle = true;
        }
      } 
      else {
        // Mangle se agranda 
        dibujarAnimacionSprite([spritefinalMangle], 0, posX2, posY2, anchof2, altof2);
        
        let incrementoMangle = 7;
        anchof2 += incrementoMangle;
        altof2 += incrementoMangle;
        
        posY2 -= incrementoMangle / 2;     
        posX2 -= incrementoMangle / 2;   
      }
    }
  }

  if (posX > 250) {
    posX -= vel;
    posY += 0.1;   
    fondoX += vel; // Desplazamiento del fondo
      
    //foxy--------------------
   
    dibujarAnimacionSprite(sprite1, animar1, posX, posY, anch, alt);
    
    if (tiempoAnimacion % 8 === 0) {
      animar1++;
      if (animar1 >= sprite1.length) {
        animar1 = 0;
      }
    }
  } else {
    if (estatico) {  // Mantiene el último fotograma quieto
      dibujarAnimacionSprite(sprite2, animar2, posX, posY, anch, alt);
      
      if (haExcedidoTiempo(tiempoAnimacion, contadorEspera, 30)) {
        estatico = false;
        agrandar = true;
        posY -= 25; // Pequeño salto hacia arriba
      }
    } 
    else if (!agrandar) {
      dibujarAnimacionSprite(sprite2, animar2, posX, posY, anch, alt);

      if (tiempoAnimacion % 6 === 0) {
        animar2++;
        if (animar2 >= sprite2.length) {
          animar2 = sprite2.length - 1; // Se queda fijo en el último fotograma
          estatico = true;             
          contadorEspera = tiempoAnimacion; 
        }
      }
    } 
    else {
      dibujarAnimacionSprite([spritefinal], 0, posX, posY, anchof, altof);
      
      let incremento = 7;
      
      anchof += incremento;
      altof += incremento;
      
      // Para que crezca hacia arriba y se mantenga centrado
      posY -= incremento;     
      posX -= incremento / 2;   

      if (anchof > 300) {
        mostrarFinal = true;
        tiempoFinal = millis(); 
      }
    }
  }
}

function mousePressed() {
  if (!animacionIniciada) {
    let distancia = dist(mouseX, mouseY, bx, by);
    if (distancia < 40) {
      animacionIniciada = true;
      tiempoAnimacion = 0;
    }
  }
}
