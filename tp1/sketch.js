let cadenas = [];
let otraCadena = [];
let camina;

function setup() {
  createCanvas(1000, 600);
  

  for (let i = 0; i < random(4, 6); i++) {
    let estaCad = new Cadena();
    for (let j = 0; j < 2; j++) {
      estaCad.click(random(-100, width + 100), random(-100, height + 100));
    }
    estaCad.fin();
    cadenas.push(estaCad);
  }

  this.otraCadena = new Cadena(); 

  for (let j = 0; j < 2; j++) {
    this.otraCadena.click(random(100, width - 100), random(100, height - 100));
  }
  this.otraCadena.fin();

  this.camina = new Caminante(this.otraCadena);

}

function draw() {
  background(220);
  noFill();
  
  for (let i = 0; i < cadenas.length; i++) {
    cadenas[i].dibujar();
  }

  this.otraCadena.dibujar();

  this.camina.dibujar();
  this.camina.avanzar();
}

function mousePressed() {
  if(mouseButton == RIGHT) {
    cadenas.pop();
  }
}
