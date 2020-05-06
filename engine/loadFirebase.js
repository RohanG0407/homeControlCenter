const firebase = require('firebase/app');
const {ipcRenderer} = require('electron');
require('firebase/database');
data = 0;



module.exports.firebaseConfig = {
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
    firebase.initializeApp(module.exports.firebaseConfig);
}

var database = firebase.database();

//take 1 picture of the entire database -- no listener for updates
module.exports.takeSnap = async function() {
    await database.ref('/sensors/temp/').once('value').then(function(snapshot) {
         module.exports.data = snapshot.val();
    });

};




function writeData(path, object) {
    database.ref(path).patch(object);
}




