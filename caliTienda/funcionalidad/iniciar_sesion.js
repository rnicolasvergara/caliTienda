let usuarios = []

const iniciar = document.getElementById("IniciarSesion")
iniciar.addEventListener ("click", respuestaClick)
function respuestaClick(){
    prompt("Ingresa tu usuario");
    const pregunta = prompt("Usuario Inexistente, ¿Deseas crear uno?");
    if (pregunta == "si"){
        let usuario = prompt("Ingresa un nombre de usuario")
        let nombre = prompt("Ingresa tu nombre")
        let apellido = prompt("Ingresa tu apellido")
        let mail = prompt ("Ingresa tu mail")
        alert("¡Creaste tu usuario exitosamente!")
    } else if (pregunta == "no"){
       alert("Hasta luego, te esperamos pronto")
        }

        usuarios.push({usuario, nombre, apellido, mail})
        console.log(usuarios)
}

const guardarLocal = (usuario, nombre, apellido, mail) => { localStorage.setItem(usuario, nombre, apellido, mail) };

for (const usuario of usuarios) {
    guardarLocal(usuario.id, JSON.stringify(usuario));
}

const crear = document.getElementById("CrearCuenta")
crear.addEventListener ("click", respuestaClick2)
function respuestaClick2(){
const pregunta2 = prompt("¿Deseas crear un usuario?");
    if (pregunta2 == "si"){
        let usuario2 = prompt("Ingresa un nombre de usuario")
        let nombre2 = prompt("Ingresa tu nombre")
        let apellido2 = prompt("Ingresa tu apellido")
        let mail2 = prompt ("Ingresa tu mail")
        alert("¡Creaste tu usuario exitosamente!")
    } else if (pregunta2 == "no"){
       alert("Hasta luego, te esperamos pronto")
        }

        usuarios.push({usuario, nombre, apellido, mail})
        console.log(usuarios)}