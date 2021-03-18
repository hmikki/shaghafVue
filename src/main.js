
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import FileUpload from 'v-file-upload'
import VueTilt from 'vue-tilt.js'
import Bootstrap from 'bootstrap'
import jquery from 'jquery'
import vmApp from './App.vue'
import '../src/assets/js/head.js';
import * as carousel from 'vue3-carousel';

//import Pusher from "pusher-js";

/******* pusher ************/
/*Pusher.logToConsole = true;
let pusher = new Pusher('da99af9260d89f306342', {
    cluster: 'ap1'
});
//let that = this;
let channel = pusher.subscribe('online');
 channel.bind('CreateMessageEvent', function(data) {
console.log(data.message);
});
let user_id = sessionStorage.getItem('user_id');
let channel2 = pusher.subscribe('online.' +user_id);
channel2.bind('CreateMessageEvent', function(data) {
    console.log(data.message);
});*/
/****************************************/



createApp(App).use(vmApp).use(router).use(store).use(VueTilt).use(Bootstrap).use(jquery).use(carousel).use(FileUpload).mount('#app');