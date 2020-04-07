var request = require('request');

function newRequest(method, command) {
request({
    uri: "http://192.168.86.49:3000/assistant",
    method: method,
    form: {
        user: "ron",
        command: command
    }
}, function (error, response, body) {
    console.log(error);
});

}