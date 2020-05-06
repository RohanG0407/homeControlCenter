var Chart = require('chart.js');
var loadF = require('./loadFirebase.js');
const {ipcRenderer} = require('electron');
var ctx = document.getElementById('myChart');
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontColor = "#b48ead";
let worker;

// Used for timing how such certain methods take
const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`);

//function to initialize the worker for formatting firebase DHT11 data (Takes about 1500 ms)
function initWorker() {
    worker = new Worker('graphWorker.js');
    worker.addEventListener('message', workerMessaged);
    worker.addEventListener('error', workerError);
}

//function to handle the web worker sending back the formatted data
async function workerMessaged(ev) {
    updateArray(ev.data);
    log("chart updated");
}

//function to handle the web worker sendign back an error
function workerError(ev) {
    let v = ev.data;
    console.log(v);
}


// initializes the graphWorker.js
initWorker();

//function to take start the updateChart process

async function updateChart () {
    log("calling");
    //aquires a snapshot of the realtime database
    await loadF.takeSnap();
    log('data recieved');
    //sends this data to be analyzed by the web worker grapHWorker.js in the background
    worker.postMessage(loadF.data);
}

//updates Chart
updateChart();


// chart properties
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

// formats data properly so it can be displayed on graph
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

// function that takes in data from webWorker and adds it to the chart a
var updateArray = async(rawArray) => {
    //sorts the dataset in chronological order
    rawArray.sort(function(a, b) {
        var a = new Date(a.t);
        var b = new Date(b.t);
        return a>b ? -1 : a<b ? 1 : 0;
    });
    myChart.data.datasets[0]['data'] = normalizeData(rawArray);
    myChart.update();
};

