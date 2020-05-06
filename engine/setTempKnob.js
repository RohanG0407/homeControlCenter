let domEl = document.querySelector('#settempcard');
let domElStyle = getComputedStyle(domEl);
let width = domElStyle.width;
width = width.substring(0,width.length -2 );
let height = domElStyle.height;
height = height.substring(0,height.length -2 );
var knob = pureknob.createKnob(width * .9, height * .9);

// Set properties.
knob.setProperty('angleStart', -0.75 * Math.PI);
knob.setProperty('angleEnd', 0.75 * Math.PI);
knob.setProperty('colorFG', '#ebcb8b');
knob.setProperty('colorBG', "#eceff4");
knob.setProperty('trackWidth', 0.4);
knob.setProperty('valMin', 55);
knob.setProperty('valMax', 85);
knob.setProperty('label', "Set AC Temp");
knob.setProperty('readonly', false);

// Set initial value.
knob.setValue(69);

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
    console.log(value);
};

knob.addListener(listener);

// Create element node.
var node = knob.node();

// Add it to the DOM.
var elem = document.getElementById('settemp');
elem.appendChild(node);
