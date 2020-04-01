from firebase import firebase
import datetime
from time import sleep
import dhtSensor

url = "https://home-6b0c0.firebaseio.com/"

firebase = firebase.FirebaseApplication(url, None)
date = datetime.datetime.now()

prevTemp = 0.0
ctdTemp = 20.0
readnumber = 0

def update(readnumber):
    ##temp = sensor input data
    ##data varies by 3.6 degress fahrenheit
    ##ctdTemp = temp
    ctdDate = [date.year, date.month, date.day]
    ctdTime = [date.hour, date.minute, date.second]
    data = {'Date': "%s-%s-%s" %(str(ctdDate[0]),str(ctdDate[1]),str(ctdDate[2])),
            'Time': "%s-%s-%s" %(str(ctdTime[0]),str(ctdTime[1]),str(ctdTime[2])),
            'Temp': ctdTemp}
    firebase.patch('/sensors/temp/%s/' %(str(readnumber)), data)

while(True):
    if(abs(ctdTemp - prevTemp) >= .5):
        update(readnumber)
        prevTemp = ctdTemp
        ctdTemp+= 1
        readnumber+=1
    sleep(5)