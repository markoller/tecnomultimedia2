class Caminante {

    constructor(cadena_, grosor, grafico) {
        this.cadena = cadena_
        this.grosor = grosor;
        this.grafico = grafico;
        this.cantidadPasos = 30;
        this.paso = 0;
        this.contTramo = 0;
        this.anteX = -1;
        this.anteY = -1;
        this.color = color(random(1, 360), 80, 85);
        this.termino = false;
        this.curva = this.cadena.getCurva();
    }

    avanzar() {
        this.paso++;
        if(this.paso > this.cantidadPasos){
            this.paso = 0;
            this.contTramo++;
        }
        this.caminanteTermino();
    }

    reiniciar() {
        if(this.paso > 0) {
            this.grafico.clear();
        }

        this.paso = 0;
        this.contTramo = 0;
        this.anteX = 0;
        this.anteY = 0;
        this.termino = false;
    }

    dibujar() { 
        if(this.contTramo < this.curva.length) {
            let c = this.curva[this.contTramo];
            let pos = map(this.paso, 0, this.cantidadPasos, 0.0, 1, 0);

            let esteX = bezierPoint(c.x, c.c1x, c.c2x, c.ex, pos);
            let esteY = bezierPoint(c.y, c.c1y, c.c2y, c.ey, pos);

            if(this.anteX != -1){
                this.grafico.strokeWeight(this.grosor);
                this.grafico.stroke(this.color);
                this.grafico.line(this.anteX, this.anteY, esteX, esteY);
            }

            this.anteX = esteX;
            this.anteY = esteY;
        }
    }

    caminanteTermino() {
        if(this.contTramo >= this.curva.length) {
            this.contTramo = this.curva.length - 1;
            this.paso = this.cantidadPasos;
            this.termino = true;
        }
    }

    caminanteColor(frecuencia) {
        if (frecuencia >= 0.2) {
            let hue;

            if(random(0,1) < 0.5){
                hue = random(295, 360); // Tono entre 270 y 360
            } else {
                hue = random(0, 60); // Tono entre 0 y 100
            }
            this.color = color(hue, 80, 85);
            console.log("Color calido")
        } else {
            this.color = color(random(101, 240), 80, 85);
            console.log("Color frio")
        }
    }
}
