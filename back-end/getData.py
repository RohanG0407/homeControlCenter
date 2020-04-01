from firebase import firebase

url = "https://home-6b0c0.firebaseio.com/"

fb = firebase.FirebaseApplication(url, None)

result = fb.get('/sensors/temp/0', None)

for keyID in result:
    print(result[keyID]['Temp'])