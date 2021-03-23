<template>
  <login_section></login_section>
  <forget_password_section></forget_password_section>
  <verification_code_section></verification_code_section>
    <header>
        <div class="header-1">
            <div class="container">
                <a href=""><i class="fas fa-wifi"></i></a>
                <a href=""><i class="fab fa-youtube"></i></a>
                <a href=""><i class="fab fa-twitter"></i></a>
                <a href=""><i class="fab fa-facebook-f"></i></a>
            </div>
        </div>
      <div v-if="Message != ''" class="notificationDiv" id="notify">
        <a v-on:click.prevent="changePage()">
          <div class="Webnotification" id="notification">
            <div class="bateria">
              <div class="icon"></div>
              <h1>{{ Message.title }}</h1>
              <p>{{Message.body}}</p>
              <a id="closeNotification" v-on:click="close()"><i class="fa fa-times"></i></a>
            </div>
          </div>
        </a>

<!--        <div class="Webnotification red" id="notificationRed">
          <div class="bateria">
            <div class="icon"></div>
          </div>
          <div class="message">
            <span>Telefone com bateria fraca</span>
            <p>
              Carregue a bateria do seu celular para continuar usando o aplicativo</p>
            <a id="closeNotificationRed" data-to="#notificationRed"><i class="fa fa-times"></i></a>
          </div>
        </div>
        <div class="Webnotification green" id="notificationGreen">
          <div class="bateria">
            <div class="icon"></div>
          </div>
          <div class="message">
            <span>Telefone com bateria fraca</span>
            <p>
              Carregue a bateria do seu celular para continuar usando o aplicativo</p>
            <a id="closeNotificationGreen" data-to="#notificationGreen"><i class="fa fa-times"></i></a>
          </div>
        </div>-->
      </div>
        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <div class="row w-100">
                    <div class="col-lg-3 page-logo">
                        <div class="row login100-pic js-tilt" data-tilt v-tilt>
                            <div class="col-lg-5">
                               <a :href="'/'"> <img src="../../assets/img/logo.svg" alt=""> </a>
                            </div>
                            <div class="col-lg-7 padding">
                              <a class="navbar-brand">منصة شغف</a>
                            </div>
                        </div>
                    </div>
                    <form class="form-inline col-lg-5">
                        <div class="row w-100">
                            <input class="form-control search-t col-lg" type="search" placeholder="بحث عن خدمة" aria-label="Search" v-model="q">
                          <button class="btn btn-outline my-2 my-sm-0 search-b col-lg-2" type="submit" v-on:click.prevent="search()"><router-link to="/our_serve"><i class="fas fa-search"></i></router-link></button>
                        </div>
                    </form>

                    <header_guest id="guest" v-if="token === null"></header_guest>
                    <header_login_section id="h-login" v-if="token != null"></header_login_section>
                </div>
                <div class="row  navbar-expand-lg w-100 p-top">
                    <div class="col-lg-2"></div>
                    <nav_section id="h-nav" v-if="token === null"></nav_section>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import header_guest from "@/components/layouts/header_guest";
import nav_section from "@/components/layouts/nav_section";
import header_login_section from "@/components/layouts/header_login_section";
import login_section from "@/components/modals/login-section";
import forget_password_section from "@/components/modals/forget_password_section";
import verification_code_section from "@/components/modals/verification_code_section";
import jquery from 'jquery';
import Pusher from "pusher-js";
let $ = jquery;
export default {
  components: {
    nav_section,
    header_guest,
    header_login_section,
    login_section,
    forget_password_section,
    verification_code_section
  },
  mounted() {
        console.log('Header mounted.');
    },
  data(){
    return{
      token: sessionStorage.getItem('access_token_1'),
      Freelancers:[],
      q: '',
      Message:[],
      type: '',
    }
  },
  created() {
    $(document).ready(function(){
      $('.li-onepage a').click(function(e) {
        e.preventDefault();
        // console.log("Offset: ", $(this).data('to'));
        $('body, html').animate({
          scrollTop: $( $(this).attr('data-to')).offset().top
        }, 800)
      });
    });
    this.pusher();
  },
  methods:{
    search(){
      sessionStorage.setItem('q', this.q);
    },
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
          that.type = data.notification.type;
          console.log(that.type);
          console.log(data.notification);
        });
        let user_id = sessionStorage.getItem('user_id');
        let channel2 = pusher.subscribe('online.' +user_id);
        channel2.bind('SendNotificationEvent', function(data) {
          that.Message=data.notification;
          that.type = data.notification.type;
          console.log(that.type);
          console.log(data.notification);
        });
      }catch (e){
        console.log(e);
      }
    },
    close(){
      $('#notify').hide();
    },
    changePage(){
      if (this.type === '3'){
        if (sessionStorage.getItem('user_type') === '1'){
          $('#notify').hide();
          this.$router.push('/orders');
        }else {
          $('#notify').hide();
          this.$router.push('/orders_2');
        }
      }else {
        $('#notify').hide();
        this.$router.push('/');
      }
    }
  }
}
</script>
