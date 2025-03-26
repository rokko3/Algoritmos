class arista {
    constructor(vertice1, vertice2, peso, bidireccional) {
        this.vertice1 = vertice1;
        this.vertice2 = vertice2;
        this.peso = peso;
        this.bidireccional = bidireccional; 
        vertice1.fijo = true; // Fija el vertice despues de conectarlo 
        vertice2.fijo = true;
    }

    dibujar() {
        stroke(0); // Color de la linea del arista
        let {x: x1, y: y1} = this.vertice1;
        let {x: x2, y: y2} = this.vertice2;
        let angle = atan2(y2 - y1, x2 - x1); // Calcula el angulo entre los vertices
        let arrowSize = 10, arrowOffset = 20; 
        let newX2 = x2 - arrowOffset * cos(angle);
        let newY2 = y2 - arrowOffset * sin(angle);

        line(x1, y1, newX2, newY2); //Dibuja la linea del arista
        let midX = (x1 + newX2) / 2;
        let midY =(y1 + newY2) / 2;
        fill(0);
        text(this.peso, midX, midY); // Muestra el peso del arista

        push();
        translate(newX2, newY2);
        rotate(angle);
        fill(0);
        triangle(0, 0, -arrowSize, arrowSize/2, -arrowSize, -arrowSize/2); //Flecha del arista
        pop();

        if(this.bidireccional){ // Si el arista es bidireccional,dibuja otra flcha en el primer vertice
            let newX1 = x1 + arrowOffset * cos(angle);
            let newY1 = y1 + arrowOffset * sin(angle);
            push();
            translate(newX1, newY1);
            rotate(angle + PI);
            fill(0);
            triangle(0, 0, -arrowSize, arrowSize/2, -arrowSize, -arrowSize/2);
            pop();
        }
    }

}