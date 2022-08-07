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
        console.log(usuarios)
}


const productos = [{ id: 1, producto: "Arroz", precio: 125 },
 { id: 2, producto: "Fideo", precio: 70 },
 { id: 3, producto: "Pan" , precio: 50},
 { id: 4, producto: "Flan" , precio: 100}];
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

for (const producto of productos) {
    guardarLocal(producto.id, JSON.stringify(producto));
}







