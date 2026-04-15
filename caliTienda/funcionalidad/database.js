// ═══════════════════════════════════════════════════════════════
// 🗄️ SISTEMA DE BASE DE DATOS LOCAL - IndexedDB
// ═══════════════════════════════════════════════════════════════

const DB_NAME = "CaliTiendaDB"
const DB_VERSION = 1

class CaliTiendaDB {
    constructor() {
        this.db = null
        this.initialized = false
    }

    // Inicializar la base de datos
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onerror = () => {
                console.error("❌ Error al abrir la base de datos:", request.error)
                reject(request.error)
            }

            request.onsuccess = () => {
                this.db = request.result
                this.initialized = true
                console.log("✅ Base de datos inicializada correctamente")
                resolve(this.db)
            }

            request.onupgradeneeded = (event) => {
                const db = event.target.result
                console.log("🔧 Creando estructura de base de datos...")

                // Crear object stores
                if (!db.objectStoreNames.contains("usuarios")) {
                    const usuariosStore = db.createObjectStore("usuarios", { keyPath: "id", autoIncrement: true })
                    usuariosStore.createIndex("username", "username", { unique: true })
                    usuariosStore.createIndex("email", "email", { unique: true })
                    console.log("  ✓ Object Store 'usuarios' creado")
                }

                if (!db.objectStoreNames.contains("productos")) {
                    const productosStore = db.createObjectStore("productos", { keyPath: "id" })
                    productosStore.createIndex("categoria", "categoria", { unique: false })
                    productosStore.createIndex("nombre", "nombre", { unique: false })
                    console.log("  ✓ Object Store 'productos' creado")
                }

                if (!db.objectStoreNames.contains("carrito")) {
                    db.createObjectStore("carrito", { keyPath: "id", autoIncrement: true })
                    console.log("  ✓ Object Store 'carrito' creado")
                }

                if (!db.objectStoreNames.contains("compras")) {
                    db.createObjectStore("compras", { keyPath: "id", autoIncrement: true })
                    console.log("  ✓ Object Store 'compras' creado")
                }

                if (!db.objectStoreNames.contains("sesion")) {
                    db.createObjectStore("sesion", { keyPath: "tipo" })
                    console.log("  ✓ Object Store 'sesion' creado")
                }
            }
        })
    }

    // ═══════════════════════════════════════════════════════════════
    // USUARIOS
    // ═══════════════════════════════════════════════════════════════

    async agregarUsuario(username, email, password) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["usuarios"], "readwrite")
            const store = transaction.objectStore("usuarios")
            
            const usuario = { username, email, password, fechaRegistro: new Date() }
            const request = store.add(usuario)

            request.onsuccess = () => {
                console.log("✅ Usuario creado:", username)
                resolve(usuario)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerUsuarioPorUsername(username) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["usuarios"], "readonly")
            const store = transaction.objectStore("usuarios")
            const index = store.index("username")
            const request = index.get(username)

            request.onsuccess = () => resolve(request.result || null)
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerTodosLosUsuarios() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["usuarios"], "readonly")
            const store = transaction.objectStore("usuarios")
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    // ═══════════════════════════════════════════════════════════════
    // SESIÓN
    // ═══════════════════════════════════════════════════════════════

    async guardarSesion(usuario) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["sesion"], "readwrite")
            const store = transaction.objectStore("sesion")
            
            const sesion = {
                tipo: "usuarioActual",
                usuario: usuario,
                fechaLogin: new Date(),
                activo: true
            }
            
            const request = store.put(sesion)
            request.onsuccess = () => {
                console.log("✅ Sesión guardada para:", usuario.username)
                resolve(sesion)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerSesion() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["sesion"], "readonly")
            const store = transaction.objectStore("sesion")
            const request = store.get("usuarioActual")

            request.onsuccess = () => {
                const sesion = request.result
                if (sesion && sesion.activo) {
                    resolve(sesion.usuario)
                } else {
                    resolve(null)
                }
            }
            request.onerror = () => reject(request.error)
        })
    }

    async cerrarSesion() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["sesion"], "readwrite")
            const store = transaction.objectStore("sesion")
            const request = store.delete("usuarioActual")

            request.onsuccess = () => {
                console.log("✅ Sesión cerrada")
                resolve(true)
            }
            request.onerror = () => reject(request.error)
        })
    }

    // ═══════════════════════════════════════════════════════════════
    // PRODUCTOS
    // ═══════════════════════════════════════════════════════════════

    async agregarProducto(producto) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["productos"], "readwrite")
            const store = transaction.objectStore("productos")
            const request = store.add(producto)

            request.onsuccess = () => resolve(producto)
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerTodosLosProductos() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["productos"], "readonly")
            const store = transaction.objectStore("productos")
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerProductosPorCategoria(categoria) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["productos"], "readonly")
            const store = transaction.objectStore("productos")
            const index = store.index("categoria")
            const request = index.getAll(categoria)

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerProductoPorId(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["productos"], "readonly")
            const store = transaction.objectStore("productos")
            const request = store.get(id)

            request.onsuccess = () => resolve(request.result || null)
            request.onerror = () => reject(request.error)
        })
    }

    // ═══════════════════════════════════════════════════════════════
    // CARRITO
    // ═══════════════════════════════════════════════════════════════

    async agregarAlCarrito(producto) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["carrito"], "readwrite")
            const store = transaction.objectStore("carrito")
            const request = store.add(producto)

            request.onsuccess = () => {
                console.log("✅ Producto agregado al carrito:", producto.nombre)
                resolve(producto)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerCarrito() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["carrito"], "readonly")
            const store = transaction.objectStore("carrito")
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async actualizarItemCarrito(id, cantidad) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["carrito"], "readwrite")
            const store = transaction.objectStore("carrito")
            
            const getRequest = store.get(id)
            getRequest.onsuccess = () => {
                const item = getRequest.result
                item.cantidad = cantidad
                const updateRequest = store.put(item)
                
                updateRequest.onsuccess = () => {
                    console.log("✅ Cantidad actualizada:", id)
                    resolve(item)
                }
                updateRequest.onerror = () => reject(updateRequest.error)
            }
            getRequest.onerror = () => reject(getRequest.error)
        })
    }

    async eliminarDelCarrito(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["carrito"], "readwrite")
            const store = transaction.objectStore("carrito")
            const request = store.delete(id)

            request.onsuccess = () => {
                console.log("✅ Producto eliminado del carrito")
                resolve(true)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async vaciarCarrito() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["carrito"], "readwrite")
            const store = transaction.objectStore("carrito")
            const request = store.clear()

            request.onsuccess = () => {
                console.log("✅ Carrito vaciado")
                resolve(true)
            }
            request.onerror = () => reject(request.error)
        })
    }

    // ═══════════════════════════════════════════════════════════════
    // COMPRAS
    // ═══════════════════════════════════════════════════════════════

    async guardarCompra(compra) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["compras"], "readwrite")
            const store = transaction.objectStore("compras")
            const request = store.add(compra)

            request.onsuccess = () => {
                console.log("✅ Compra guardada:", compra.id)
                resolve(compra)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerComprasDeUsuario(username) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["compras"], "readonly")
            const store = transaction.objectStore("compras")
            const request = store.getAll()

            request.onsuccess = () => {
                const compras = request.result.filter(c => c.usuario === username)
                resolve(compras)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async obtenerTodasLasCompras() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["compras"], "readonly")
            const store = transaction.objectStore("compras")
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }
}

// Instancia global de la base de datos
const caliDB = new CaliTiendaDB()

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await caliDB.init()
        console.log("🚀 Base de datos lista para usar")
        
        // Verificar si hay datos iniciales
        const usuarios = await caliDB.obtenerTodosLosUsuarios()
        const productos = await caliDB.obtenerTodosLosProductos()
        
        if (usuarios.length === 0) {
            console.log("📝 Inicializando datos de demostración...")
            await initDatos()
        }
        
        if (productos.length === 0) {
            console.log("📝 Inicializando catálogo de productos...")
            await initProductos()
        }
    } catch (error) {
        console.error("❌ Error inicializando base de datos:", error)
    }
})
