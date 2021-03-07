
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
import {messaging} from '../public/firebase-messaging-sw.js';


messaging.getToken({ vapidKey: 'BCUvW2TRd4xbzM7D7ncJO8r5mJNoOtnSat9Dtso9IQRXhNALvFqSFBxgYTAzuToxuVRUpgVLym0yXKrOgwh3Nt4'})
    .then((currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            sessionStorage.setItem('device_token', currentToken)
            console.log(currentToken);
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});

createApp(App).use(router).use(store).use(VueTilt).use(Bootstrap).use(jquery).use(VueSlickCarousel).use(FileUpload).mount('#app');