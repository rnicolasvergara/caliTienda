# 🌿 CaliTienda - E-commerce de Aromáticos

Tienda online moderna para venta de velas, sprays, difusores, aceites esenciales y complementos aromáticos.

## ✨ Características Principales

### 🔐 Autenticación
- Login/Registro de usuarios
- Sesión persistente en localStorage
- UI dinámica: muestra usuario logueado en header
- Botón de logout
- Credenciales demo: `demo / demo123`

### 🛒 Carrito de Compras
- Visualización en modal
- Actualizar cantidades en tiempo real
- Eliminar productos individuales
- Cálculo automático de:
  - Subtotal
  - IVA (21%)
  - Envío ($150 fijo)
  - **TOTAL**
- Checkout con confirmación
- Historial de compras guardado

### 📦 Catálogo de Productos
- **42 productos** en 5 categorías:
  - 🕯️ Velas (10 productos)
  - 💨 Sprays (8 productos)
  - 🌫️ Difusores (8 productos)
  - 🧴 Aceites Esenciales (8 productos)
  - 🎁 Complementos (8 productos)

- Cada producto incluye:
  - Nombre y descripción
  - Precio y disponibilidad (stock)
  - Calificación (rating)
  - Imagen
  - Categoría

### 🔍 Buscador Funcional
- Búsqueda en tiempo real
- Autocompletado con 8 sugerencias
- Busca por: nombre, categoría, descripción
- Resultados dinámicos
- Modal con todos los resultados

### 🎨 Interfaz Moderna
- Diseño responsive (móvil, tablet, desktop)
- Transiciones suaves (0.3s)
- Notificaciones tipo toast
- Modal limpio y funcional
- Paleta de colores consistente

---

## 🚀 Cómo Usar

### 1. Abrir la Tienda
```bash
Abrir index.html en navegador
```

### 2. Loguear
```
Usuario: demo
Contraseña: demo123
```

El header cambiará a: `👤 DEMO | 🚪 Cerrar Sesión`

### 3. Explorar Productos
- Ir a **Productos** → Ver 42 items
- Filtrar por categoría
- Ver rating y stock

### 4. Buscar
- Escribir en el buscador
- Ver sugerencias en dropdown
- Click en sugerencia o presionar Enter

### 5. Comprar
- Click en "Agregar al Carrito"
- Click en 🛒 carrito
- Actualizar cantidades si es necesario
- "Finalizar Compra"
- Confirmar en modal de checkout

### 6. Cerrar Sesión
- Click en nombre usuario
- "Cerrar Sesión"

---

## 📁 Estructura de Archivos

```
caliTienda/
├── index.html                 (Página principal)
├── estilos/
│   └── styles.css             (9.3 KB - CSS optimizado)
├── funcionalidad/
│   ├── iniciar_sesion.js      (Autenticación + UI)
│   ├── carrito.js             (Modal + checkout)
│   ├── busqueda.js            (Buscador)
│   ├── productos.js           (Catálogo de 42 productos)
│   └── ...otros
├── secciones/
│   ├── productos.html
│   ├── login.html
│   ├── contacto.html
│   ├── nosotros.html
│   └── mayorista.html
├── CAMBIOS_REALIZADOS.md      (Fase 1)
├── MEJORASADICIONADAS.md      (Fase 2)
└── README.md                  (Este archivo)
```

---

## 💾 Almacenamiento Local

Los siguientes datos se guardan en `localStorage`:

### `usuarios`
```javascript
[
  { usuario: "demo", contraseña: "demo123", email: "demo@calitienda.com" },
  ...
]
```

### `usuarioActual`
```javascript
{
  usuario: "demo",
  email: "demo@calitienda.com",
  fechaLogin: "2024-04-15"
}
```

### `carrito`
```javascript
[
  { nombre: "Vela Lavanda", precio: 450, cantidad: 2 },
  ...
]
```

### `historial_compras`
```javascript
[
  {
    id: "abc123xyz",
    usuario: "demo",
    fecha: "15/4/2024",
    productos: [...],
    subtotal: 1000,
    impuesto: 210,
    total: 1360
  },
  ...
]
```

---

## 🛍️ Catálogo Completo

### Velas (10)
| Nombre | Precio | Stock |
|--------|--------|-------|
| Vela Soja Lavanda Premium | $450 | 25 |
| Vela Vainilla | $450 | 20 |
| Vela Rosa y Peonía | $500 | 15 |
| Vela Citrus Limón | $400 | 30 |
| Vela Eucalipto Menta | $450 | 20 |
| Vela Café Especiado | $480 | 18 |
| Vela Ámbar Caramelo | $500 | 22 |
| Vela Bosque Blanco | $450 | 25 |
| Vela Gardenia Blanca | $520 | 12 |
| Vela Vainilla Francesa | $550 | 10 |

### Sprays (8)
| Nombre | Precio | Stock |
|--------|--------|-------|
| Spray Lavanda | $250 | 40 |
| Spray Floral | $280 | 35 |
| Spray Citrus | $250 | 45 |
| Spray Eucalipto | $280 | 30 |
| Spray Vainilla | $300 | 25 |
| Spray Ocean | $270 | 35 |
| Spray Almízcares | $320 | 20 |
| Spray Té Verde | $290 | 28 |

### Difusores (8)
| Nombre | Precio | Stock |
|--------|--------|-------|
| Difusor Ultrasónico Blanco | $800 | 15 |
| Difusor Madera | $950 | 10 |
| Difusor Cerámica Manual | $600 | 20 |
| Humidificador Premium | $1200 | 8 |
| Difusor Vidrio | $700 | 12 |
| Difusor Portátil USB | $450 | 30 |
| Difusor Grande | $1000 | 6 |
| Difusor Bambú | $850 | 9 |

