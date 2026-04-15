// ═══════════════════════════════════════════════════════════════
// 🔐 SISTEMA DE AUTENTICACIÓN - IndexedDB
// ═══════════════════════════════════════════════════════════════

let usuarioActual = null

// Elemento del formulario de login
const user = document.getElementById("user")
const password = document.getElementById("password")
const formlogin = document.getElementById("formlogin")
const login = document.getElementById("login")
const registerUser = document.getElementById("register")
const recuperarContraseña = document.getElementById("recuperarContraseña")

// Esperar a que DB esté lista
window.addEventListener('load', async () => {
    console.log("📄 Página cargada, verificando sesión...")
    
    // Esperar un poco a que la DB se inicialice
    let intentos = 0
    while (!caliDB.initialized && intentos < 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        intentos++
    }
    
    if (caliDB.initialized) {
        try {
            usuarioActual = await caliDB.obtenerSesion()
            console.log("🔍 Sesión actual:", usuarioActual)
            actualizarUIUsuario()
        } catch (error) {
            console.error("❌ Error obteniendo sesión:", error)
        }
    } else {
        console.warn("⚠️ Base de datos no se inicializó a tiempo")
    }
})

// ═══════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════

async function logIn() {
    if (!user || !password || !user.value || !password.value) {
        Swal.fire('Error', 'Por favor completa usuario y contraseña', 'error')
        return
    }

    try {
        const usuarioEncontrado = await caliDB.obtenerUsuarioPorUsername(user.value)
        
        if (!usuarioEncontrado) {
            Swal.fire('Usuario no encontrado', 'Por favor, regístrate', 'error')
            return
        }
        
        if (usuarioEncontrado.password !== password.value) {
            Swal.fire('Contraseña incorrecta', '', 'error')
            return
        }
        
        // Login exitoso
        usuarioActual = {
            username: usuarioEncontrado.username,
            email: usuarioEncontrado.email,
            nombre: usuarioEncontrado.nombre
        }
        
        await caliDB.guardarSesion(usuarioActual)
        
        Swal.fire('Bienvenido', '¡Hola ' + usuarioEncontrado.username + '!', 'success')
        
        console.log("✅ Login exitoso:", usuarioActual.username)
        
        actualizarUIUsuario()
        
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1500)
        
    } catch (error) {
        console.error("❌ Error en login:", error)
        Swal.fire('Error', 'Hubo un error al iniciar sesión: ' + error.message, 'error')
    }
}

if (login) {
    login.onclick = (e) => {
        e.preventDefault()
        logIn()
    }
}

// ═══════════════════════════════════════════════════════════════
// REGISTRO
// ═══════════════════════════════════════════════════════════════

const divRegister = document.querySelector("#divRegister")

