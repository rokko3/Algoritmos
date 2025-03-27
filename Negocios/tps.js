// Función que implementa una heurística para aproximar la solución al Problema del Viajante (TSP)
function encontrarTSP() {
    // Si no hay vértices, no se puede calcular el recorrido TSP
    if (vertices.length === 0) {
        console.log("No hay vertices para calcular TSP");
        return [];
    }

    // Conjunto para llevar un registro de los vértices ya visitados
    let visitado = new Set();
    // Arreglo que almacenará el recorrido del TSP
    let recorrido = [];
    // Se inicia en el primer vértice de la lista
    let actual = vertices[0];
    // Se marca el vértice inicial como visitado y se agrega al recorrido
    visitado.add(actual.nombre);
    recorrido.push(actual);

    // Mientras el recorrido no incluya todos los vértices
    while (recorrido.length < vertices.length) {
        let siguiente = null;      // Variable para almacenar el próximo vértice a visitar
        let menorDistancia = Infinity; // Inicialmente se asigna una distancia infinita para encontrar el mínimo

        // Se recorre cada arista para buscar el vértice adyacente no visitado más cercano
        for (let arista of aristas) {
            // Se desestructura la arista para obtener los vértices y el peso (distancia)
            let { vertice1, vertice2, peso } = arista;
            // Verifica si el vértice actual es vertice1 y el vértice2 aún no ha sido visitado,
            // y si la distancia de esta arista es menor que la menor distancia encontrada hasta ahora
            if (vertice1.nombre === actual.nombre && !visitado.has(vertice2.nombre) && peso < menorDistancia) {
                siguiente = vertice2;
                menorDistancia = peso;
            // Si el vértice actual es vertice2, se realiza la misma verificación con vertice1
            } else if (vertice2.nombre === actual.nombre && !visitado.has(vertice1.nombre) && peso < menorDistancia) {
                siguiente = vertice1;
                menorDistancia = peso;
            }
        }

        // Si se encontró un vértice adyacente no visitado, se actualiza el recorrido y el vértice actual
        if (siguiente) {
            visitado.add(siguiente.nombre);
            recorrido.push(siguiente);
            actual = siguiente;
        } else {
            // Si no se encuentra un vértice adyacente no visitado, se notifica y se retorna el recorrido parcial
            console.log("No se pudo completar el recorrido");
            return recorrido;
        }
    }

    // Una vez visitados todos los vértices, se regresa al vértice inicial para completar el ciclo TSP
    recorrido.push(vertices[0]);

    // Se imprime el recorrido final en consola, mostrando los nombres de los vértices en orden
    console.log("Recorrido TSP:", recorrido.map(v => v.nombre));
    // Se retorna el arreglo que contiene el recorrido completo del TSP
    return recorrido;
}

