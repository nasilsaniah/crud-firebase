// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8BvA9e34O80Oab_UMn873-f3ENaRAJVk",
    authDomain:  "primerproyecto-9206f.firebaseapp.com",
    projectId: "primerproyecto-9206f",
});

var db = firebase.firestore();

//Agregar documentos de manera dinamica
//las variables nombre y area son las que se reconoce del id en index.html
//
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var aldea = document.getElementById('area').value;

    db.collection("users").add({
        name: nombre,
        area: aldea,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            //reiniciar los inputs. Una vez que se guarda, lo limpie.
            document.getElementById('nombre').value = '';
            document.getElementById('area').value = ''
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
            <td>${doc.data().area}</td>
            <td><button class="btn btn-danger onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing documnent: ", error);
    });  
}

