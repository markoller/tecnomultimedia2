class Cadena {

    constructor(data, seleccionesHechas) {
        this.grosor = 50;
        this.curvas = this.parseCurvas(data);
        this.seleccion = this.seleccionarCurva(seleccionesHechas);
        console.log(this.seleccion);
    }

    seleccionarCurva(seleccionesHechas) {
        let seleccion;
        do {
            seleccion = int(random(this.curvas.length));
        } while (seleccionesHechas.includes(seleccion));
        seleccionesHechas.push(seleccion);
        return seleccion;
    }
    
    parseCurvas(data) {
        return data.map(line => 
        line.split(';').map(segment => {
            let [x, y, c1x, c1y, c2x, c2y, ex, ey] = segment.split(',').map(Number);
            return {x, y, c1x, c1y, c2x, c2y, ex, ey};
        })
        );
    }
    
    dibujarCurva() {
        strokeWeight(this.grosor);
        let curva = this.curvas[this.seleccion];
        
        beginShape();
        vertex(curva[0].x, curva[0].y);
        for (let i = 0; i < curva.length; i++) {
        bezierVertex(curva[i].c1x, curva[i].c1y, curva[i].c2x, curva[i].c2y, curva[i].ex, curva[i].ey);
        }
        endShape();
    }
    getCurva() {
        return this.curvas[this.seleccion];
    }
    }