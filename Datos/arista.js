class arista {
    constructor(vertice1, vertice2, peso) {
        this.vertice1 = vertice1;
        this.vertice2 = vertice2;
        this.peso = peso;
        vertice1.fijo = true; // Fija el vertice despues de conectarlo 
        vertice2.fijo = true;
    }

    dibujar() {
        stroke(0); // Color de la línea del arista
        let { x: x1, y: y1 } = this.vertice1;
        let { x: x2, y: y2 } = this.vertice2;
    
        line(x1, y1, x2, y2); // Dibuja la línea completa
    
        // Calcular la posición correcta del peso en el centro de la línea
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;
    
        fill(0);
        textAlign(CENTER, CENTER); // Centra el texto horizontal y verticalmente
        text(this.peso, midX, midY); // Muestra el peso en el centro de la línea
    }
    
    
}