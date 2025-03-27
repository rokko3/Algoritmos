// Función que implementa el algoritmo de Floyd-Warshall para encontrar
// las distancias más cortas entre todos los pares de vértices de un grafo.
function floydWarshall(vertices, aristas) {
    // n: número de vértices en el grafo.
    let n = vertices.length;
    
    // Se crea una matriz 'dist' de n x n, inicializada con Infinity en todas sus posiciones.
    // Esto representa las distancias iniciales entre cada par de vértices.
    let dist = Array(n).fill().map(() => Array(n).fill(Infinity));

    // Inicialización de la matriz de distancias:
    // La distancia de cualquier vértice a sí mismo se establece en 0.
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0; // Distancia de un nodo a sí mismo es 0.
    }
    
    // Para cada arista, se actualizan las distancias directas entre los vértices conectados.
    for (let arista of aristas) {
        // Se obtienen los nombres (o índices) de los vértices conectados por la arista.
        let u = arista.vertice1.nombre;
        let v = arista.vertice2.nombre;
        let peso = arista.peso;
        
        // Se establece el peso de la arista como la distancia directa entre los vértices u y v.
        dist[u][v] = peso;
        // Para un grafo no dirigido, se asigna también la distancia de v a u.
        dist[v][u] = peso;
    }

    // Aplicar el algoritmo de Floyd-Warshall:
    // Se evalúa cada vértice 'k' como intermediario potencial entre los vértices 'i' y 'j'.
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Se actualiza la distancia entre i y j si pasar por k reduce la distancia total.
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Se imprime la matriz de distancias más cortas en la consola para verificación.
    console.log("Matriz de distancias más cortas:");
    console.table(dist);
    
    // Se retorna la matriz de distancias resultante.
    return dist;
}

