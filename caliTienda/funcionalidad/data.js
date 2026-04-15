// ═══════════════════════════════════════════════════════════════
// 📊 DATOS INICIALES - Usuarios y Productos
// ═══════════════════════════════════════════════════════════════

const USUARIOS_INICIALES = [
    {
        username: "demo",
        email: "demo@calitienda.com",
        password: "demo123",
        nombre: "Usuario Demo",
        fechaRegistro: new Date()
    },
    {
        username: "test",
        email: "test@calitienda.com",
        password: "test123",
        nombre: "Usuario Test",
        fechaRegistro: new Date()
    }
]

const PRODUCTOS_INICIALES = [
    // VELAS (10)
    { id: 1, nombre: "Vela Soja Lavanda Premium", categoria: "Velas", precio: 450, stock: 25, imagen: "vela-lavanda.jpg", descripcion: "Vela 100% soja, aroma relajante, duración 40hs", rating: 4.8 },
    { id: 2, nombre: "Vela Vainilla", categoria: "Velas", precio: 450, stock: 20, imagen: "vela-vainilla.jpg", descripcion: "Dulce y acogedora, perfecta para cualquier momento", rating: 4.7 },
    { id: 3, nombre: "Vela Rosa y Peonía", categoria: "Velas", precio: 500, stock: 15, imagen: "vela-rosa.jpg", descripcion: "Floral elegante, larga duración", rating: 4.9 },
    { id: 4, nombre: "Vela Citrus Limón", categoria: "Velas", precio: 400, stock: 30, imagen: "vela-citrus.jpg", descripcion: "Fresco y energético", rating: 4.6 },
    { id: 5, nombre: "Vela Eucalipto Menta", categoria: "Velas", precio: 450, stock: 20, imagen: "vela-eucalipto.jpg", descripcion: "Refrescante y revitalizante", rating: 4.7 },
    { id: 6, nombre: "Vela Café Especiado", categoria: "Velas", precio: 480, stock: 18, imagen: "vela-cafe.jpg", descripcion: "Aroma cálido y acogedor", rating: 4.8 },
    { id: 7, nombre: "Vela Ámbar Caramelo", categoria: "Velas", precio: 500, stock: 22, imagen: "vela-ambar.jpg", descripcion: "Dulce ambarino con toques de caramelo", rating: 4.9 },
    { id: 8, nombre: "Vela Bosque Blanco", categoria: "Velas", precio: 450, stock: 25, imagen: "vela-bosque.jpg", descripcion: "Fresco aroma silvestre", rating: 4.7 },
    { id: 9, nombre: "Vela Gardenia Blanca", categoria: "Velas", precio: 520, stock: 12, imagen: "vela-gardenia.jpg", descripcion: "Floral refinado y delicado", rating: 4.9 },
    { id: 10, nombre: "Vela Vainilla Francesa", categoria: "Velas", precio: 550, stock: 10, imagen: "vela-vainilla-fr.jpg", descripcion: "Premium vainilla francesa", rating: 5.0 },

    // SPRAYS (8)
    { id: 11, nombre: "Spray Lavanda", categoria: "Sprays", precio: 250, stock: 40, imagen: "spray-lavanda.jpg", descripcion: "Relajación instantánea", rating: 4.6 },
    { id: 12, nombre: "Spray Floral", categoria: "Sprays", precio: 280, stock: 35, imagen: "spray-floral.jpg", descripcion: "Mezcla floral elegante", rating: 4.7 },
    { id: 13, nombre: "Spray Citrus", categoria: "Sprays", precio: 250, stock: 45, imagen: "spray-citrus.jpg", descripcion: "Energía cítrica", rating: 4.6 },
    { id: 14, nombre: "Spray Eucalipto", categoria: "Sprays", precio: 280, stock: 30, imagen: "spray-eucalipto.jpg", descripcion: "Fresco y limpio", rating: 4.7 },
    { id: 15, nombre: "Spray Vainilla", categoria: "Sprays", precio: 300, stock: 25, imagen: "spray-vainilla.jpg", descripcion: "Dulzura envolvente", rating: 4.8 },
    { id: 16, nombre: "Spray Ocean", categoria: "Sprays", precio: 270, stock: 35, imagen: "spray-ocean.jpg", descripcion: "Aroma marino fresco", rating: 4.7 },
    { id: 17, nombre: "Spray Almízcares", categoria: "Sprays", precio: 320, stock: 20, imagen: "spray-almiscares.jpg", descripcion: "Sofisticado y moderno", rating: 4.8 },
    { id: 18, nombre: "Spray Té Verde", categoria: "Sprays", precio: 290, stock: 28, imagen: "spray-te.jpg", descripcion: "Relajante y aromático", rating: 4.7 },

    // DIFUSORES (8)
    { id: 19, nombre: "Difusor Ultrasónico Blanco", categoria: "Difusores", precio: 800, stock: 15, imagen: "difusor-ultrasonico.jpg", descripcion: "Tecnología ultrasónica con luz LED", rating: 4.8 },
    { id: 20, nombre: "Difusor Madera", categoria: "Difusores", precio: 950, stock: 10, imagen: "difusor-madera.jpg", descripcion: "Diseño natural de madera maciza", rating: 4.9 },
    { id: 21, nombre: "Difusor Cerámica Manual", categoria: "Difusores", precio: 600, stock: 20, imagen: "difusor-ceramica.jpg", descripcion: "Manual elegante en cerámica", rating: 4.7 },
    { id: 22, nombre: "Humidificador Premium", categoria: "Difusores", precio: 1200, stock: 8, imagen: "humidificador-premium.jpg", descripcion: "Humidificador + difusor profesional", rating: 5.0 },
    { id: 23, nombre: "Difusor Vidrio", categoria: "Difusores", precio: 700, stock: 12, imagen: "difusor-vidrio.jpg", descripcion: "Diseño moderno en vidrio", rating: 4.8 },
    { id: 24, nombre: "Difusor Portátil USB", categoria: "Difusores", precio: 450, stock: 30, imagen: "difusor-portatil.jpg", descripcion: "Portátil USB para cualquier lugar", rating: 4.6 },
    { id: 25, nombre: "Difusor Grande", categoria: "Difusores", precio: 1000, stock: 6, imagen: "difusor-grande.jpg", descripcion: "Cubre espacios amplios", rating: 4.9 },
    { id: 26, nombre: "Difusor Bambú", categoria: "Difusores", precio: 850, stock: 9, imagen: "difusor-bambu.jpg", descripcion: "Sostenible y ecológico", rating: 4.8 },

    // ACEITES (8)
    { id: 27, nombre: "Aceite Lavanda Pura", categoria: "Aceites", precio: 350, stock: 50, imagen: "aceite-lavanda.jpg", descripcion: "100% lavanda pura sin dilución", rating: 4.9 },
    { id: 28, nombre: "Aceite Eucalipto", categoria: "Aceites", precio: 320, stock: 45, imagen: "aceite-eucalipto.jpg", descripcion: "Eucalipto puro y potente", rating: 4.7 },
    { id: 29, nombre: "Aceite Menta", categoria: "Aceites", precio: 330, stock: 40, imagen: "aceite-menta.jpg", descripcion: "Refrescante y vigorizante", rating: 4.8 },
    { id: 30, nombre: "Aceite Limón", categoria: "Aceites", precio: 300, stock: 60, imagen: "aceite-limon.jpg", descripcion: "Cítrico puro", rating: 4.6 },
    { id: 31, nombre: "Aceite Rose Premium", categoria: "Aceites", precio: 500, stock: 20, imagen: "aceite-rose.jpg", descripcion: "Rosa de Damasco premium", rating: 5.0 },
    { id: 32, nombre: "Aceite Árbol de Té", categoria: "Aceites", precio: 340, stock: 35, imagen: "aceite-arbol-te.jpg", descripcion: "Árbol de té puro australiano", rating: 4.8 },
    { id: 33, nombre: "Aceite Franquincienso", categoria: "Aceites", precio: 380, stock: 25, imagen: "aceite-franquincienso.jpg", descripcion: "Sagrado y meditativo", rating: 4.9 },
    { id: 34, nombre: "Set 5 Aceites", categoria: "Aceites", precio: 600, stock: 15, imagen: "set-aceites.jpg", descripcion: "Combinación de 5 aceites esenciales", rating: 4.8 },

    // COMPLEMENTOS (8)
    { id: 35, nombre: "Portavelas Vidrio", categoria: "Complementos", precio: 280, stock: 30, imagen: "portavelas-vidrio.jpg", descripcion: "Elegante portavelas de vidrio", rating: 4.7 },
    { id: 36, nombre: "Canastita Rattan", categoria: "Complementos", precio: 320, stock: 25, imagen: "canastita-rattan.jpg", descripcion: "Organizador de productos en rattan", rating: 4.8 },
    { id: 37, nombre: "Bandeja Madera", categoria: "Complementos", precio: 350, stock: 20, imagen: "bandeja-madera.jpg", descripcion: "Bandeja decorativa de madera", rating: 4.8 },
    { id: 38, nombre: "Soporte Botellas", categoria: "Complementos", precio: 200, stock: 40, imagen: "soporte-botellas.jpg", descripcion: "Soporte para botellas de aceites", rating: 4.6 },
    { id: 39, nombre: "Collar Aroma", categoria: "Complementos", precio: 150, stock: 50, imagen: "collar-aroma.jpg", descripcion: "Collar aromático portátil", rating: 4.7 },
    { id: 40, nombre: "Piedras Lava", categoria: "Complementos", precio: 180, stock: 60, imagen: "piedras-lava.jpg", descripcion: "Piedras de lava para aromaterapia", rating: 4.6 },
    { id: 41, nombre: "Caja Regalo Premium", categoria: "Complementos", precio: 250, stock: 35, imagen: "caja-regalo.jpg", descripcion: "Caja regalo elegante", rating: 4.9 },
    { id: 42, nombre: "Humidificador Básico", categoria: "Complementos", precio: 400, stock: 18, imagen: "humidificador-basico.jpg", descripcion: "Humidificador portátil básico", rating: 4.7 }
]

// Función para inicializar datos de usuarios
async function initDatos() {
    try {
        for (const usuario of USUARIOS_INICIALES) {
            await caliDB.agregarUsuario(usuario.username, usuario.email, usuario.password)
        }
        console.log("✅ Usuarios iniciales creados")
    } catch (error) {
        console.warn("⚠️ Error creando usuarios (pueden existir):", error.message)
    }
}

// Función para inicializar productos
async function initProductos() {
    try {
        for (const producto of PRODUCTOS_INICIALES) {
            await caliDB.agregarProducto(producto)
        }
        console.log("✅ Productos iniciales creados (" + PRODUCTOS_INICIALES.length + " items)")
    } catch (error) {
        console.warn("⚠️ Error creando productos (pueden existir):", error.message)
    }
}
