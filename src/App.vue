<template>
  <push-notification
      ref="pushNotification"
      :currentToken="userToken"
      @update-token="onUpdateToken"
      @new-message="onNewMessage" />
  <header_section></header_section>
  <router-view/>
  <footer_section></footer_section>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<style scoped>

@import "assets/css/normlaize.css";
@import "assets/css/bootstrap.min.css";
@import "assets/css/all.min.css";

@import "https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css";
@import "https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/css/intlTelInput.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css";
@import "assets/css/owl.theme.default.css";
@import "assets/css/style.css";
@import "assets/css/responsive.css";
@import "assets/css/slick-theme.css";
@import "assets/css/slick.css";
@import "https://unpkg.com/vue3-google-map";

</style>

<script>
import header_section from "@/components/layouts/header_section";
import footer_section from "@/components/layouts/footer_section";
import axios from "axios";
import PushNotification from '@/components/PushNotification';
import api from '@/api/api';


export default {
  components: {
    header_section,
    footer_section,
    PushNotification
  },
  data(){
    return{
      email : sessionStorage.getItem('email'),
      password : sessionStorage.getItem('password'),
      device_token: '',
      device_type :'Server',
    }
  },
  created() {
    this.getNotifications();
  },
  methods:{
    getNotifications() {
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/notifications',
          {
            headers:{
              'Authorization' :'Bearer ' +token,
              'X-localization' : 'ar'
            },
            params:{
              device_token: 'BCUvW2TRd4xbzM7D7ncJO8r5mJNoOtnSat9Dtso9IQRXhNALvFqSFBxgYTAzuToxuVRUpgVLym0yXKrOgwh3Nt4'
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          console.log(res.data['Notifications']);
        }else {
          console.log(res.data['status']['status']);
        }
      })
      .catch(e=>{
        console.log(e);
      })
    },
    refresh(){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/auth/refresh',
          {
            device_token: this.device_token,
            device_type: this.device_type,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' + token,
              'X-localization' : 'ar'
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          const device_token = sessionStorage.getItem('device_token');
          console.log(device_token);
        }else {
          console.log(res.data['status']['message']);
        }
      })
    },
    enableNotifications () {
      this.$refs.pushNotification.askForPermission()
    },
    onUpdateToken (newToken) {
      this.device_token = newToken
      // send token to the server
      api.update_token(this.userProfile, this.device_token)
    },
    onNewMessage (message) {
      var snackbarContainer = document.querySelector('#snackbar-message')
      var data = {
        message: message.notification.title + ': ' + message.notification.body,
        timeout: 10000,
        actionText: 'OK'
      }
      snackbarContainer.MaterialSnackbar.showSnackbar(data)
    }
  }
}

</script>
