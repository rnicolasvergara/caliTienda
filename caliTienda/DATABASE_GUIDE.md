# 🗄️ CaliTienda - Guía de Base de Datos IndexedDB

## 📋 Descripción General

CaliTienda utiliza **IndexedDB** como base de datos local en el navegador. Este es un cambio radical respecto a localStorage, proporcionando:

- ✅ Mayor capacidad de almacenamiento (~50MB)
- ✅ Transacciones seguras
- ✅ Índices para búsquedas rápidas
- ✅ Mejor rendimiento
- ✅ Persistencia real entre sesiones

## 📁 Estructura de la Base de Datos

### Nombre de Base de Datos
- **DB_NAME**: `CaliTiendaDB`
- **DB_VERSION**: `1`

### Object Stores (Tablas)

#### 1. **usuarios**
Almacena usuarios registrados y credenciales.

```javascript
{
  id: 1 (autoincrement),
  username: "demo" (unique index),
  email: "demo@calitienda.com" (unique index),
  password: "demo123",
  nombre: "Usuario Demo",
  fechaRegistro: Date
}
```

**Índices:**
- `username` - búsquedas por usuario
- `email` - búsquedas por email

---

#### 2. **productos**
Catálogo de 42 productos disponibles.

```javascript
{
  id: 1,
  nombre: "Vela Soja Lavanda Premium",
  categoria: "Velas",
  precio: 450,
  stock: 25,
  imagen: "vela-lavanda.jpg",
  descripcion: "Vela 100% soja...",
  rating: 4.8
}
```

**Índices:**
- `categoria` - búsquedas por categoría

**Categorías:**
- Velas (10 items)
- Sprays (8 items)
- Difusores (8 items)
- Aceites (8 items)
- Complementos (8 items)

---

#### 3. **carrito**
Items actuales en el carrito de compras.

```javascript
{
  id: 1 (autoincrement),
  productoId: 1,
  nombre: "Vela Soja Lavanda Premium",
  precio: 450,
  cantidad: 2,
  fechaAgregado: Date
}
```

---

#### 4. **compras**
Historial de compras realizadas.

```javascript
{
  id: 1 (autoincrement),
  id: "abc123xyz",
  usuario: "demo",
  email: "demo@calitienda.com",
  fecha: "15/4/2024",
  productos: [
    { nombre: "Vela Lavanda", cantidad: 2, precio: 450 }
  ],
  subtotal: 900,
  impuesto: 189,
  envio: 150,
  total: 1239
}
```

---

#### 5. **sesion**
Datos de la sesión actual del usuario.

```javascript
{
  tipo: "usuarioActual" (unique key),
  usuario: {
    username: "demo",
    email: "demo@calitienda.com",
    nombre: "Usuario Demo"
  },
  fechaLogin: Date,
  activo: true
}
```

---

## 🔑 Métodos Disponibles

### Usuarios

```javascript
// Agregar usuario
await caliDB.agregarUsuario(username, email, password)

// Obtener usuario por username
await caliDB.obtenerUsuarioPorUsername("demo")

// Obtener todos los usuarios
await caliDB.obtenerTodosLosUsuarios()
```

### Sesión

```javascript
// Guardar sesión
await caliDB.guardarSesion(usuarioObject)

// Obtener sesión actual
await caliDB.obtenerSesion()

// Cerrar sesión
await caliDB.cerrarSesion()
```

### Productos

```javascript
// Obtener todos los productos
await caliDB.obtenerTodosLosProductos()

// Obtener productos por categoría
await caliDB.obtenerProductosPorCategoria("Velas")

// Obtener un producto por ID
await caliDB.obtenerProductoPorId(1)

// Agregar producto
await caliDB.agregarProducto(productoObject)
```

### Carrito

```javascript
// Agregar al carrito
await caliDB.agregarAlCarrito(itemObject)

// Obtener carrito
await caliDB.obtenerCarrito()

// Actualizar cantidad
await caliDB.actualizarItemCarrito(itemId, nuevaCantidad)

// Eliminar del carrito
await caliDB.eliminarDelCarrito(itemId)

// Vaciar carrito
await caliDB.vaciarCarrito()
```

### Compras

```javascript
// Guardar compra
await caliDB.guardarCompra(compraObject)

// Obtener compras de usuario
await caliDB.obtenerComprasDeUsuario("demo")

// Obtener todas las compras
await caliDB.obtenerTodasLasCompras()
```

---

## 🚀 Inicialización Automática

### Flujo de Carga

