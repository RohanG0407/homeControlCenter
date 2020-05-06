var loadF = require('./loadFirebase.js');

let domCurrent = document.querySelector('#currenttempcard');
let domCurrentStyle = getComputedStyle(domCurrent);
width = domCurrentStyle.width;
width = width.substring(0,width.length -2 );
height = domCurrentStyle.height;
height = height.substring(0,height.length -2 );

let cKnob = pureknob.createKnob(width * .9, height * .9);



// Set properties.
cKnob.setProperty('angleStart', -0.75 * Math.PI);
cKnob.setProperty('angleEnd', 0.75 * Math.PI);
cKnob.setProperty('colorFG', '#b48ead');
cKnob.setProperty('colorBG', "#eceff4");
cKnob.setProperty('trackWidth', 0.4);
cKnob.setProperty('valMin', 55);
cKnob.setProperty('valMax', 85);
cKnob.setProperty('label', "Current Temp");
cKnob.setProperty('readonly', true);

// Set initial value.
database.ref('/states/currentTemp/').once('value').then(function(snapshot) {
    console.log(snapshot.val());
    cKnob.setValue(snapshot.val());
});


/*
 * Event listener.
 *
 * Parameter 'knob' is the knob object which was
 * actuated. Allows you to associate data with
 * it to discern which of your knobs was actuated.
 *
 * Parameter 'value' is the value which was set
 * by the user.
 */
var listener = function(knob, value) {

};

cKnob.addListener(listener);

// Create element node.
var node = cKnob.node();

// Add it to the DOM.
var elem = document.getElementById('currenttemp');
elem.appendChild(node);
