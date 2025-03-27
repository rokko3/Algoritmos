function encontrarTSP() {
    if (vertices.length === 0) {
        console.log("No hay vertices para calcular TSP");
        return [];
    }

    let visitado = new Set();
    let recorrido = [];
    let actual = vertices[0]; // Comenzamos en el primer vertice
    visitado.add(actual.nombre);
    recorrido.push(actual);

    while (recorrido.length < vertices.length) {
        let siguiente = null;
        let menorDistancia = Infinity;

        for (let arista of aristas) {
            let { vertice1, vertice2, peso } = arista;
            if (vertice1.nombre === actual.nombre && !visitado.has(vertice2.nombre) && peso < menorDistancia) {
                siguiente = vertice2;
                menorDistancia = peso;
            } else if (vertice2.nombre === actual.nombre && !visitado.has(vertice1.nombre) && peso < menorDistancia) {
                siguiente = vertice1;
                menorDistancia = peso;
            }
        }

        if (siguiente) {
            visitado.add(siguiente.nombre);
            recorrido.push(siguiente);
            actual = siguiente;
        } else {
            console.log("No se pudo completar el recorrido");
            return recorrido;
        }
    }

    // Regresar al inicio
    recorrido.push(vertices[0]);

    console.log("Recorrido TSP:", recorrido.map(v => v.nombre));
    return recorrido;
}
