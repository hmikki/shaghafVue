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
                            <input class="form-control search-t col-lg" type="search" placeholder="بحث عن خدمة" aria-label="Search" v-model="name">
                            <button class="btn btn-outline my-2 my-sm-0 search-b col-lg-2" type="submit" v-on:click.prevent="search()"><i class="fas fa-search"></i></button>
                        </div>
                    </form>

                    <header_guest id="guest" v-show="token === null"></header_guest>
                    <header_login_section id="h-login" v-show="token != null"></header_login_section>
                </div>
                <div class="row  navbar-expand-lg w-100 p-top">
                    <div class="col-lg-2"></div>
                    <nav_section id="h-nav" v-show="token === null"></nav_section>
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
import axios from "axios";
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
      name: '',
    }
  },
  computed() {
  },
  methods:{
    search(){
      try {
        axios.get('http://18.194.157.202/api/home/get_freelancers', {
          headers: {
            'X-localization': 'ar',
          },
          params: {}
        },)
            .then(res => {
              if (res.data['status']['status'] === "success") {
                this.Freelancers = res.data['Freelancers'].filter(this.name);
                console.log(res.data['status']['status']);
                console.log(res.data['Freelancers']);
              } else {
                console.log(res.data['status']['status']);
              }
            })
            .catch(e => {
              console.log(e);
            })
      }catch (e){
        console.log(e);
      }
    }
  }
}
</script>
