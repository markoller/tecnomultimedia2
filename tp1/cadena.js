class Cadena {

    constructor() {
        this.lista = [];
        this.x = 0;
        this.y = 0;
        this.radio = 300;
        this.estado = "primero";
        this.color = color(random(255), random(255), random(255), 190);
    }

    click(x_, y_){
        if (this.estado === "espera") {
            this.x = x_;
            this.y = y_;
            this.estado = "primero";
          } else if (this.estado === "primero") {
            let curva = new Curva(this.x, this.y, x_, y_, this.radio);
            this.lista.push(curva);
            this.estado = "siguientes";
            this.x = x_;
            this.y = y_;
          } else if (this.estado === "siguientes") {
            let ultimo = this.lista[this.lista.length - 1];
            let curva = new Curva(this.x, this.y, x_, y_, this.radio);
            curva.setAngulo1(ultimo.angulo2 + PI);
            this.lista.push(curva);
            this.x = x_;
            this.y = y_;
          } 
    }

    fin() {
        let ultimo = this.lista[this.lista.length - 1]
        let curva = new Curva(this.x, this.y, width + 100, random(0, height - 100), this.radio);
        curva.setAngulo1(ultimo.angulo2 + PI);
        this.lista.push(curva);
    }

    dibujar() {
        stroke(this.color);
        if (this.estado === "primero") {
          this.cruz(this.x, this. y);
        } else if (this.estado === "siguientes") {
          for (let i = 0; i < this.lista.length; i++) {
            this.lista[i].dibujar();
          }
        }
      }
}