let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null

const IMPUESTO = 0.21
const ENVIO = 150

function actualizarTotal() {
    const totalSpan = document.getElementById("total")
    if (!totalSpan) return
    
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    totalSpan.textContent = '$' + subtotal.toFixed(0)
    
    const badge = document.getElementById("carrito-badge")
    if (badge) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0)
        badge.textContent = totalItems
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none'
    }
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarTotal()
}

function agregarAlCarrito(producto, precio, cantidad) {
    if (!cantidad) cantidad = 1
    const itemExistente = carrito.find(item => item.nombre === producto)
    
    if (itemExistente) {
        itemExistente.cantidad += cantidad
    } else {
        carrito.push({ nombre: producto, precio: parseFloat(precio), cantidad: cantidad })
    }
    
    guardarCarrito()
    mostrarNotificacion('Agregado al carrito', producto + ' fue agregado', 'success')
}

function eliminarDelCarrito(producto) {
    carrito = carrito.filter(item => item.nombre !== producto)
    guardarCarrito()
    actualizarTotal()
}

function actualizarCantidad(producto, cantidad) {
    const item = carrito.find(i => i.nombre === producto)
    if (item) {
        item.cantidad = Math.max(1, cantidad)
        guardarCarrito()
    }
}

function vaciarCarrito() {
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#917255',
        cancelButtonColor: '#999',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = []
            guardarCarrito()
            mostrarNotificacion('Carrito vacío', 'Se eliminaron todos los productos', 'info')
        }
    })
}

function mostrarNotificacion(titulo, mensaje, tipo) {
    Swal.fire({
        position: 'top-end',
        icon: tipo,
        title: titulo,
        text: mensaje,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    })
}

function mostrarCarrito() {
    if (!usuarioActual) {
        Swal.fire('Debes estar logueado', 'Por favor inicia sesión para ver el carrito', 'warning').then(() => {
            window.location.href = './secciones/login.html'
        })
        return
    }

    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'No hay productos en tu carrito', 'info')
        return
    }

    let htmlCarrito = '<div style="max-height: 400px; overflow-y: auto;">'
    
    carrito.forEach((item, index) => {
        const subtotalItem = (item.precio * item.cantidad).toFixed(0)
        htmlCarrito += '<div style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;"><div style="flex: 1;"><h5 style="margin: 0; color: #917255;">' + item.nombre + '</h5><p style="margin: 5px 0; font-size: 14px;">$' + item.precio + ' x ' + item.cantidad + ' = $' + subtotalItem + '</p></div><div style="display: flex; gap: 10px; align-items: center;"><input type="number" value="' + item.cantidad + '" min="1" onchange="actualizarCantidad(\'' + item.nombre + '\', this.value); location.reload();" style="width: 50px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;"><button onclick="eliminarDelCarrito(\'' + item.nombre + '\'); location.reload();" class="btn btn-sm btn-danger" style="padding: 5px 10px; font-size: 12px;">x</button></div></div>'
    })
    
    htmlCarrito += '</div>'
    
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    const impuesto = subtotal * IMPUESTO
    const total = subtotal + impuesto + ENVIO

    const resumen = '<div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-radius: 8px;"><p style="margin: 10px 0; display: flex; justify-content: space-between;"><strong>Subtotal:</strong> <strong>$' + subtotal.toFixed(0) + '</strong></p><p style="margin: 10px 0; display: flex; justify-content: space-between;"><strong>IVA (21%):</strong> <strong>$' + impuesto.toFixed(0) + '</strong></p><p style="margin: 10px 0; display: flex; justify-content: space-between;"><strong>Envío:</strong> <strong>$' + ENVIO + '</strong></p><hr style="margin: 10px 0; border: 1px solid #917255;"><p style="margin: 10px 0; display: flex; justify-content: space-between; font-size: 18px;"><strong>Total:</strong> <strong style="color: #917255;">$' + total.toFixed(0) + '</strong></p></div>'

    Swal.fire({
        title: '🛒 Tu Carrito',
        html: htmlCarrito + resumen,
        width: 600,
        showCancelButton: true,
        confirmButtonText: '✓ Finalizar Compra',
        cancelButtonText: 'Seguir Comprando',
        confirmButtonColor: '#917255',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            procederAlCheckout()
        }
    })
}

