let vertices = []; 
let aristas = [];
window.lista = {};

let verticeseleccionado = null; // El vertice que se selccione puede moverse

        
        
function setup() {

    createCanvas(1000, 400); // Crea un espacio de 1000x400 pixeles
}
function draw() {
    background(255); // Color fondo blanco
    aristas.forEach(arista => arista.dibujar()); //Dibuja todos los aristas
    vertices.forEach(vertice => vertice.dibujar()); // Dibuja todos los vertices
}

function mousePressed() {

    for (let vertice of vertices) {

        if (vertice.contiene(mouseX, mouseY)) {

            verticeseleccionado = vertice; //Selecciona vertice clikeado
            return;
        }
    }
}

function mouseDragged() {

    if (verticeseleccionado) {

        verticeseleccionado.mover(mouseX, mouseY); // Mueve vertice seleccionado
    }
}

function mouseReleased() {
    verticeseleccionado = null; //Suelta el vertice seleccionado
}

function agregarvertice() {
    let nuevovertice = new vertice(vertices.length, random(50, width - 50), random(50, height - 50));
    vertices.push(nuevovertice);
    lista[nuevovertice.nombre] = []; // Agregar al vertice a la lista
}

     
function eliminarvertice() {
    let nombre = parseInt(prompt("Ingrese el nombre del vertice a eliminar:"));
    vertices = vertices.filter(vertice => vertice.nombre !== nombre);
    aristas = aristas.filter(arista => arista.vertice1.nombre !== nombre && arista.vertice2.nombre !== nombre);
    delete lista[nombre]; // Eliminar de la lista de adyacencia
    for (let key in lista) {
        lista[key] = lista[key].filter(v => v !== nombre);
    }
    //Esta funcion elimina todas las conexiones del vertice posibles
}

function conectarvertices() {
    let nombre1 = parseInt(prompt("Ingrese el nombre del primer vertice:"));
    let nombre2 = parseInt(prompt("Ingrese el nombre del segundo vertice:"));
    if (nombre1 === nombre2) {

        alert("No puedes conectar un vertice consigo mismo.");
        return;
    }
    let vertice1 = vertices.find(n => n.nombre === nombre1);
    let vertice2 = vertices.find(n => n.nombre === nombre2);
    if (!vertice1 || !vertice2) {

        alert("Uno o ambos vertices no existen.");
        return;
    }
    let peso = parseFloat(prompt("Ingrese el peso del arista (positivo):"));
    if (isNaN(peso) || peso <= 0) {

        alert("El peso debe ser un número positivo.");
        return;
    }
    aristas.push(new arista(vertice1, vertice2, peso));
    if (!lista[nombre1].includes(nombre2)) lista[nombre1].push(nombre2); //Agrega si la conexion no esta hecha para el vertice 1
    if (!lista[nombre2].includes(nombre1)) lista[nombre2].push(nombre1); //Agrega si la conexion no esta hecha en el vertice 2

}
function showdata(){
    console.log(vertices)
    console.log(aristas)
    console.log(lista)

}

function eliminararista() {

    let nombre1 = parseInt(prompt("Ingrese el nombre del primer vertice:"));
    let nombre2 = parseInt(prompt("Ingrese el nombre del segundo vertice:"));

    let aristaExistente = aristas.find(arista => 
        (arista.vertice1.nombre === nombre1 && arista.vertice2.nombre === nombre2) ||
        (arista.vertice1.nombre === nombre2 && arista.vertice2.nombre === nombre1)
    );
    if (!aristaExistente) {
        alert("El arista no existe");
        return;
    }
    aristas = aristas.filter(arista => !(arista.vertice1.nombre === nombre1 && arista.vertice2.nombre === nombre2) &&
                                        !(arista.vertice1.nombre === nombre2 && arista.vertice2.nombre === nombre1));
    lista[nombre1] = lista[nombre1].filter(v => v !== nombre2);
    lista[nombre2] = lista[nombre2].filter(v => v !== nombre1);
}

function cambiarPeso() {
    let nombre1 = parseInt(prompt("Ingrese el nombre del primer vertice:"));
    let nombre2 = parseInt(prompt("Ingrese el nombre del segundo vertice:"));
    let arista = aristas.find(arista => 
        (arista.vertice1.nombre === nombre1 && arista.vertice2.nombre === nombre2) ||
        (arista.vertice1.nombre === nombre2 && arista.vertice2.nombre === nombre1)
    );
    if (!arista) {
        alert("Arista no encontrada.");
        return;
    }
    let nuevoPeso = parseFloat(prompt("Ingrese el nuevo peso (positivo):"));
    if (isNaN(nuevoPeso) || nuevoPeso <= 0) {
        alert("El peso debe ser un número positivo.");
        return;
    }
    arista.peso = nuevoPeso;

}
