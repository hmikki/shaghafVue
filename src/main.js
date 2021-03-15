
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
import vmApp from './App.vue'

//import '../src/assets/js/bootstrap.bundle.min.js';
//import '../src/assets/js/bootstrap.min.js';
//import '../src/assets/js/fontawesome.min.js';
import '../src/assets/js/head.js';
//import '../src/assets/js/jquery-2.1.4.min.js';
//import '../src/assets/js/owl.carousel.js'
//import '../src/assets/js/tilt.jquery.min.js';
//import '../src/assets/js/v4-shims.min.js';
import * as carousel from 'vue3-carousel';


createApp(App).use(vmApp).use(router).use(store).use(VueTilt).use(Bootstrap).use(jquery).use(carousel).use(FileUpload).mount('#app');