const user = document.getElementById("user")
const password = document.getElementById("password")
const formlogin = document.getElementById("formlogin")
const login = document.getElementById("login")
const registerUser = document.getElementById("register")
const recuperarContraseña = document.getElementById("recuperarContraseña")

let users = JSON.parse(localStorage.getItem("users")) || [{
    username: "demo",
    password: "demo123",
    email: "demo@calitienda.com"
}]

let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null

function logIn() {
    let usuarioIngresado = users.find(userU => userU.username === user.value)

    if (usuarioIngresado == undefined) {
        Swal.fire('Usuario no encontrado', 'Por favor, regístrese', 'error')
    } else if (usuarioIngresado.password !== password.value) {
        Swal.fire('Contraseña incorrecta', '', 'error')
    } else {
        usuarioActual = usuarioIngresado
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual))
        Swal.fire('Bienvenido', '¡Hola ' + usuarioIngresado.username + '!', 'success')
        actualizarUIUsuario()
        setTimeout(() => window.location.href = "../index.html", 1500)
    }
}

login.onclick = (e) => {
    e.preventDefault()
    logIn()
}

class NewUser {
    constructor(email, username, password) {
        this.email = email
        this.username = username
        this.password = password
    }
}

const divRegister = document.querySelector("#divRegister")

function register() {
    const nuevoUsuario = new NewUser(emailInput.value, inputUser.value, inputPassword.value)
    users.push(nuevoUsuario)
}

registerUser.onclick = (e) => {
    e.preventDefault()
    divRegister.style.display = "flex"
    const formRegister = document.getElementById("formRegister")
    const emailInput = document.getElementById("inputEmail")
    const inputUser = document.getElementById("inputUser")
    const inputPassword = document.getElementById("inputPassword")

    formRegister.onsubmit = (e) => {
        e.preventDefault()
        let mailExiste = users.some((userA) => userA.email === emailInput.value)
        let usernameExiste = users.some((userA) => userA.username === inputUser.value)

        if (mailExiste || usernameExiste) {
            Swal.fire('Este usuario ya se encuentra registrado')
        } else {
            const newUser = new NewUser(emailInput.value, inputUser.value, inputPassword.value)
            users.push(newUser)
            divRegister.style.display = "none"
            setStorage()
            Swal.fire('Registro exitoso', 'Cuenta creada correctamente', 'success')
        }
    }
}

const recuperarContrasenia = document.getElementById("recuperarContrasenia")
const divNewPass = document.getElementById("newPassw")
const emailRecuperar = document.getElementById("emailRecuperar")
const passRecuperar = document.getElementById("passRecuperar")
const passConfirm = document.getElementById("passConfirm")
const cambiarPass = document.getElementById("cambiarPass")

function showPassword() {
    let mailRegistrado = users.find(userF => userF.email === emailRecuperar.value)

    if (mailRegistrado !== undefined) {
        if (passRecuperar.value === passConfirm.value) {
            mailRegistrado.password = passRecuperar.value
            Swal.fire('Contraseña cambiada', 'Tu contraseña ha sido actualizada', 'success')
            setStorage()
        } else {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
        }
    } else {
        Swal.fire('Error', 'No se encontró el usuario con ese email', 'error')
    }
}

recuperarContrasenia.onclick = (e) => {
    e.preventDefault()
    divNewPass.style.display = "flex"
    cambiarPass.onclick = (e) => {
        e.preventDefault()
        showPassword()
        divNewPass.style.display = "none"
    }
}

function setStorage(){
    localStorage.setItem("users", JSON.stringify(users))
}

function cerrarSesion() {
    usuarioActual = null
    localStorage.removeItem("usuarioActual")
    Swal.fire('Sesión cerrada', 'Hasta pronto', 'info')
    setTimeout(() => window.location.href = "../index.html", 1000)
}

function actualizarUIUsuario() {
    const crearcuentaBtn = document.getElementById("CrearCuenta")
    const iniciarsesionBtn = document.getElementById("IniciarSesion")
    
    if (usuarioActual && crearcuentaBtn && iniciarsesionBtn) {
        // Ocultar botones de login
        crearcuentaBtn.style.display = "none"
        
        // Mostrar nombre de usuario y logout
        iniciarsesionBtn.textContent = "👤 " + usuarioActual.username.toUpperCase() + " | 🚪 Logout"
        iniciarsesionBtn.href = "#"
        iniciarsesionBtn.style.backgroundColor = "#917255"
        iniciarsesionBtn.style.color = "white"
        iniciarsesionBtn.style.padding = "10px 15px"
        iniciarsesionBtn.onclick = (e) => {
            e.preventDefault()
            cerrarSesion()
        }
    } else if (crearcuentaBtn && iniciarsesionBtn) {
        // Mostrar botones normales si no está logueado
        crearcuentaBtn.style.display = "inline-block"
        iniciarsesionBtn.textContent = "Iniciar Sesión"
        iniciarsesionBtn.href = "./secciones/login.html"
        iniciarsesionBtn.style.backgroundColor = ""
        iniciarsesionBtn.style.color = ""
        iniciarsesionBtn.onclick = null
    }
}

window.addEventListener('load', () => {
    actualizarUIUsuario()
})
