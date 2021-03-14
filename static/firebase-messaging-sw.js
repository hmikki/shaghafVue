import firebase from "firebase";
self.importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js')
self.importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js')

var config = {
    databaseURL: 'https://passionplatforms.firebaseio.com/',
    apiKey: "AIzaSyCrtMEBxgNcO0-bqdMFxo5hev35ugBZMhI",
    authDomain: "passionplatforms-9b8aa.firebaseapp.com",
    projectId: "passionplatforms-9b8aa",
    storageBucket: "passionplatforms-9b8aa.appspot.com",
    messagingSenderId: "442836747182",
    appId: "1:442836747182:web:a3b9cecec57fda387fbe3f",
    measurementId: "G-QTRWFG01FD"
}

firebase.initializeApp(config)

const messaging = firebase.messaging();
console.log(messaging);