let vertices = []; 
let aristas = [];
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
    let nombre = prompt("Ingrese el nombre del vertice:");
    if (!nombre || vertices.some(n => n.nombre === nombre)) {

        alert("Nombre inválido o repetido.");
        return;
    }
    let nuevovertice = new vertice(nombre, random(50, width - 50), random(50, height - 50));
    vertices.push(nuevovertice);

}

     
function eliminarvertice() {
    let nombre = prompt("Ingrese el nombre del vertice a eliminar:");
    vertices = vertices.filter(vertice => vertice.nombre !== nombre);
    aristas = aristas.filter(arista => arista.vertice1.nombre !== nombre && arista.vertice2.nombre !== nombre);
}

function conectarvertices() {
    let nombre1 = prompt("Ingrese el nombre del primer vertice:");
    let nombre2 = prompt("Ingrese el nombre del segundo vertice:");
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
    let bidireccional = true
    aristas.push(new arista(vertice1, vertice2, peso, bidireccional));

}

function eliminararista() {

    let nombre1 = prompt("Ingrese el nombre del primer vertice:");
    let nombre2 = prompt("Ingrese el nombre del segundo vertice:");

    let vertice1 = vertices.find(n => n.nombre === nombre1); //Verificar que los vertices existen
    let vertice2 = vertices.find(n => n.nombre === nombre2);

    if (!vertice1 || !vertice2) {

        alert("Uno o ambos vertices no existen.");
        return;
    }
            //Verificar que los aristas existen
            let aristaExistente = aristas.find(arista => 
                (arista.vertice1.nombre === nombre1 && arista.vertice2.nombre === nombre2) ||
                (arista.vertice1.nombre === nombre2 && arista.vertice2.nombre === nombre1) // Para aristas bidireccionales
            );
            if (!aristaExistente) {
                alert("El arista no existe");
                return;
            }
            aristas = aristas.filter(arista => !(arista.vertice1.nombre === nombre1 && arista.vertice2.nombre === nombre2) &&
            !(arista.vertice1.nombre === nombre2 && arista.vertice2.nombre === nombre1));
}

function cambiarPeso() {
    let nombre1 = prompt("Ingrese el nombre del primer vertice:");
    let nombre2 = prompt("Ingrese el nombre del segundo vertice:");
    let arista = aristas.find(arista => arista.vertice1.nombre === nombre1 && arista.vertice2.nombre === nombre2);
    if (!arista) {
        alert("arista no encontrado.");
        return;
    }
    let nuevoPeso = parseFloat(prompt("Ingrese el nuevo peso (positivo):"));
    if (isNaN(nuevoPeso) || nuevoPeso <= 0) {
        alert("El peso debe ser un número positivo.");
        return;
    }
    arista.peso = nuevoPeso;

}
