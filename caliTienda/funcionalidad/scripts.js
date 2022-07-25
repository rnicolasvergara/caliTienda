const productos = [
    { nombre: "Home Fragance AGAPE", precio: 1350},
    { nombre: "El Perfume", precio: 1250 },
    { nombre: "Home Spray", precio: 1250 },
    { nombre: "Difusor", precio: 1350 },
    { nombre: "Bubble Candle", precio: 890 },
    { nombre: "Porta Fosforos", precio: 350 },
];

let carrito = [] 

let saludo = prompt("Hola ¿Queres comprar algun producto?")

while(saludo != "si" && saludo != "no"){
     alert("No entendi tu respuesta")
     saludo = prompt("¿Queres comprar algun producto?")
}

if(saludo == "si"){
    alert("Estos son los productos disponibles")
    let productosTotal = productos.map((producto) => producto.nombre + " $" + producto.precio);
    alert(productosTotal.join(" - "))
} else if (saludo == "no"){
    alert("Hasta luego, te esperamos pronto")
}

while (saludo != "no"){
    let producto = prompt ("Elegi alguno de estos productos")
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

    let cantidad = parseInt(prompt("¿Cuantas unidades queres?"))

    carrito.push({producto, unidades, precio})
    console.log(carrito)
    } else{
        alert("no existe ese producto")
    }
    saludo = prompt("¿Queres seguir comprando?")

    while(saludo == "no"){
        alert("Gracias por tu compra")
    }
}


