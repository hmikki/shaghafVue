
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import FileUpload from 'v-file-upload'
import VueTilt from 'vue-tilt.js'
import Bootstrap from 'bootstrap'
import jquery from 'jquery'
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"
import "firebase/messaging"

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

//import '../src/assets/js/bootstrap.bundle.min.js';
//import '../src/assets/js/bootstrap.min.js';
//import '../src/assets/js/fontawesome.min.js';
import '../src/assets/js/head.js';
//import '../src/assets/js/jquery-2.1.4.min.js';
//import '../src/assets/js/owl.carousel.js'
//import '../src/assets/js/tilt.jquery.min.js';
//import '../src/assets/js/v4-shims.min.js';
import './assets/js/mains.js';
import './assets/js/slick';
import '../public/firebase-messaging-sw.js';
import firebase from "firebase";

function saveMessagingDeviceToken(){
    firebase.messaging().getToken().then(function(currentToken) {
        if (currentToken) {
            console.log('Got FCM device token:', currentToken);
            // Saving the Device Token to the datastore.
            firebase.firestore().collection('fcmTokens').doc(currentToken)
                .set({uid: firebase.auth().currentUser.uid});
        } else {
            // Need to request permissions to show notifications.
            requestNotificationsPermissions();
        }
    }).catch(function(error){
        console.error('Unable to get messaging token.', error);
    });
}
function requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(function() {
        // Notification permission granted.
        saveMessagingDeviceToken();
    }).catch(function(error) {
        console.error('Unable to get permission to notify.', error);
    });
}

createApp(App).use(router).use(store).use(VueTilt).use(saveMessagingDeviceToken).use(Bootstrap).use(jquery).use(VueSlickCarousel).use(FileUpload).mount('#app');