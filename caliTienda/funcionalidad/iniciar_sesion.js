const user = document.getElementById("user")
const password = document.getElementById("password")
const formlogin = document.getElementById("formlogin")
const login = document.getElementById("login")

const registerUser = document.getElementById("register")
const recuperarContraseña = document.getElementById("recuperarContraseña")

let users = JSON.parse(localStorage.getItem("users")) || [{
    username: "rnico",
    password: "123456",
    email: "rnico@gmail.com"
}]

console.log(users)





// INICIAR SESION
function logIn() {
    let usuarioIngresado = users.find(userU => userU.username === user.value)

    if (usuarioIngresado == undefined) {
        Swal.fire(
            'Usuario no encontrado',
            'por favor registrese',
            'error'
        )
    } else if (usuarioIngresado.password !== password.value) {
        Swal.fire(
            'Contraseña incorrecta',
            '',
            'error'
        )
    } else {
        window.location.href = "../index.html"
    }
}

login.onclick = (e) => {
    e.preventDefault()
    logIn()
}

//REGISTRAR
class NewUser {
    constructor(email, username, password) {
        this.email = email,
            this.username = username,
            this.password = password
    }
}


const divRegister = document.querySelector("#divRegister");


function register() {
    const nuevoUsuario = new NewUser(emailInput.value, inputUser.value, inputPassword.value)
    users.push(nuevoUsuario)
    console.log(nuevoUsuario)
    console.log(users)
}

registerUser.onclick = (e) => {
    e.preventDefault()
    divRegister.style.display = "flex"
    const formRegister = document.getElementById("formRegister")
    const emailInput = document.getElementById("inputEmail");
    const inputUser = document.getElementById("inputUser")
    const inputPassword = document.getElementById("inputPassword");

    formRegister.onsubmit = (e) => {
        e.preventDefault()
        let mailExiste = users.some((userA) => userA.email === emailInput.value)
    
        let usernameExiste = users.some((userA) => userA.username === inputUser.value)
       

        function nuevoUsuario() {
            const newUser = new NewUser(emailInput.value, inputUser.value, inputPassword.value)
            users.push(newUser)
            console.log(users)
            divRegister.style.display = "none"
            setStorage()
        }

        (mailExiste || usernameExiste) ? alert("Este usuario ya se encuentra registrado"): nuevoUsuario()
    }

}

//RECUPERAR
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
            alert("Contraseña cambiada")
            console.log(mailRegistrado)
            setStorage()
        } else {
            alert("La contraseña no coincide")
        }
    } else {
        alert("No se encontro el usuario")
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









// const user = document.getElementById("user")
// const password = document.getElementById("clave")
// const name = document.getElementById("nombre")
// const lastName = document.getElementById("apellido")
// const email = document.getElementById("mail")
// const registerUser = document.getElementById("RegisterAceptar")
// const formlogin = document.getElementById("formlogin")
// const login = document.getElementById("login")
// const recuperarContraseña = document.getElementById("recuperarContraseña")

// let users = JSON.parse(localStorage.getItem('user')) || [{
//     username: "rnico",
//     password: "123456",
//     email: "rnico@gmail.com"
// }]

// console.log(users)

// function logIn() {
//     let usuarioIngresado = users.find(userU => user.username === user.value)

//     if (usuarioIngresado == undefined) {
//         Swal.fire(
//             'Usuario no encontrado',
//             'por favor registrese',
//             'error'
//         )
//     } else if (usuarioIngresado.password !== password.value) {
//         Swal.fire(
//             'Contraseña incorrecta',
//             '',
//             'error'
//         )
//     } else {
//         window.location.href = "index.html"
//     }
// }

// login.onclick = (e) => {
//     e.preventDefault()
//     logIn()
// }

// class NewUser {
//     constructor(username, password, name, lastName, email) {
//         this.username = username,
//         this.password = password,
//         this.name = name,
//         this.lastName = lastName,
//         this.email = email
//     }
// }

// const CrearUsuario = document.querySelector("#CrearUsuario");

// function registrar() {
//     const nuevoUsuario = new NewUser(ImputUsuario.value, ImputClave.value, ImputNombre.value, ImputApellido.value, InputEmail.value)
//     users.push(nuevoUsuario)
//     console.log(nuevoUsuario)
//     console.log(users)
// }

// registerUser.onclick = (e) => {
//     e.preventDefault()
//     const formRegister = document.getElementById("formCrearUsuario")
//     const inputUser = document.getElementById("ImputUsuario")
//     const inputPassword = document.getElementById("ImputClave")
//     const inputName = document.getElementById("ImputNombre")
//     const inputLastName = document.getElementById("ImputApellido")
//     const emailInput = document.getElementById("InputEmail");
// }
//     formRegister.onsubmit = (e) => {
//         e.preventDefault()
//         let mailExiste = users.some((userA) => userA.email === ImputEmail.value)
    
//         let usernameExiste = users.some((userA) => userA.username === inputUsuario.value)
       
//         function nuevoUsuario() {
//             const newUser = new NewUser( InputUsuario.value, ImputClave.value, ImputNombre.value, ImputApellido.value, InputEmail.value,)
//             users.push(newUser)
//             console.log(users)
//             setStorage()
//         }

//         (mailExiste || usernameExiste) ? alert("Usuario ya registrado"): nuevoUsuario()
//     }

//     function setStorage(){
//         localStorage.setItem("user", JSON.stringify(users))
//     }
