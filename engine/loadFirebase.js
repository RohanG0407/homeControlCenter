const firebase = require('firebase/app');
const {ipcRenderer} = require('electron');
require('firebase/database');
data = 0;

//firebase security configs REQUIRED

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

//checks if firebase is already initialized
if (!firebase.apps.length) {
    //if already not initliazed, initializes firebase
    firebase.initializeApp(module.exports.firebaseConfig);
}

//reference of the realtime database
var database = firebase.database();

//take 1 picture of the entire database -- no listener for updates
module.exports.takeSnap = async function() {
    await database.ref('/sensors/temp/').once('value').then(function(snapshot) {
         module.exports.data = snapshot.val();
    });

};



//used to write data to certain database path given the object
function writeData(path, object) {
    database.ref(path).patch(object);
}




