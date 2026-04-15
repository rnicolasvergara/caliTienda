// ═══════════════════════════════════════════════════════════════
// 🛒 CARRITO DE COMPRAS - IndexedDB
// ═══════════════════════════════════════════════════════════════

const IMPUESTO = 0.21
const ENVIO = 150

let usuarioActualCarrito = null
let carritoItems = []

// Obtener sesión al cargar
window.addEventListener('load', async () => {
    console.log("🛒 Carrito cargando...")
    
    // Esperar a que DB esté lista
    let intentos = 0
    while (!caliDB.initialized && intentos < 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        intentos++
    }
    
    if (caliDB.initialized) {
        try {
            usuarioActualCarrito = await caliDB.obtenerSesion()
            await cargarCarrito()
            actualizarBadgeCarrito()
            console.log("🛒 Carrito cargado correctamente")
        } catch (error) {
            console.error("❌ Error cargando carrito:", error)
        }
    }
})

// ═══════════════════════════════════════════════════════════════
// CARGAR CARRITO
// ═══════════════════════════════════════════════════════════════

async function cargarCarrito() {
    try {
        carritoItems = await caliDB.obtenerCarrito()
        console.log("✅ Carrito cargado:", carritoItems.length, "items")
        actualizarBadgeCarrito()
    } catch (error) {
        console.error("❌ Error cargando carrito:", error)
        carritoItems = []
    }
}

// ═══════════════════════════════════════════════════════════════
// AGREGAR AL CARRITO
// ═══════════════════════════════════════════════════════════════

async function agregarAlCarrito(productoId, nombreProducto, precio) {
    if (!caliDB.initialized) {
        Swal.fire('Error', 'La base de datos no está lista', 'error')
        return
    }

    try {
        // Buscar si ya existe en el carrito
        const itemExistente = carritoItems.find(item => item.productoId === productoId)
        
        if (itemExistente) {
            itemExistente.cantidad += 1
            await caliDB.actualizarItemCarrito(itemExistente.id, itemExistente.cantidad)
            console.log("✅ Cantidad aumentada:", nombreProducto)
        } else {
            const nuevoItem = {
                productoId: productoId,
                nombre: nombreProducto,
                precio: parseFloat(precio),
                cantidad: 1,
                fechaAgregado: new Date()
            }
            
            const item = await caliDB.agregarAlCarrito(nuevoItem)
            carritoItems.push({ ...nuevoItem, id: item.id })
            console.log("✅ Producto agregado:", nombreProducto)
        }
        
        actualizarBadgeCarrito()
        mostrarNotificacion('Agregado al carrito', nombreProducto, 'success')
        
    } catch (error) {
        console.error("❌ Error agregando al carrito:", error)
        Swal.fire('Error', 'No se pudo agregar al carrito', 'error')
    }
}

// ═══════════════════════════════════════════════════════════════
// ACTUALIZAR BADGE DEL CARRITO
// ═══════════════════════════════════════════════════════════════

function actualizarBadgeCarrito() {
    const totalSpan = document.getElementById("total")
    const badge = document.getElementById("carrito-badge")
    
    if (totalSpan) {
        const subtotal = carritoItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
        totalSpan.textContent = '$' + subtotal.toFixed(0)
    }
    
    if (badge) {
        const totalItems = carritoItems.reduce((sum, item) => sum + item.cantidad, 0)
        badge.textContent = totalItems
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none'
    }
}

// ═══════════════════════════════════════════════════════════════
// MOSTRAR CARRITO (MODAL)
// ═══════════════════════════════════════════════════════════════

