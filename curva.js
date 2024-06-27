class Curva{

    constructor(x1, y1, x4, y4, radio, anguloInicial = null){
            this.x1_ = x1;
            this.y1_ = y1;
            this.x4_ = x4;
            this.y4_ = y4;
            this.radio1 = radio * random(0.5, 1.5);
            this.radio2 = radio * random(0.5, 1.5);

            if(anguloInicial !== null){
                this.angulo1 = anguloInicial;
            } else {
                this.angulo1 = random(TWO_PI);
            }
            this.angulo2 = random(TWO_PI);
            
            this.setAngulo1(this.angulo1);
            this.setAngulo2(-this.angulo1);

    }

    dibujar(){
        bezier(this.x1_, this.y1_, this.x2_, this.y2_, this.x3_, this.y3_, this.x4_, this.y4_);

    }

    setAngulo1(nuevoAngulo) {
        this.angulo1 = nuevoAngulo;
        this.x2_ = this.x1_ + this.radio1 * cos(this.angulo1);
        this.y2_ = this.y1_ + this.radio1 * sin(this.angulo1);
    }
    
    setAngulo2(nuevoAngulo) {
        this.angulo2 = nuevoAngulo;
        let dx = this.radio2 * cos(this.angulo2);
        let dy = this.radio2 * sin(this.angulo2);
        this.x3_ = this.x4_ + dx;
        this.y3_ = this.y4_ + dy;
    }

    setRadio1(nuevoRadio){
        this.radio1 = nuevoRadio; 
        this.x2_ = this.x1_ + this.radio1 * cos(this.angulo1);
        this.y2_ = this.y1_ + this.radio1 * sin(this.angulo1);
    }
        
    setRadio2(nuevoRadio){
        this.radio2 = nuevoRadio; 
        this.x3_ = this.x4_ + this.radio2 * cos(this.angulo2);
        this.y3_ = this.y4_ + this.radio2 * sin(this.angulo2);
    }
}