function procederAlCheckout() {
    if (!usuarioActual) {
        Swal.fire('Error', 'Debes estar logueado para finalizar', 'error')
        return
    }

    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    const impuesto = subtotal * IMPUESTO
    const total = subtotal + impuesto + ENVIO

    let productosHtml = ''
    carrito.forEach(item => {
        productosHtml += '<p style="margin: 5px 0;">• ' + item.nombre + ' x' + item.cantidad + ' = $' + (item.precio * item.cantidad).toFixed(0) + '</p>'
    })

    let htmlCheckout = '<div style="text-align: left; max-height: 400px; overflow-y: auto;"><h4 style="color: #917255; margin-bottom: 15px;">Resumen de tu orden</h4><div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;"><p><strong>Cliente:</strong> ' + usuarioActual.username + '</p><p><strong>Email:</strong> ' + usuarioActual.email + '</p></div><h5 style="color: #917255; margin: 15px 0 10px 0;">Productos:</h5><div style="background-color: #f9f9f9; padding: 10px; border-radius: 8px; margin-bottom: 15px;">' + productosHtml + '</div><h5 style="color: #917255; margin: 15px 0 10px 0;">Totales:</h5><div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;"><p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Subtotal:</span> <strong>$' + subtotal.toFixed(0) + '</strong></p><p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>IVA (21%):</span> <strong>$' + impuesto.toFixed(0) + '</strong></p><p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Envío:</span> <strong>$' + ENVIO + '</strong></p><hr style="margin: 10px 0;"><p style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 18px;"><strong>Total a pagar:</strong> <strong style="color: #917255;">$' + total.toFixed(0) + '</strong></p></div><div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #917255;"><strong style="color: #917255;">Info:</strong><p style="margin: 5px 0 0 0; font-size: 14px;">Sistema de demostración. En producción se integraría con Mercado Pago o Stripe.</p></div></div>'

    Swal.fire({
        title: '📋 Confirmar Compra',
        html: htmlCheckout,
        width: 600,
        showCancelButton: true,
        confirmButtonText: '✓ Confirmar Pago',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#917255',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            completarCompra(subtotal, impuesto, total)
        }
    })
}

function completarCompra(subtotal, impuesto, total) {
    let historial = JSON.parse(localStorage.getItem("historial_compras")) || []
    historial.push({
        id: Math.random().toString(36).substr(2, 9),
        usuario: usuarioActual.username,
        fecha: new Date().toLocaleDateString(),
        productos: carrito,
        subtotal: subtotal,
        impuesto: impuesto,
        total: total
    })
    localStorage.setItem("historial_compras", JSON.stringify(historial))
    
    carrito = []
    localStorage.removeItem("carrito")
    
    Swal.fire({
        icon: 'success',
        title: '¡Compra Realizada!',
        html: '<p>Gracias por tu compra, <strong>' + usuarioActual.username + '</strong></p><p>Total: <strong style="color: #917255;">$' + total.toFixed(0) + '</strong></p><p style="font-size: 12px; color: #999; margin-top: 15px;">Número de seguimiento: ' + Math.random().toString(36).substr(2, 9).toUpperCase() + '</p>',
        confirmButtonText: 'Volver al Inicio',
        confirmButtonColor: '#917255'
    }).then(() => {
        window.location.href = './index.html'
    })
}

window.addEventListener("DOMContentLoaded", () => {
    usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null
    actualizarTotal()
})

const botonVer = document.getElementById("imagenCarrito")
if (botonVer) {
    botonVer.addEventListener("click", mostrarCarrito)
    botonVer.style.cursor = "pointer"
}

const botonVaciar = document.getElementById("boton-vaciar")
if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarCarrito)
}
