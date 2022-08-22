//data.json

let productos = JSON.parse(localStorage.getItem("productos")) || [
    {nombre: "Home Fragance AGAPE", precio: 1350, id: 1},
    {nombre: "El Perfume", precio: 1250, id: 2},
    {nombre: "Home Spray", precio: 1250, id: 3},
    {nombre: "Difusor", precio: 1350, id: 4},
    {nombre: "Bubble Candle", precio: 890, id: 5},
    {nombre: "Porta Fosforos", precio: 350, id: 6}
]

console.log(productos)

const lista = document.querySelector('#listado')

fetch('/data.json')
.then ((res) => res.json())
.then ((data) => {

    data.forEach((producto) =>{
        const li = document.createElement('li')
        li.innerHTML =`
        <h4>${producto.nombre}</h4>
        <p>${producto.precio}</p>
        <p>Codigo: ${producto.id}</p>
        <hr/>
        `
        lista.append(li)
    })
})








// const productos = [
//     { id: 1, nombre: "Home Fragance AGAPE", precio: 1350 },
//     { id: 2, nombre: "El Perfume", precio: 1250 },
//     { id: 3, nombre: "Home Spray", precio: 1250 },
//     { id: 4, nombre: "Difusor", precio: 1350 },
//     { id: 5, nombre: "Bubble Candle", precio: 890 },
//     { id: 6, nombre: "Porta Fosforos", precio: 350 }];

// const guardarLocal = (id, nombre, precio) => { localStorage.setItem(id, nombre, precio) };

// for (const nombre of productos) {
//     guardarLocal(nombre.id, JSON.stringify(nombre));
// }

// let carrito = []
// const DOMtotal = document.querySelector('#total');
// const DOMbotonVaciar = document.querySelector('#boton-vaciar');
// let productosTotal = productos.map((producto) => producto.nombre + " $" + producto.precio);

// let precio = 0

// const comprar = document.getElementById("boton-comprar")
// comprar.addEventListener("click", respuestaClick)
// function respuestaClick(evento) {
//     let unidades = parseInt(evento)
//     carrito.push({ productos, unidades, precio })
//     console.log(carrito)
// }

