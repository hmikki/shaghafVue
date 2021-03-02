import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


import '../src/assets/js/bootstrap.bundle.min.js';
import '../src/assets/js/bootstrap.min.js';
import '../src/assets/js/fontawesome.min.js';
import '../src/assets/js/head.js';
import '../src/assets/js/jquery-2.1.4.min.js';
//import '../src/assets/js/owl.carousel.js'
//import '../src/assets/js/tilt.jquery.min.js';
//import '../src/assets/js/v4-shims.min.js';
import '../src/assets/js/main.js';

createApp(App).use(router).use(store).mount('#app');