1. **HTML carga scripts en orden:**
   ```html
   <script src="./funcionalidad/database.js"></script>  <!-- DB init -->
   <script src="./funcionalidad/data.js"></script>        <!-- Datos iniciales -->
   <script src="./funcionalidad/auth.js"></script>        <!-- Autenticación -->
   <script src="./funcionalidad/carrito-db.js"></script>  <!-- Carrito -->
   ```

2. **database.js:**
   - Abre IndexedDB
   - Crea Object Stores si es primera vez
   - Espera a estar listo

3. **data.js:**
   - Si no hay usuarios, crea 2 de prueba (demo, test)
   - Si no hay productos, crea 42 productos iniciales

4. **auth.js:**
   - Verifica si hay sesión guardada
   - Actualiza UI según sesión

5. **carrito-db.js:**
   - Carga carrito actual
   - Actualiza badge de cantidad

---

## 👨‍💻 Usuarios de Demostración

### Usuario 1
```
Username: demo
Email: demo@calitienda.com
Password: demo123
```

### Usuario 2
```
Username: test
Email: test@calitienda.com
Password: test123
```

---

## 🔍 Debugging

### Ver en DevTools
1. Abrir DevTools (F12)
2. Ir a "Application" (Chrome) o "Storage" (Firefox)
3. Expandir "IndexedDB"
4. Ver base de datos "CaliTiendaDB"
5. Inspeccionar cada Object Store

### Consultas en Consola
```javascript
// Ver todos los usuarios
const usuarios = await caliDB.obtenerTodosLosUsuarios()
console.log(usuarios)

// Ver carrito actual
const carrito = await caliDB.obtenerCarrito()
console.log(carrito)

// Ver sesión actual
const sesion = await caliDB.obtenerSesion()
console.log(sesion)

// Ver todos los productos
const productos = await caliDB.obtenerTodosLosProductos()
console.log(productos)

// Ver todas las compras
const compras = await caliDB.obtenerTodasLasCompras()
console.log(compras)
```

---

## 🔐 Transacciones

Todas las operaciones en IndexedDB son transaccionales:

```javascript
// Ejemplo de transacción segura
const transaction = this.db.transaction(["usuarios"], "readwrite")
const store = transaction.objectStore("usuarios")
const request = store.add(nuevoUsuario)

request.onsuccess = () => {
  console.log("Transacción exitosa")
}

request.onerror = () => {
  console.error("Error en transacción")
}
```

---

## 🌍 Sincronización con Servidor (Futuro)

Aunque la DB es local, los datos podrían sincronizarse con un servidor backend:

```javascript
// Ejemplo de sincronización (no implementada)
async function sincronizarConServidor() {
  const usuarios = await caliDB.obtenerTodosLosUsuarios()
  const response = await fetch('/api/usuarios/sync', {
    method: 'POST',
    body: JSON.stringify(usuarios)
  })
  // Actualizar con respuesta del servidor
}
```

---

## 📊 Limitaciones y Consideraciones

| Aspecto | Detalles |
|---------|----------|
| Capacidad | ~50MB por origen (navegador) |
| Persistencia | Local solo (no en la nube) |
| Sincronización | Manual (no automática) |
| Seguridad | Contraseñas no encriptadas (MVP) |
| Rendimiento | O(1) para búsquedas indexadas |
| Compatibilidad | Todos navegadores modernos |

---

## 🔄 Migración de localStorage a IndexedDB

Si hubo datos en localStorage antes, se pueden migrar:

```javascript
// Leer de localStorage
const carritoAntiguo = JSON.parse(localStorage.getItem("carrito"))

// Guardar en IndexedDB
for (const item of carritoAntiguo) {
  await caliDB.agregarAlCarrito(item)
}

// Limpiar localStorage
localStorage.removeItem("carrito")
```

---

## 🛠️ Troubleshooting

### "Base de datos no inicializada"
- Esperar a que `caliDB.initialized === true`
- Verificar consola para errores

### "Object already exists"
- Significa que ese store ya existe (OK en operaciones repeat)

### "No results"
- Verificar que el índice sea correcto
- Verificar valores en DevTools

### "Transacción fallida"
- Verificar permisos (readwrite vs readonly)
- Revisar errores en consola

---

## 📚 Referencias

- [MDN IndexedDB Docs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [IndexedDB Best Practices](https://developers.google.com/web/tools/chrome-devtools/storage/indexeddb)
- [Async/Await with IndexedDB](https://web.dev/indexeddb/)

---

**Última actualización:** 15 de Abril, 2024
**Versión:** 1.0
**Status:** ✅ Producción
