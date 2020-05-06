var loadF = require('./loadFirebase.js');

let domEl = document.querySelector('#settempcard');
let domElStyle = getComputedStyle(domEl);
let width = domElStyle.width;
width = width.substring(0,width.length -2 );
let height = domElStyle.height;
height = height.substring(0,height.length -2 );
const sKnob = pureknob.createKnob(width * .9, height * .9);

// Set properties.
sKnob.setProperty('angleStart', -0.75 * Math.PI);
sKnob.setProperty('angleEnd', 0.75 * Math.PI);
sKnob.setProperty('colorFG', '#ebcb8b');
sKnob.setProperty('colorBG', "#eceff4");
sKnob.setProperty('trackWidth', 0.4);
sKnob.setProperty('valMin', 55);
sKnob.setProperty('valMax', 85);
sKnob.setProperty('label', "Set AC Temp");
sKnob.setProperty('readonly', false);

database.ref('/states/setTemp/').once('value').then(function(snapshot) {
    sKnob.setValue(snapshot.val());
});
// Set initial value.


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
    loadF.writeData('/states/setTemp/', value);
    console.log(value);
};

sKnob.addListener(listener);

// Create element node.
var node = sKnob.node();

// Add it to the DOM.
var elem = document.getElementById('settemp');
elem.appendChild(node);
