class vertice {
    constructor(nombre, x, y) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.radio = 20; 
        this.fijo = true; 
    }

    dibujar() {
        fill(173, 216, 230); // Da el color de relleno del vertice
        ellipse(this.x, this.y, this.radio * 2, this.radio * 2); // Dibuja vertice como un circulo
        fill(0); // Color del texto
        textAlign(CENTER, CENTER); 
        text(this.nombre, this.x, this.y); // Muestra nombre de vertice en el centro del mismo 
    }

    contiene(px, py) {
        return dist(px, py, this.x, this.y) < this.radio; //  Verifica  si un punto esta dentro del vertice
    }

    mover(x, y) {
        if (this.fijo) { // Solo se mueve si no está conectado
            let margen = this.radio; // Define la margen para evitar salir del rectangulo
            this.x = constrain(x, margen, width-margen); // Restringe el movimiento en x
            this.y = constrain(y, margen, height- margen); // Restringe el movimiento en x
        }
    }
}
