function floydWarshall(vertices, aristas) {
    let n = vertices.length;
    let dist = Array(n).fill().map(() => Array(n).fill(Infinity));

    // Inicializar la matriz de distancias
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0; // Distancia de un nodo a sí mismo es 0
    }
    
    for (let arista of aristas) {
        let u = arista.vertice1.nombre;
        let v = arista.vertice2.nombre;
        let peso = arista.peso;
        dist[u][v] = peso;
        dist[v][u] = peso; // Si el grafo es no dirigido
    }

    // Aplicar el algoritmo de Floyd-Warshall
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    console.log("Matriz de distancias más cortas:");
    console.table(dist);
    return dist;
}

