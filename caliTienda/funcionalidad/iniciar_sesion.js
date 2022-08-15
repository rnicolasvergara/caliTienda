const user = document.getElementById("usuario")
const password = document.getElementById("clave")
const name = document.getElementById("nombre")
const lastName = document.getElementById("apellido")
const email = document.getElementById("mail")
const registerUser = document.getElementById("CrearCuenta")

class NewUser {
    constructor(username, password, name, lastName, email) {
        this.username = username,
        this.password = password,
        this.name = name,
        this.lastName = lastName,
        this.email = email
    }
}

const CrearUsuario = document.querySelector("#formCrearUsuario");

function registrar() {
    const nuevoUsuario = new NewUser(inputUser.value, inputPassword.value, inputName.value, inputLastName.value, inputEmail.value)
    users.push(nuevoUsuario)
    console.log(nuevoUsuario)
    console.log(users)
}

registerUser.onclick = (e) => {
    e.preventDefault()
    const registerUser = document.getElementById("aceptar")
    const formRegister = document.getElementById("formCrearUsuario")
    const inputUser = document.getElementById("inputUser")
    const inputPassword = document.getElementById("inputPassword")
    const inputName = document.getElementById("inputName")
    const inputLastName = document.getElementById("inputLastname")
    const emailInput = document.getElementById("inputEmail");
}
    formRegister.onsubmit = (e) => {
        e.preventDefault()
        let mailExiste = users.some((userA) => userA.email === imputEmail.value)
    
        let usernameExiste = users.some((userA) => userA.username === inputUser.value)
       
        function nuevoUsuario() {
            const newUser = new NewUser( inputUser.value, inputPassword.value, imputName.value, imputLastName.value, inputEmail.value,)
            users.push(newUser)
            console.log(users)
            setStorage()
        }

        (mailExiste || usernameExiste) ? alert("Usuario ya registrado"): nuevoUsuario()
    }

