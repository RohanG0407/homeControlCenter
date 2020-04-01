import requests
import json

urlPost = "http://192.168.0.70:3000/assistant"

data = {
    "command": "turn the ac on",
    "user": "ronnie"
}


def runCommand(command):
    data['command'] = command
    r = requests.post(urlPost, json=data)
    print(r.text)

##runCommand("lights on")
