const productos = [
    { nombre: "Home Fragance AGAPE", precio: 1350},
    { nombre: "El Perfume", precio: 1250 },
    { nombre: "Home Spray", precio: 1250 },
    { nombre: "Difusor", precio: 1350 },
    { nombre: "Bubble Candle", precio: 890 },
    { nombre: "Porta Fosforos", precio: 350 },
];

let carrito = [] 

    let productosTotal = productos.map((producto) => producto.nombre + " $" + producto.precio);
    alert(productosTotal.join(" - "))

let precio = 0
if (producto == "Home Fragance AGAPE" || producto == "El Perfume" || producto == "Home Spray" || producto == "Difusor" || producto == "Bubble Candle" || producto == "Porta Fosforos"){
switch(producto) {
    case "Home Fragance AGAPE":
        precio = 1350
    break
    case "El Perfume" :
        precio = 1250
    break
    case "Home Spray":
        precio = 1250
    break
    case "Difusor" :
        precio = 1350
    break
    case "Bubble Candle":
        precio = 890
    break
    case "Porta Fosforos":
        precio = 350
    break
        }

    carrito.push({producto, unidades, precio})
    console.log(carrito)
}

const productos = [
{ id: 1, producto: "Arroz", precio: 125 },
{ id: 2, producto: "Fideo", precio: 70 },
{ id: 3, producto: "Pan" , precio: 50},
{ id: 4, producto: "Flan" , precio: 100}];
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

for (const producto of productos) {
    guardarLocal(producto.id, JSON.stringify(producto));
}