### Aceites Esenciales (8)
| Nombre | Precio | Stock |
|--------|--------|-------|
| Aceite Lavanda Pura | $350 | 50 |
| Aceite Eucalipto | $320 | 45 |
| Aceite Menta | $330 | 40 |
| Aceite Limón | $300 | 60 |
| Aceite Rose Premium | $500 | 20 |
| Aceite Árbol de Té | $340 | 35 |
| Aceite Franquincienso | $380 | 25 |
| Set 5 Aceites | $600 | 15 |

### Complementos (8)
| Nombre | Precio | Stock |
|--------|--------|-------|
| Portavelas Vidrio | $280 | 30 |
| Canastita Rattan | $320 | 25 |
| Bandeja Madera | $350 | 20 |
| Soporte Botellas | $200 | 40 |
| Collar Aroma | $150 | 50 |
| Piedras Lava | $180 | 60 |
| Caja Regalo Premium | $250 | 35 |
| Humidificador Básico | $400 | 18 |

---

## 🔧 Funciones Principales

### `funcionalidad/iniciar_sesion.js`
```javascript
// Loguear usuario
loguear(usuario, contraseña)

// Cerrar sesión
cerrarSesion()

// Actualizar UI
actualizarUIUsuario()
```

### `funcionalidad/carrito.js`
```javascript
// Agregar al carrito
agregarAlCarrito(producto)

// Ver carrito
mostrarCarrito()

// Actualizar cantidad
actualizarCantidad(index, nuevaCantidad)

// Eliminar del carrito
eliminarDelCarrito(index)

// Proceder al checkout
procederAlCheckout()

// Completar compra
completarCompra()
```

### `funcionalidad/busqueda.js`
```javascript
// Buscar productos
buscarProductos(termino)

// Obtener sugerencias
obtenerSugerencias(termino)

// Mostrar resultados
mostrarResultados(resultados)
```

### `funcionalidad/productos.js`
```javascript
// Obtener todos los productos
obtenerProductos()

// Filtrar por categoría
obtenerPorCategoria(categoria)

// Buscar producto
buscarProductos(termino)

// Obtener un producto
obtenerProductoPorId(id)

// Obtener categorías
obtenerCategorias()
```

---

## 🎯 Flujo de Usuario Completo

```
1. Abrir index.html
   ↓
2. Loguear (demo / demo123)
   ↓ Cambio: Header muestra "👤 DEMO | 🚪 Cerrar Sesión"
   ↓
3. Explorar Productos
   ├─ Ir a Productos → Ver 42 items
   ├─ Buscar (ej: "lavanda")
   └─ Seleccionar categoría
   ↓
4. Agregar al Carrito
   ├─ Click "Agregar al Carrito"
   ├─ Notificación verde: "Agregado al carrito"
   └─ Badge muestra cantidad total
   ↓
5. Ver Carrito
   ├─ Click en 🛒
   ├─ Modal muestra:
   │  ├─ Productos
   │  ├─ Cantidades (editables)
   │  ├─ Subtotal
   │  ├─ IVA (21%)
   │  ├─ Envío ($150)
   │  └─ TOTAL
   └─ Botones: Finalizar Compra | Seguir Comprando
   ↓
6. Checkout
   ├─ Modal de confirmación
   ├─ Muestra:
   │  ├─ Datos del usuario
   │  ├─ Listado de compra
   │  ├─ Desglose de precios
   │  └─ Nota: "Sistema de pago en desarrollo"
   └─ Click: Confirmar Pago
   ↓
7. Compra Completada
   ├─ Alerta de éxito
   ├─ Muestra:
   │  ├─ Usuario
   │  ├─ Total pagado
   │  └─ ID de seguimiento
   ├─ Carrito se vacía
   ├─ Historial se guarda
   └─ Redirige a inicio
   ↓
8. Logout
   ├─ Click nombre usuario
   └─ "Cerrar Sesión"
```

---

## 📊 Estadísticas

| Métrica | Cantidad |
|---------|----------|
| **Productos** | 42 |
| **Categorías** | 5 |
| **Precio Mínimo** | $150 |
| **Precio Máximo** | $1200 |
| **Stock Total** | ~1,000 unidades |
| **Rating Promedio** | 4.7/5 ⭐ |

---

## 🚀 Próximas Mejoras (Phase 3)

- [ ] Sistema de **Wishlist/Favoritos** ⭐
- [ ] **Reseñas** de productos (1-5 estrellas)
- [ ] Códigos de **Cupones** y descuentos
- [ ] Página de **Historial** de compras
- [ ] **Perfil** de usuario
- [ ] Filtros avanzados (precio, rating, etc)
- [ ] Integración **Mercado Pago** / **Stripe**
- [ ] **Admin Panel** para gestionar productos

---

## 🔒 Seguridad

- ✅ No hay API keys en el código
- ✅ Contraseñas no encriptadas (localStorage - MVP)
- ✅ HTTPS en CDN imports
- ✅ Sin datos sensibles en localStorage
- ⚠️ **Nota:** Para producción, implementar backend con autenticación segura

---

## 📝 Documentación Adicional

- **CAMBIOS_REALIZADOS.md** - Detalle de Fase 1 (overhaul)
- **MEJORASADICIONADAS.md** - Detalle de Fase 2 (carrito, auth, 42 productos)

---

## 📞 Soporte

Para reportar bugs o sugerir mejoras, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es de uso privado. Todos los derechos reservados.

---

**Última actualización:** 15 de Abril, 2024  
**Estado:** Phase 2 ✅ COMPLETADO  
**Próxima Fase:** Phase 3 (Wishlist, Reviews, Cupones)
