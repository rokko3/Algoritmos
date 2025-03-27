function encontrarMSTPrim() {
    if (vertices.length === 0) {
        console.log("No hay vertices en el grafo");
        return [];
    }

    let mst = []; // Lista de aristas del MST
    let visitados = new Set(); // Conjunto de vertices visitados
    let aristasPosibles = []; // Cola de prioridad para aristas disponibles

    // Seleccionamos un vertice inicial arbitrario
    let verticeInicial = vertices[0];
    visitados.add(verticeInicial.nombre);

    // Agregar todas las aristas del vertice inicial a la cola
    for (let arista of aristas) {
        if (arista.vertice1 === verticeInicial || arista.vertice2 === verticeInicial) {
            aristasPosibles.push(arista);
        }
    }

    // Ordenamos la cola de aristas por peso (menor a mayor)
    aristasPosibles.sort((a, b) => a.peso - b.peso);

    while (visitados.size < vertices.length && aristasPosibles.length > 0) {
        // Extraer la arista con menor peso
        let aristaMin = aristasPosibles.shift();
        let { vertice1, vertice2, peso } = aristaMin;

        // Determinar el nuevo vertice a agregar al MST
        let nuevoVertice = null;
        if (visitados.has(vertice1.nombre) && !visitados.has(vertice2.nombre)) {
            nuevoVertice = vertice2;
        } else if (visitados.has(vertice2.nombre) && !visitados.has(vertice1.nombre)) {
            nuevoVertice = vertice1;
        }

        if (nuevoVertice) {
            // Agregar la arista al MST
            mst.push(aristaMin);
            visitados.add(nuevoVertice.nombre);

            // Agregar nuevas aristas a la cola
            for (let arista of aristas) {
                if ((arista.vertice1 === nuevoVertice && !visitados.has(arista.vertice2.nombre)) ||
                    (arista.vertice2 === nuevoVertice && !visitados.has(arista.vertice1.nombre))) {
                    aristasPosibles.push(arista);
                }
            }

            // Ordenar la cola nuevamente
            aristasPosibles.sort((a, b) => a.peso - b.peso);
        }
    }

    console.log("Arbol de expansion minima (MST) - Prim:", mst);
    return mst;
}