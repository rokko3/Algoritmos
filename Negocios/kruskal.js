function encontrarMSTKruskal() {
    // Ordenar las aristas por peso
    let aristasOrdenadas = [...aristas].sort((a, b) => a.peso - b.peso);
    // Se obtiene el arreglo de las aristas, usamos la funcion sorto rdena el array de aristas de menor a mayor peso
    // indica que si el peso de a es menor que el de b, a se coloca antes en la lista.
    let padre = {};
    let rango = {};
    let mst = [];

    // Inicializar conjuntos disjuntos
    vertices.forEach(v => {
        padre[v.nombre] = v.nombre;
        rango[v.nombre] = 0;
    });

    function find(nodo) {
        if (padre[nodo] !== nodo) {
            padre[nodo] = find(padre[nodo]); // Compresión de camino
        }
        return padre[nodo];
    }

    function union(nodo1, nodo2) {
        let raiz1 = find(nodo1);
        let raiz2 = find(nodo2);

        if (raiz1 !== raiz2) {
            if (rango[raiz1] > rango[raiz2]) {
                padre[raiz2] = raiz1;
            } else if (rango[raiz1] < rango[raiz2]) {
                padre[raiz1] = raiz2;
            } else {
                padre[raiz2] = raiz1;
                rango[raiz1]++;
            }
        }
    }

    // Construir el MST
    for (let arista of aristasOrdenadas) {
        let { vertice1, vertice2, peso } = arista;
        if (find(vertice1.nombre) !== find(vertice2.nombre)) {
            mst.push(arista);
            union(vertice1.nombre, vertice2.nombre);
        }
    }

    console.log("Árbol de expansión mínima (MST):", mst);
    return mst;
}