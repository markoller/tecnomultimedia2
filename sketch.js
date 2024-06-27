//---SONIDO---
let monitorear = false;

let FREC_MIN = 150;
let FREC_MAX = 800;
let FREC;

let AMP_MIN = 0.009;
let AMP_MAX = 0.08;
let AMP;

let mic;
let pitch;
let audioContext;

let gestorAmp;
let gestorPitch;

let haySonido;
let antesHabiaSonido;

const pitchModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

//---TEACHABLE MACHINE---
let classifier;
const options = { probabilityThreshold: 0.8 };
let label;
let soundModel = 'https://teachablemachine.withgoogle.com/models/1wnCX0-l3/';
let chasquidoEjecutandose;

//---CAMINANTES Y CURVAS---
let grosorEstablecido = null;
let estado = 0;

let cadenas = [];
let caminantes = [];
let numCadenas = 6;
let caminanteActual = 0;
let cantidadCadenas = 6;

let cadenasDibujadas = [];

function preload() {
  classifier = ml5.soundClassifier(soundModel + 'model.json', options);
  data = loadStrings('curvas.txt')
}

function setup() {
  createCanvas(1200, 600);

//---SONIDO---
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  classifier.classify(gotResult);

  gestorAmp =  new GestorSenial( AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);

  antesHabiaSonido = false;

}

function draw() {
  userStartAudio();

  colorMode(RGB);
  background(200);
  noFill();
  colorMode(HSB);

  

  //---SONIDO---
  gestorAmp.actualizar(mic.getLevel()); 
  FREC = gestorPitch.filtrada;
  AMP = gestorAmp.filtrada;
  haySonido = gestorAmp.filtrada > AMP_MIN;
  let inicioSonido = haySonido && !antesHabiaSonido;
  
  //console.log(FREC)

//LÓGICA DE ESTADOS
//ESTADO 0

  if(estado === 0 && inicioSonido) {
    //definición de grosor de cadenas  
      if (AMP < AMP_MAX) {
        grosorEstablecido = 50;
      } else {
        grosorEstablecido = 70;
      }

    for(let i = 0; i < numCadenas; i++){
      let estaCad = new Cadena(data, cadenasDibujadas);
      cadenas.push(estaCad);
    }
      
      for (let i = 0; i < cadenas.length; i++) {
        let grafico = createGraphics(1200, height)
        let estecam = new Caminante(cadenas[i], grosorEstablecido, grafico);
        caminantes.push(estecam);
      }

      estado = 1;
    }

    //ESTADO 1

  if (estado === 1) {
    if(haySonido){
    //   for (let i = 0; i < cadenas.length; i++) {
    //     cadenas[i].dibujar();
    // }
      if(caminanteActual < caminantes.length) {
        let caminante = caminantes[caminanteActual];
        caminante.dibujar();
        caminante.avanzar();

        if(caminante.termino){
          caminanteActual++;
        }
      }    
    } else {
      if(caminanteActual < caminantes.length) {
        let caminante = caminantes[caminanteActual];
        if(!caminante.termino){
          caminante.reiniciar();
        }
      }
    }

    for(let i = 0; i < caminantes.length; i++) {
      tint(200, 4, 100, 0.7);
      image(caminantes[i].grafico, 0, 0);
    }
    
    if(label == "Chasquido" && !chasquidoEjecutandose && AMP >= 0.005){
      chasquidoEjecutandose = true;
      console.log(AMP);
      eliminarUno();
    } 
    if (label != "Chasquido") {
      chasquidoEjecutandose = false;
    }
  } 

  antesHabiaSonido =  haySonido;

    if(monitorear){
      gestorAmp.dibujar(100, 100);
      gestorPitch.dibujar(100, 300);
    }
  }

  function eliminarUno() {
    if(caminantes.length > 0){
      caminantes[0].grafico.remove();
      caminantes.shift();
      caminanteActual = max(0, caminanteActual - 1);

      if(caminantes.length < cantidadCadenas) {
        nuevoCaminante();
      }
    }
  }

  function nuevoCaminante() {
    let nuevaCadena = new Cadena(data, cadenasDibujadas);
    cadenas.push(nuevaCadena);

    let grafico = createGraphics(1200, height);
    let nuevoCaminante = new Caminante(nuevaCadena, grosorEstablecido, grafico);
    nuevoCaminante.caminanteColor(FREC);
    caminantes.push(nuevoCaminante);
    console.log('Nuevo caminante creado. Total caminantes:', caminantes.length);
  }

  //DETECCION DE FRECUENCIA
  function startPitch() {
    pitch = ml5.pitchDetection(pitchModel, audioContext , mic.stream, modelLoaded);
  }
  
  function modelLoaded() {
    getPitch();
  }
  
  function getPitch() {
    pitch.getPitch(function(err, frequency) {
      if (frequency) {
        gestorPitch.actualizar(frequency);
        frec = gestorPitch.filtrada;
      } else {
      }
      getPitch();
    })
  }

  //CLASIFICADOR

  function gotResult(error, results) {
    // Display error in the console
    if (error) {
      console.error(error);
    }
    // The results are in an array ordered by confidence.
    console.log(results);
    label = results[0].label;
    //console.log(label);
    
  }