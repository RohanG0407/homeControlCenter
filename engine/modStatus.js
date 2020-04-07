const firebase = require('firebase/app');
require('firebase/database');
require('./sendRequest.js');

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

function ac_onclick() {

    database.ref('/states/ac/').once('value').then(function(snapshot) {
        var status = snapshot.val();
        if(status['status'] === "off") {
            newRequest("POST", "turn on the ac");
            document.getElementById('ac_icon').innerHTML = '<img src=\"./assets/ac_on.png\" width=\"200\" height=\"200\" alt=\"\" >';
            database.ref("/states/ac/").set(
          {
              status: "on"
          }
      );
        } else {
            newRequest("POST", "turn off the ac");
            document.getElementById('ac_icon').innerHTML = '<img src=\"./assets/ac_off.png\" width=\"200\" height=\"200\" alt=\"\">';
            database.ref("/states/ac/").set(
                {
                    status: "off"
                }
            );
        }

    });

}

function ac_onload(){
    database.ref('/states/ac/').once('value').then(function(snapshot) {
        var status = snapshot.val();
        if(status['status'] === "off") {
            document.getElementById('ac_icon').innerHTML = '<img src=\"./assets/ac_off.png\" width=\"200\" height=\"200\" alt=\"\" >';
        } else {
            document.getElementById('ac_icon').innerHTML = '<img src=\"./assets/ac_on.png\" width=\"200\" height=\"200\" alt=\"\">';
        }
    });
}

