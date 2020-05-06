self.addEventListener('message' ,(ev) => {
    console.log("Graph Worker began with message: ", ev.data);
    let args = ev.data;

    //function that loops through entire database and formats objects appropriatly before sending to chart display

    let arr = [];
    for(var i = 0; i < Object.keys(args).length; i++) {
        var element = Object.keys(args)[i];
        var element_Split = element.split("|");
        let dateSplit = element_Split[0].split("-");
        let timeSplit = element_Split[1].split("-");
        var temp = args[element]['Temp'];
        var temp  = (temp * (9/5)) + 32;
        var date = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2], timeSplit[0], timeSplit[1], timeSplit[2]);
        var newPush = {
            t: date,
            y: temp,
        };
        arr.push(newPush);
    }
    self.postMessage(arr);

});