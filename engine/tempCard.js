require('moment/moment.js');
var Chart = require('chart.js');
const loadFirebase = require('./loadFirebase.js');
const {ipcRenderer} = require('electron');
var ctx = document.getElementById('myChart');


ipcRenderer.on("reply", (event, args) => {
    data = args;
    for(var i = 100; i < Object.keys(data).length; i++){
        var element = Object.keys(data)[i];
        var element_Split = element.split("|");
        dateSplit = element_Split[0].split("-");
        timeSplit = element_Split[1].split("-");
        var temp = data[element]['Temp'];
        var date = new Date(dateSplit[0],dateSplit[1],dateSplit[2],timeSplit[0],timeSplit[1],timeSplit[2]);
        var newPush = {
            t: date,
            y: temp,
        }
        myChart.data.datasets[0]['data'].push(newPush);



    }
    myChart.update();
    console.log(myChart.data.datasets[0]['data']);

});


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Hello',
            data: [
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false,
            showLine: true
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series',
                time: {
                    displayFormats: {
                        'millisecond': 'h:mm:ss a',
                        'second': 'h:mm:ss a',
                        'minute': 'h:mm:ss a',
                        'hour': 'h:mm:ss a',
                        'day': 'h:mm:ss a',
                        'week': 'h:mm:ss a',
                        'month': 'h:mm:ss a',
                        'quarter': 'h:mm:ss a',
                        'year': 'h:mm:ss a',
                    }
                }
            }]
        }
    }
});