if (registerUser) {
    registerUser.onclick = (e) => {
        e.preventDefault()
        if (divRegister) divRegister.style.display = "flex"
        
        const formRegister = document.getElementById("formRegister")
        const emailInput = document.getElementById("inputEmail")
        const inputUser = document.getElementById("inputUser")
        const inputPassword = document.getElementById("inputPassword")

        if (formRegister) {
            formRegister.onsubmit = async (e) => {
                e.preventDefault()
                
                try {
                    const usuarioExistente = await caliDB.obtenerUsuarioPorUsername(inputUser.value)
                    
                    if (usuarioExistente) {
                        Swal.fire('Este usuario ya existe', 'Por favor elige otro nombre', 'warning')
                        return
                    }
                    
                    await caliDB.agregarUsuario(inputUser.value, emailInput.value, inputPassword.value)
                    
                    if (divRegister) divRegister.style.display = "none"
                    Swal.fire('Registro exitoso', 'Cuenta creada correctamente', 'success')
                    
                    console.log("✅ Nuevo usuario registrado:", inputUser.value)
                    
                    // Limpiar formulario
                    if (formRegister) formRegister.reset()
                    
                } catch (error) {
                    console.error("❌ Error en registro:", error)
                    Swal.fire('Error', 'No se pudo crear la cuenta: ' + error.message, 'error')
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// RECUPERAR CONTRASEÑA
// ═══════════════════════════════════════════════════════════════

const recuperarContrasenia = document.getElementById("recuperarContrasenia")
const divNewPass = document.getElementById("newPassw")
const emailRecuperar = document.getElementById("emailRecuperar")
const passRecuperar = document.getElementById("passRecuperar")
const passConfirm = document.getElementById("passConfirm")
const cambiarPass = document.getElementById("cambiarPass")

// (Implementar recuperación de contraseña con IndexedDB si es necesario)

// ═══════════════════════════════════════════════════════════════
// CERRAR SESIÓN
// ═══════════════════════════════════════════════════════════════

async function cerrarSesion() {
    try {
        await caliDB.cerrarSesion()
        usuarioActual = null
        Swal.fire('Sesión cerrada', 'Hasta pronto', 'info')
        console.log("🚪 Logout exitoso")
        
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1000)
    } catch (error) {
        console.error("❌ Error cerrando sesión:", error)
    }
}

// ═══════════════════════════════════════════════════════════════
// ACTUALIZAR UI DE USUARIO
// ═══════════════════════════════════════════════════════════════

function actualizarUIUsuario() {
    console.log("🔄 Actualizando UI Usuario. usuarioActual:", usuarioActual)
    
    const authMenu = document.getElementById("auth-menu")
    const crearCuentaBtn = document.getElementById("CrearCuenta")
    const iniciarSesionBtn = document.getElementById("IniciarSesion")
    const usuarioLogueadoLi = document.getElementById("usuario-logueado")
    const nombreUsuarioSpan = document.getElementById("nombre-usuario")
    const btnLogout = document.getElementById("btn-logout")
    
    if (!authMenu) {
        console.warn("⚠️ auth-menu no encontrado en el DOM")
        return
    }
    
    if (usuarioActual) {
        console.log("✅ Usuario logueado:", usuarioActual.username)
        
        // Ocultar botones de login
        if (crearCuentaBtn) crearCuentaBtn.style.display = "none"
        if (iniciarSesionBtn) iniciarSesionBtn.style.display = "none"
        
        // Mostrar datos de usuario logueado
        if (usuarioLogueadoLi) {
            usuarioLogueadoLi.style.display = "flex"
            usuarioLogueadoLi.style.alignItems = "center"
            usuarioLogueadoLi.style.gap = "10px"
        }
        
        if (nombreUsuarioSpan) {
            nombreUsuarioSpan.textContent = "👤 " + usuarioActual.username.toUpperCase()
        }
        
        // Conexión del botón logout
        if (btnLogout) {
            btnLogout.onclick = (e) => {
                e.preventDefault()
                console.log("🚪 Logout clickeado")
                cerrarSesion()
            }
        }
    } else {
        console.log("❌ Sin usuario logueado")
        
        // Mostrar botones de login
        if (crearCuentaBtn) crearCuentaBtn.style.display = "inline-block"
        if (iniciarSesionBtn) iniciarSesionBtn.style.display = "inline-block"
        
        // Ocultar datos de usuario
        if (usuarioLogueadoLi) usuarioLogueadoLi.style.display = "none"
    }
}

// Llamar también cuando el DOM está completamente listo
document.addEventListener('DOMContentLoaded', async () => {
    console.log("📄 DOM Contenido cargado")
    
    // Esperar a que DB esté lista
    let intentos = 0
    while (!caliDB.initialized && intentos < 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        intentos++
    }
    
    if (caliDB.initialized) {
        try {
            usuarioActual = await caliDB.obtenerSesion()
            actualizarUIUsuario()
        } catch (error) {
            console.error("❌ Error:", error)
        }
    }
})
