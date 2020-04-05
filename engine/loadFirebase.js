const firebase = require('firebase/app');
const {ipcRenderer} = require('electron');
require('firebase/database');



var firebaseConfig = {
    apiKey: "AIzaSyBighCpEuN8z1agFEtznM1BqEYQnk8glmU",
    authDomain: "home-6b0c0.firebaseapp.com",
    databaseURL: "https://home-6b0c0.firebaseio.com",
    projectId: "home-6b0c0",
    storageBucket: "home-6b0c0.appspot.com",
    messagingSenderId: "633543868323",
    appId: "1:633543868323:web:31309f8a05a7ccb6f96416",
    measurementId: "G-LS7488JT2C"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var database = firebase.database();


function takeSnapshot() {
    database.ref('/sensors/temp/').once('value').then(function(snapshot) {
        data = snapshot.val();
        ipcRenderer.send("new-snapshot", data);
    });

}

takeSnapshot()



function writeData(userId, name, email, password) {
    database.ref('users/' + userId).set({
        username: name,
        email: email,
        password: password
    });
}


