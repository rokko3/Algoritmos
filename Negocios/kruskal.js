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

// Función para encontrar la raíz (representante) del conjunto al que pertenece el nodo.
// Utiliza compresión de caminos para optimizar la búsqueda.
function find(nodo) {
    // Si el nodo no es su propio padre, significa que no es la raíz.
    if (padre[nodo] !== nodo) {
        // Se realiza la llamada recursiva para encontrar la raíz y se actualiza el padre del nodo.
        padre[nodo] = find(padre[nodo]); // Compresión de camino: enlaza directamente el nodo a la raíz.
    }
    // Se retorna la raíz del conjunto.
    return padre[nodo];
}

// Función para unir dos conjuntos diferentes a los que pertenecen nodo1 y nodo2.
// Emplea unión por rango para mantener los árboles lo más planos posible.
function union(nodo1, nodo2) {
    // Se obtienen las raíces de los conjuntos a los que pertenecen nodo1 y nodo2.
    let raiz1 = find(nodo1);
    let raiz2 = find(nodo2);

    // Solo se unen si pertenecen a conjuntos diferentes.
    if (raiz1 !== raiz2) {
        // Si el rango (altura aproximada) de raiz1 es mayor, se une raiz2 a raiz1.
        if (rango[raiz1] > rango[raiz2]) {
            padre[raiz2] = raiz1;
        // Si el rango de raiz2 es mayor, se une raiz1 a raiz2.
        } else if (rango[raiz1] < rango[raiz2]) {
            padre[raiz1] = raiz2;
        // Si los rangos son iguales, se une arbitrariamente y se incrementa el rango de la nueva raíz.
        } else {
            padre[raiz2] = raiz1;
            rango[raiz1]++;
        }
    }
}

// Construir el Árbol de Expansión Mínima (MST) usando el algoritmo de Kruskal.
// Se asume que 'aristasOrdenadas' es un arreglo de aristas ordenadas de menor a mayor según su peso.
for (let arista of aristasOrdenadas) {
    // Desestructuración para obtener los vértices y el peso de cada arista.
    let { vertice1, vertice2, peso } = arista;
    
    // Se verifica que los vértices de la arista pertenezcan a conjuntos diferentes,
    // para evitar la formación de ciclos en el MST.
    if (find(vertice1.nombre) !== find(vertice2.nombre)) {
        // Se añade la arista al MST ya que conecta dos componentes disjuntos.
        mst.push(arista);
        // Se une los conjuntos de los dos vértices para reflejar la nueva conexión.
        union(vertice1.nombre, vertice2.nombre);
    }
}

// Se muestra el Árbol de Expansión Mínima (MST) en la consola.
console.log("Árbol de expansión mínima (MST):", mst);

// Se calcula el peso total del MST sumando el peso de cada arista.
const total = mst.reduce((acumulador, arista) => acumulador + arista.peso, 0);
// Se muestra el peso total en la consola.
console.log("Peso total: " + total);

// Se retorna el MST resultante.
return mst;

}