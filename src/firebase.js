import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyCrtMEBxgNcO0-bqdMFxo5hev35ugBZMhI",
    authDomain: "passionplatforms-9b8aa.firebaseapp.com",
    projectId: "passionplatforms-9b8aa",
    storageBucket: "passionplatforms-9b8aa.appspot.com",
    messagingSenderId: "442836747182",
    appId: "1:442836747182:web:a3b9cecec57fda387fbe3f",
    measurementId: "G-QTRWFG01FD"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
firebase.analytics();