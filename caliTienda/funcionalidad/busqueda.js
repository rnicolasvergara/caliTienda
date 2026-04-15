// BÚSQUEDA EN TIEMPO REAL
const inputBusqueda = document.querySelector('input[placeholder*="Buscar"]')
const formBusqueda = document.querySelector('form[role="search"]')

if (inputBusqueda && formBusqueda) {
    formBusqueda.onsubmit = (e) => {
        e.preventDefault()
        const termino = inputBusqueda.value.trim()
        if (termino) {
            const resultados = buscarProductos(termino)
            mostrarResultadosBusqueda(resultados, termino)
        }
    }

    inputBusqueda.addEventListener('input', (e) => {
        const termino = e.target.value.trim()
        if (termino.length >= 2) {
            const resultados = buscarProductos(termino)
            mostrarSugerencias(resultados)
        } else {
            ocultarSugerencias()
        }
    })
}

function mostrarSugerencias(productos) {
    let sugerenciasDiv = document.getElementById('sugerencias-busqueda')
    
    if (!sugerenciasDiv) {
        sugerenciasDiv = document.createElement('div')
        sugerenciasDiv.id = 'sugerencias-busqueda'
        sugerenciasDiv.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #917255;
            border-radius: 8px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `
        formBusqueda.style.position = 'relative'
        formBusqueda.appendChild(sugerenciasDiv)
    }

    if (productos.length === 0) {
        sugerenciasDiv.innerHTML = '<div style="padding: 10px; text-align: center; color: #999;">No se encontraron productos</div>'
        sugerenciasDiv.style.display = 'block'
        return
    }

    sugerenciasDiv.innerHTML = productos.slice(0, 8).map(p => `
        <div class="sugerencia-item" onclick="irAProducto(${p.id})" style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; hover-effect">
            <strong>${p.nombre}</strong><br>
            <small style="color: #999;">${p.categoria} - $${p.precio}</small>
        </div>
    `).join('')
    
    sugerenciasDiv.style.display = 'block'
}

function ocultarSugerencias() {
    const sugerenciasDiv = document.getElementById('sugerencias-busqueda')
    if (sugerenciasDiv) {
        sugerenciasDiv.style.display = 'none'
    }
}

function mostrarResultadosBusqueda(productos, termino) {
    if (productos.length === 0) {
        Swal.fire('Sin resultados', 'No encontramos productos con "' + termino + '"', 'info')
        return
    }

    let htmlResultados = '<div style="max-height: 500px; overflow-y: auto;">'
    productos.forEach(p => {
        htmlResultados += `
            <div style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="margin: 0; color: #917255;">${p.nombre}</h4>
                    <p style="margin: 5px 0; font-size: 14px; color: #666;">${p.categoria}</p>
                    <p style="margin: 5px 0; font-size: 14px;">⭐ ${p.rating} | Stock: ${p.stock}</p>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 18px; color: #917255; margin: 0 0 10px 0;">$${p.precio}</p>
                    <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})" class="btn btn-dark" style="font-size: 12px; padding: 5px 10px;">Agregar</button>
                </div>
            </div>
        `
    })
    htmlResultados += '</div>'

    Swal.fire({
        title: 'Resultados de búsqueda: ' + termino,
        html: htmlResultados,
        width: 600
    })
}

function irAProducto(id) {
    window.location.href = './secciones/productos.html?id=' + id
}