function mostrarCarrito() {
    if (carritoItems.length === 0) {
        Swal.fire('Carrito vacío', 'No hay productos en tu carrito', 'info')
        return
    }

    let htmlCarrito = '<div style="max-height: 400px; overflow-y: auto;">'
    
    carritoItems.forEach((item) => {
        const subtotalItem = (item.precio * item.cantidad).toFixed(0)
        htmlCarrito += `
            <div style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <h5 style="margin: 0; color: #917255;">${item.nombre}</h5>
                    <p style="margin: 5px 0; font-size: 14px;">$${item.precio} x 
                        <input type="number" id="cantidad-${item.id}" value="${item.cantidad}" min="1" max="999" 
                               style="width: 40px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; text-align: center;" 
                               onchange="actualizarCantidadCarrito(${item.id}, parseInt(this.value))"> 
                        = $${subtotalItem}
                    </p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button onclick="eliminarDelCarrito(${item.id})" 
                            class="btn btn-sm btn-danger" 
                            style="padding: 5px 10px; font-size: 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        ✕ Quitar
                    </button>
                </div>
            </div>
        `
    })
    
    htmlCarrito += '</div>'
    
    const subtotal = carritoItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    const impuesto = subtotal * IMPUESTO
    const total = subtotal + impuesto + ENVIO

    const resumen = `
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-radius: 8px;">
            <p style="margin: 10px 0; display: flex; justify-content: space-between;">
                <strong>Subtotal:</strong> <strong>$${subtotal.toFixed(0)}</strong>
            </p>
            <p style="margin: 10px 0; display: flex; justify-content: space-between;">
                <strong>IVA (21%):</strong> <strong>$${impuesto.toFixed(0)}</strong>
            </p>
            <p style="margin: 10px 0; display: flex; justify-content: space-between;">
                <strong>Envío:</strong> <strong>$${ENVIO}</strong>
            </p>
            <hr style="margin: 10px 0; border: 1px solid #917255;">
            <p style="margin: 10px 0; display: flex; justify-content: space-between; font-size: 18px;">
                <strong>Total:</strong> <strong style="color: #917255;">$${total.toFixed(0)}</strong>
            </p>
        </div>
    `

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

// ═══════════════════════════════════════════════════════════════
// ACTUALIZAR CANTIDAD
// ═══════════════════════════════════════════════════════════════

async function actualizarCantidadCarrito(itemId, nuevaCantidad) {
    if (nuevaCantidad < 1) nuevaCantidad = 1
    
    try {
        const item = carritoItems.find(i => i.id === itemId)
        if (item) {
            await caliDB.actualizarItemCarrito(itemId, nuevaCantidad)
            item.cantidad = nuevaCantidad
            actualizarBadgeCarrito()
            mostrarCarrito() // Reabrir modal con datos actualizados
            console.log("✅ Cantidad actualizada:", itemId)
        }
    } catch (error) {
        console.error("❌ Error actualizando cantidad:", error)
    }
}

// ═══════════════════════════════════════════════════════════════
// ELIMINAR DEL CARRITO
// ═══════════════════════════════════════════════════════════════

async function eliminarDelCarrito(itemId) {
    try {
        await caliDB.eliminarDelCarrito(itemId)
        carritoItems = carritoItems.filter(item => item.id !== itemId)
        actualizarBadgeCarrito()
        mostrarCarrito() // Reabrir modal
        console.log("✅ Producto eliminado del carrito")
    } catch (error) {
        console.error("❌ Error eliminando del carrito:", error)
    }
}

// ═══════════════════════════════════════════════════════════════
// VACIAR CARRITO
// ═══════════════════════════════════════════════════════════════

async function vaciarCarrito() {
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#917255',
        cancelButtonColor: '#999',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await caliDB.vaciarCarrito()
                carritoItems = []
                actualizarBadgeCarrito()
                mostrarNotificacion('Carrito vacío', 'Se eliminaron todos los productos', 'info')
                console.log("✅ Carrito vaciado")
            } catch (error) {
                console.error("❌ Error vaciando carrito:", error)
            }
        }
    })
}

// ═══════════════════════════════════════════════════════════════
// PROCEDER AL CHECKOUT
// ═══════════════════════════════════════════════════════════════

