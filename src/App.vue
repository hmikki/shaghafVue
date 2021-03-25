<template>
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
@import "assets/css/sty.css";
@import "assets/css/responsive.css";
@import "assets/css/slick-theme.css";
@import "assets/css/slick.css";
</style>

<script>
import header_section from "@/components/layouts/header_section";
import footer_section from "@/components/layouts/footer_section";
import Pusher from "pusher-js";


export default {
  components: {
    header_section,
    footer_section
  },
  data(){
    return{
      Message:[],
    }
  },
  updated() {
  },
  created() {
    this.pusher();
  },
  methods:{
    pusher(){
      try {
        Pusher.logToConsole = true;
        let pusher = new Pusher('da99af9260d89f306342', {
          cluster: 'ap1'
        });
        let that = this;
        let channel = pusher.subscribe('online');
        channel.bind('SendGlobalNotificationEvent', function(data) {
          that.Message = data.notification;
        });
        let user_id = sessionStorage.getItem('user_id');
        let channel2 = pusher.subscribe('online.' +user_id);
        channel2.bind('SendNotificationEvent', function(data) {
          that.Message=data.notification;
        });
      }catch (e){
        console.log();
      }
    }
  }
}

</script>
