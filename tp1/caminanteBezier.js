class Caminante {

    constructor(cadena_) {
        this.cadena = cadena_;
        this.cantidadPasos = 50;
        this.paso = 0;
        this.contTramo = 0;
        this.anteX = -1;
        this.anteY = -1;
    }

    avanzar() {
        this.paso++;
        if(this.paso > this.cantidadPasos){
            this.paso = 0;
            this.contTramo++;
        }
    }

    dibujar() { 
        if(this.contTramo < this.cadena.lista.length) {
            let c = this.cadena.lista[this.contTramo];
            let pos = map(this.paso, 0, this.cantidadPasos, 0.0, 1, 0);

            let esteX = bezierPoint(c.x1_, c.x2_, c.x3_, c.x4_, pos);
            let esteY = bezierPoint(c.y1_, c.y2_, c.y3_, c.y4_, pos);

            if(this.anteX != -1){
                line(this.anteX, this.anteY, esteX, esteY);
            }

            this.anteX = esteX;
            this.anteY = esteY;
        }
    }
}