async function procederAlCheckout() {
    if (!usuarioActualCarrito) {
        Swal.fire({
            title: 'Necesitas iniciar sesión',
            text: 'Para completar la compra, debes iniciar sesión',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ir a Login',
            cancelButtonText: 'Seguir Comprando',
            confirmButtonColor: '#917255'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './secciones/login.html'
            }
        })
        return
    }

    const subtotal = carritoItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    const impuesto = subtotal * IMPUESTO
    const total = subtotal + impuesto + ENVIO

    let productosHtml = ''
    carritoItems.forEach(item => {
        productosHtml += `<p style="margin: 5px 0;">• ${item.nombre} x${item.cantidad} = $${(item.precio * item.cantidad).toFixed(0)}</p>`
    })

    const htmlCheckout = `
        <div style="text-align: left; max-height: 400px; overflow-y: auto;">
            <h4 style="color: #917255; margin-bottom: 15px;">Resumen de tu orden</h4>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p><strong>Cliente:</strong> ${usuarioActualCarrito.username}</p>
                <p><strong>Email:</strong> ${usuarioActualCarrito.email}</p>
            </div>
            <h5 style="color: #917255; margin: 15px 0 10px 0;">Productos:</h5>
            <div style="background-color: #f9f9f9; padding: 10px; border-radius: 8px; margin-bottom: 15px;">${productosHtml}</div>
            <h5 style="color: #917255; margin: 15px 0 10px 0;">Totales:</h5>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Subtotal:</span> <strong>$${subtotal.toFixed(0)}</strong></p>
                <p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>IVA (21%):</span> <strong>$${impuesto.toFixed(0)}</strong></p>
                <p style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Envío:</span> <strong>$${ENVIO}</strong></p>
                <hr style="margin: 10px 0;">
                <p style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 18px;"><strong>Total a pagar:</strong> <strong style="color: #917255;">$${total.toFixed(0)}</strong></p>
            </div>
            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #917255;">
                <strong style="color: #917255;">Info:</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px;">Sistema de demostración. En producción se integraría con Mercado Pago o Stripe.</p>
            </div>
        </div>
    `

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

// ═══════════════════════════════════════════════════════════════
// COMPLETAR COMPRA
// ═══════════════════════════════════════════════════════════════

async function completarCompra(subtotal, impuesto, total) {
    try {
        const compra = {
            id: Math.random().toString(36).substr(2, 9),
            usuario: usuarioActualCarrito.username,
            email: usuarioActualCarrito.email,
            fecha: new Date().toLocaleDateString(),
            productos: carritoItems.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
            subtotal: subtotal,
            impuesto: impuesto,
            envio: ENVIO,
            total: total
        }
        
        await caliDB.guardarCompra(compra)
        await caliDB.vaciarCarrito()
        carritoItems = []
        actualizarBadgeCarrito()
        
        Swal.fire({
            icon: 'success',
            title: '¡Compra Realizada!',
            html: `
                <p>Gracias por tu compra, <strong>${usuarioActualCarrito.username}</strong></p>
                <p>Total: <strong style="color: #917255;">$${total.toFixed(0)}</strong></p>
                <p style="font-size: 12px; color: #999; margin-top: 15px;">Número de seguimiento: ${compra.id.toUpperCase()}</p>
            `,
            confirmButtonText: 'Volver al Inicio',
            confirmButtonColor: '#917255'
        }).then(() => {
            window.location.href = './index.html'
        })
        
        console.log("✅ Compra realizada:", compra.id)
        
    } catch (error) {
        console.error("❌ Error completando compra:", error)
        Swal.fire('Error', 'No se pudo completar la compra: ' + error.message, 'error')
    }
}

// ═══════════════════════════════════════════════════════════════
// NOTIFICACIONES
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// CONECTAR BOTONES EN INDEX.HTML
// ═══════════════════════════════════════════════════════════════

const botonVer = document.getElementById("imagenCarrito")
if (botonVer) {
    botonVer.addEventListener("click", mostrarCarrito)
    botonVer.style.cursor = "pointer"
    console.log("✅ Botón carrito conectado")
}

const botonVaciar = document.getElementById("boton-vaciar")
if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarCarrito)
    console.log("✅ Botón vaciar conectado")
}
