var request = require("request");

request({
    uri: "http://192.168.86.49:3000/assistant",
    method: "POST",
    form: {
        user: "ron",
        command: "turn off the ac"
    }
}, function (error, response, body) {
    console.log(error);
});