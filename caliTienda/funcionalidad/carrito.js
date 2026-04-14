let carrito = JSON.parse(localStorage.getItem("carrito")) || []

function actualizarTotal() {
    const totalSpan = document.getElementById("total")
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    totalSpan.textContent = `$${total.toFixed(2)}`
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const botonVaciar = document.getElementById("boton-vaciar")

if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
        carrito = []
        guardarCarrito()
        actualizarTotal()
        Swal.fire("Carrito vaciado", "Se han eliminado todos los productos", "info")
    })
}

window.addEventListener("DOMContentLoaded", () => {
    actualizarTotal()
})

function agregarAlCarrito(producto, precio) {
    const itemExistente = carrito.find(item => item.nombre === producto)
    
    if (itemExistente) {
        itemExistente.cantidad++
    } else {
        carrito.push({ nombre: producto, precio: parseFloat(precio), cantidad: 1 })
    }
    
    guardarCarrito()
    actualizarTotal()
    Swal.fire("Agregado", `${producto} agregado al carrito`, "success")
}
