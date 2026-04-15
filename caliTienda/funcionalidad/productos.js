// Datos de productos para el catálogo
const productosData = [
  // VELAS DE SOJA (10)
  { id: 1, nombre: 'Vela Soja Lavanda Premium', categoria: 'Velas', precio: 450, stock: 25, imagen: 'vela-lavanda.jpg', descripcion: 'Vela 100% soja, aroma relajante, duración 40hs', rating: 4.8 },
  { id: 2, nombre: 'Vela Soja Vainilla', categoria: 'Velas', precio: 450, stock: 20, imagen: 'vela-vainilla.jpg', descripcion: 'Aroma dulce y cálido, ambiente acogedor', rating: 4.7 },
  { id: 3, nombre: 'Vela Soja Rosa y Peonía', categoria: 'Velas', precio: 500, stock: 15, imagen: 'vela-rosa.jpg', descripcion: 'Aroma floral elegante, envase premium', rating: 5.0 },
  { id: 4, nombre: 'Vela Soja Citrus Limón', categoria: 'Velas', precio: 400, stock: 30, imagen: 'vela-citrus.jpg', descripcion: 'Aroma refrescante para espacios claros', rating: 4.6 },
  { id: 5, nombre: 'Vela Soja Eucalipto Menta', categoria: 'Velas', precio: 450, stock: 22, imagen: 'vela-eucalipto.jpg', descripcion: 'Aroma mentolado, energizante', rating: 4.9 },
  { id: 6, nombre: 'Vela Soja Café Especiado', categoria: 'Velas', precio: 480, stock: 18, imagen: 'vela-cafe.jpg', descripcion: 'Aroma cálido a café tostado', rating: 4.5 },
  { id: 7, nombre: 'Vela Soja Ámbar Caramelo', categoria: 'Velas', precio: 500, stock: 16, imagen: 'vela-ambar.jpg', descripcion: 'Aroma dulce y seductor', rating: 5.0 },
  { id: 8, nombre: 'Vela Soja Bosque Blanco', categoria: 'Velas', precio: 450, stock: 24, imagen: 'vela-bosque.jpg', descripcion: 'Aroma fresco a pino y madera', rating: 4.7 },
  { id: 9, nombre: 'Vela Soja Gardenia Blanca', categoria: 'Velas', precio: 520, stock: 12, imagen: 'vela-gardenia.jpg', descripcion: 'Premium, aroma floral intenso', rating: 4.9 },
  { id: 10, nombre: 'Vela Soja Vainilla Francesa', categoria: 'Velas', precio: 550, stock: 10, imagen: 'vela-vainilla-fr.jpg', descripcion: 'Fragancia importada, gourmet', rating: 5.0 },

  // SPRAYS (8)
  { id: 11, nombre: 'Spray Ambientador Lavanda', categoria: 'Sprays', precio: 250, stock: 40, imagen: 'spray-lavanda.jpg', descripcion: 'Spray 300ml, aroma duradero', rating: 4.6 },
  { id: 12, nombre: 'Spray Ambientador Floral', categoria: 'Sprays', precio: 280, stock: 35, imagen: 'spray-floral.jpg', descripcion: 'Mezcla floral exótica', rating: 4.7 },
  { id: 13, nombre: 'Spray Ambientador Citrus', categoria: 'Sprays', precio: 250, stock: 45, imagen: 'spray-citrus.jpg', descripcion: 'Refrescante y energizante', rating: 4.5 },
  { id: 14, nombre: 'Spray Ambientador Eucalipto', categoria: 'Sprays', precio: 280, stock: 30, imagen: 'spray-eucalipto.jpg', descripcion: 'Limpiador del aire, mentolado', rating: 4.8 },
  { id: 15, nombre: 'Spray Ambientador Vainilla', categoria: 'Sprays', precio: 300, stock: 28, imagen: 'spray-vainilla.jpg', descripcion: 'Premium vainilla pura', rating: 4.9 },
  { id: 16, nombre: 'Spray Ambientador Ocean', categoria: 'Sprays', precio: 270, stock: 32, imagen: 'spray-ocean.jpg', descripcion: 'Aroma fresco a brisa marina', rating: 4.7 },
  { id: 17, nombre: 'Spray Ambientador Almízcares', categoria: 'Sprays', precio: 320, stock: 20, imagen: 'spray-almizcares.jpg', descripcion: 'Lujo y sofisticación', rating: 5.0 },
  { id: 18, nombre: 'Spray Ambientador Té Verde', categoria: 'Sprays', precio: 290, stock: 25, imagen: 'spray-te.jpg', descripcion: 'Zen y relajante', rating: 4.8 },

  // DIFUSORES (8)
  { id: 19, nombre: 'Difusor Ultrasónico Blanco', categoria: 'Difusores', precio: 800, stock: 12, imagen: 'difusor-blanco.jpg', descripcion: 'LED RGB, 400ml, 7 colores', rating: 4.9 },
  { id: 20, nombre: 'Difusor Ultrasónico Madera', categoria: 'Difusores', precio: 950, stock: 8, imagen: 'difusor-madera.jpg', descripcion: 'Madera natural, elegante', rating: 5.0 },
  { id: 21, nombre: 'Difusor Cerámica Manual', categoria: 'Difusores', precio: 600, stock: 18, imagen: 'difusor-ceramica.jpg', descripcion: 'Sin electricidad, difusión natural', rating: 4.6 },
  { id: 22, nombre: 'Difusor Humidificador Premium', categoria: 'Difusores', precio: 1200, stock: 5, imagen: 'difusor-premium.jpg', descripcion: 'Niebla fría, humidificador', rating: 5.0 },
  { id: 23, nombre: 'Difusor Aromático Vidrio', categoria: 'Difusores', precio: 700, stock: 10, imagen: 'difusor-vidrio.jpg', descripcion: 'Vidrio borosilicato, moderno', rating: 4.7 },
  { id: 24, nombre: 'Difusor Portátil USB', categoria: 'Difusores', precio: 450, stock: 22, imagen: 'difusor-usb.jpg', descripcion: 'Carga USB, para escritorio', rating: 4.8 },
  { id: 25, nombre: 'Difusor Ambiente Grande', categoria: 'Difusores', precio: 1000, stock: 6, imagen: 'difusor-grande.jpg', descripcion: '600ml, cubre espacios amplios', rating: 4.9 },
  { id: 26, nombre: 'Difusor Aromático Bambú', categoria: 'Difusores', precio: 850, stock: 9, imagen: 'difusor-bambu.jpg', descripcion: 'Bambu sostenible, elegante', rating: 4.8 },

  // ACEITES ESENCIALES (8)
  { id: 27, nombre: 'Aceite Esencial Lavanda Pura', categoria: 'Aceites', precio: 350, stock: 35, imagen: 'aceite-lavanda.jpg', descripcion: '30ml, 100% puro', rating: 4.9 },
  { id: 28, nombre: 'Aceite Esencial Eucalipto', categoria: 'Aceites', precio: 320, stock: 40, imagen: 'aceite-eucalipto.jpg', descripcion: 'Descongestivo, respiratorio', rating: 4.8 },
  { id: 29, nombre: 'Aceite Esencial Menta', categoria: 'Aceites', precio: 330, stock: 38, imagen: 'aceite-menta.jpg', descripcion: 'Energizante, refrescante', rating: 4.7 },
  { id: 30, nombre: 'Aceite Esencial Limón', categoria: 'Aceites', precio: 300, stock: 45, imagen: 'aceite-limon.jpg', descripcion: 'Cítrico, limpiador', rating: 4.6 },
  { id: 31, nombre: 'Aceite Esencial Rose Premium', categoria: 'Aceites', precio: 500, stock: 15, imagen: 'aceite-rosa.jpg', descripcion: 'Rosa de Damasco pura', rating: 5.0 },
  { id: 32, nombre: 'Aceite Esencial Árbol de Té', categoria: 'Aceites', precio: 340, stock: 32, imagen: 'aceite-tea-tree.jpg', descripcion: 'Antibacteriano, purificante', rating: 4.9 },
  { id: 33, nombre: 'Aceite Esencial Franquincienso', categoria: 'Aceites', precio: 380, stock: 20, imagen: 'aceite-franquincienso.jpg', descripcion: 'Meditativo, relajante', rating: 4.8 },
  { id: 34, nombre: 'Set de 5 Aceites Variados', categoria: 'Aceites', precio: 600, stock: 25, imagen: 'set-aceites.jpg', descripcion: 'Variedad: Lav, Euc, Menta, Limón, Rosa', rating: 5.0 },

  // COMPLEMENTOS (8)
  { id: 35, nombre: 'Portavelas Vidrio Decorativo', categoria: 'Complementos', precio: 280, stock: 30, imagen: 'portavelas-vidrio.jpg', descripcion: 'Vidrio con diseño, reutilizable', rating: 4.7 },
  { id: 36, nombre: 'Canastita Rattan Decorativa', categoria: 'Complementos', precio: 320, stock: 22, imagen: 'canasta-rattan.jpg', descripcion: 'Rattan natural, 35cm', rating: 4.8 },
  { id: 37, nombre: 'Bandeja Madera Aromática', categoria: 'Complementos', precio: 350, stock: 18, imagen: 'bandeja-madera.jpg', descripcion: 'Madera de bambú, minimalista', rating: 4.6 },
  { id: 38, nombre: 'Soporte para Aceites Botellas', categoria: 'Complementos', precio: 200, stock: 40, imagen: 'soporte-aceites.jpg', descripcion: 'Acrílico, para 6 botellas', rating: 4.5 },
  { id: 39, nombre: 'Difusor Collar de Aromaterapia', categoria: 'Complementos', precio: 150, stock: 50, imagen: 'collar-aroma.jpg', descripcion: 'Portátil, para llevar en el cuello', rating: 4.6 },
  { id: 40, nombre: 'Piedras de Lava para Difusión', categoria: 'Complementos', precio: 180, stock: 35, imagen: 'piedras-lava.jpg', descripcion: '20 piedras, absorbe aromas', rating: 4.7 },
  { id: 41, nombre: 'Caja Regalo Premium Deluxe', categoria: 'Complementos', precio: 250, stock: 20, imagen: 'caja-regalo.jpg', descripcion: 'Envase regalo con accesorios', rating: 4.9 },
  { id: 42, nombre: 'Humidificador Ultrasónico Básico', categoria: 'Complementos', precio: 400, stock: 15, imagen: 'humidificador.jpg', descripcion: 'Doble función, 300ml', rating: 4.7 },
];

// Recuperar todos los productos
function obtenerProductos() {
  return productosData;
}

// Recuperar productos por categoría
function obtenerPorCategoria(categoria) {
  return productosData.filter(p => p.categoria === categoria);
}

// Obtener categorías únicas
function obtenerCategorias() {
  return [...new Set(productosData.map(p => p.categoria))];
}

// Buscar productos
function buscarProductos(termino) {
  const terminoLower = termino.toLowerCase();
  return productosData.filter(p => 
    p.nombre.toLowerCase().includes(terminoLower) ||
    p.descripcion.toLowerCase().includes(terminoLower) ||
    p.categoria.toLowerCase().includes(terminoLower)
  );
}

// Obtener producto por ID
function obtenerProductoPorId(id) {
  return productosData.find(p => p.id === id);
}
