var Chart = require('chart.js');
require('./loadFirebase.js');
const {ipcRenderer} = require('electron');
var ctx = document.getElementById('myChart');
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontColor = "#b48ead";
var arguments;
const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`);

//gets data from loadFirebase.js
ipcRenderer.on("reply", (event, args) => {
    arguments = args;
    console.log(arguments);
    rawArray = sortArr(arguments);
    //updateArray();

    rawArray.sort(function(a, b) {
        var a = new Date(a.t);
        var b = new Date(b.t);
        return a>b ? -1 : a<b ? 1 : 0;
    });
    myChart.data.datasets[0]['data'] = normalizeData(rawArray);
    myChart.update();
});

var updateArray = async() => {
    var rawArray = await sortArr(arguments);
    rawArray.sort(function(a, b) {
        var a = new Date(a.t);
        var b = new Date(b.t);
        return a>b ? -1 : a<b ? 1 : 0;
    });
    myChart.data.datasets[0]['data'] = normalizeData(rawArray);
    myChart.update();
};




var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [
            ],
            borderWidth: 2,
            fill: false,
            showLine: true,
            pointBorderWidth: 2,
            pointBorderColor: '#d8dee9',
            borderColor: '#b48ead',

        }]
    },
    options: {
        title: {
            display: true,
            text: "Temperature",
        },
        scales: {
            xAxes: [{
                type: 'time',
                ticks: {
                  maxTicksLimit: 23,
                },
                distribution: 'series',
                time: {
                    displayFormats: {
                        'millisecond': 'h:mm a',
                        'second': 'h:mm a',
                        'minute': 'h:mm a',
                        'hour': 'h:mm a',
                        'day': 'h:mm a',
                        'week': 'h:mm a',
                        'month': 'h:mm a',
                        'quarter': 'h:mm a',
                        'year': 'h:mm a',
                    },
                }
            }],
        },

        animation: {
            duration: 2000,
            easing: "easeInExpo",
        }
    }
});

function normalizeData(sortedrawData) {
    let normalizedArray = [{}];
    let firstElementofHour = false;
    let hourArray = [];
    let hourTemps = 0;
    let hourVals = 0;
    for(var i = sortedrawData.length - 1; i >= 0; i--){
        date = sortedrawData[i]['t'];
        //If its the first one of the hour
        if(!firstElementofHour) {
            firstElementofHour = true;
            hourTemps = sortedrawData[i]['y'];
            hourVals = 1;
            hourArray.push(sortedrawData[i]);
            // If its not the first element of the hour
        } else {
            if(sortedrawData[i]['t'].getHours() === hourArray[0]['t'].getHours()) {
                hourTemps += sortedrawData[i]['y'];
                hourVals += 1;
                hourArray.push(sortedrawData[i]);
                // If its a new hour's element
            } else {
                let averageTemp = hourTemps/hourVals;
                averageTemp = Math.floor(averageTemp * 100)/ 100;
                let hourObject = {
                    t: hourArray[0]['t'],
                    y: averageTemp
                };
                normalizedArray.push(hourObject);
                firstElementofHour = false;
                hourArray = [];
                i++;
            }
        }
    }

    return normalizedArray;
}

const xd = () => {
    return Promise.resolve().then(v => {
        let i = 0;
        while (i < 1000000000) {
            i++;
        }
        return 'done';
    })
};
function sortArr(args) {
            let arr = [];
            for(var i = 0; i < Object.keys(args).length; i++) {
                var element = Object.keys(args)[i];
                var element_Split = element.split("|");
                let dateSplit = element_Split[0].split("-");
                let timeSplit = element_Split[1].split("-");
                var temp = data[element]['Temp'];
                var temp  = (temp * (9/5)) + 32;
                var date = new Date(dateSplit[0], dateSplit[1]-1, dateSplit[2], timeSplit[0], timeSplit[1], timeSplit[2]);
                var newPush = {
                    t: date,
                    y: temp,
                };
                arr.push(newPush);
            }
            return arr;
}


