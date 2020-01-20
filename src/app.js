// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8BvA9e34O80Oab_UMn873-f3ENaRAJVk",
    authDomain: "primerproyecto-9206f.firebaseapp.com",
    projectId: "primerproyecto-9206f"
});

var db = firebase.firestore();

//Agregar documentos de manera dinamica
//las variables nombre y carrera son las que se reconoce del id en index.html
//Las variables que se encuentran en db.collection name y career, son los campos de la base de datos de firestore.

//funcion guardar, cuando se hace clic en guardar() se ejecuta el sgt codigo
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var carrera = document.getElementById('carrera').value;

    db.collection("users").add({
        name: nombre,
        career: carrera,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            //reiniciar los inputs. Una vez que se guarda, lo limpie.
            document.getElementById('nombre').value = '';
            document.getElementById('carrera').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//leer datos
var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {
    //tabla para limpiar
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
        tabla.innerHTML +=
            `
        <tr>
        <th scope="row">${doc.id}</th>
            <td>${doc.data().name}</td>
            <td>${doc.data().career}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().career}')">Editar</button></td>
        </tr>
        `
    });
});

//borrar documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing documnent: ", error);
    });
}

//editar documentos
//se le pasa el id de cada documento para que le reconozca
//variables id,nombre,carrera donde se almacenara el id,name, carrer

function editar(id,nombre,carrera){
//pasar los id del html de cada input los que estan en ' '
    document.getElementById('nombre').value = nombre;
    document.getElementById('carrera').value = carrera;
    //cambiar el boton guardar por editar
    var boton = document.getElementById('boton');
    boton.innerHTML ='Editar';
    //despues de hacer click en editar se ejecuta ls sgt funcion
    
    boton.onclick = function(){
        var nombre = document.getElementById('nombre').value;
        var carrera = document.getElementById('carrera').value;
        
        var actualizar = db.collection("users").doc(id);
        
        return actualizar.update({
            name: nombre,
            career: carrera,
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML ='Guardar';
                document.getElementById('nombre').value = '';
            document.getElementById('carrera').value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
    }

