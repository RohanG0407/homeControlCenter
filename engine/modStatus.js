const firebase = require('firebase/app');
require('firebase/database');
require('./sendRequest.js');
var loadF = require('./loadFirebase.js');

if (!firebase.apps.length) {
    firebase.initializeApp(loadF.firebaseConfig);
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
            database.ref("/states/pi/").set(
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

function pi_onload(){
    database.ref('/states/pi/').once('value').then(function(snapshot) {
        var status = snapshot.val();
        if(status['status'] === "off") {
            document.getElementById('pi_icon').innerHTML = '<img src=\"./assets/pioff.png\" width=\"200\" height=\"200\" alt=\"\" >';
        } else {
            document.getElementById('pi_icon').innerHTML = '<img src=\"./assets/pion.png\" width=\"200\" height=\"200\" alt=\"\">';
        }
    });
}

function pi_onclick(){
    alert("Not setup yet lad");
}

