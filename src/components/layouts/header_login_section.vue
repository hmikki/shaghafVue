<template>
                    <div class="col-lg-4 pl-0 logo-h">
                        <div class="row">
                            <div class="col-2 my-cart">
                            </div>
                            <div class="col-lg-10 l-r">
                                <div class="row">
                                    <div class="nav-item dropdown col-lg-12 pr-0">
                                        <a class="nav-link dropdown-toggle user-name" href="#" id="MyAccount" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img :src="User.avatar" alt="">
                                            <i class="fas fa-chevron-down"></i><span>{{User.name}}</span>
                                        </a>
                                        <div class="dropdown-menu" id="MyAccountDropdown" aria-labelledby="MyAccount">
                                            <router-link to="/serve_user"><a class="dropdown-item" href="">حسابي</a></router-link>
                                            <div class="dropdown-divider"></div>
                                            <router-link to="/add_service"><a class="dropdown-item">خدماتي</a></router-link>
                                            <div class="dropdown-divider"></div>
                                            <router-link to="/financial"> <a class="dropdown-item">عملياتي المالية</a> </router-link>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" v-on:click.prevent="changeRoute()" href="">اعدادات الحساب</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="" v-on:click.prevent="logout()">تسجيل خروج</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
</template>
<script>
import axios from "axios";
import jquery from 'jquery';
let $ = jquery;

export default {
    mounted() {
        console.log('Component mounted.')
    },
  components:{
  },
    data(){
        return {
            User:[]
        }
    },
    created() {
        this.userDetails();
    },
    methods:{

        userDetails(){
          const token = sessionStorage.getItem('access_token_1');
          console.log('Bearer '+ token);
            axios.get('http://18.194.157.202/api/auth/me',{
              headers:{
                'Authorization': 'Bearer '+token
              }
            })
            .then(res=>{
              if(res.data['status']['status'] === "success"){
                this.User = res.data['User'];
                console.log(token);
                console.log(res.data['User']);
                axios.post('http://18.194.157.202/api/auth/refresh',
                    {
                      'device_token' : ''+sessionStorage.getItem('device_token'),
                      'device_type' : 'web',
                    },
                    {
                      headers:{
                        'Authorization': 'Bearer '+token,
                        'X-localization' : 'ar',
                      }
                    });
              }else {
               console.log(res.data['status']['status'])
              }
            })
        },
        logout(){
            const token =sessionStorage.getItem('access_token_1');
            axios.post('http://18.194.157.202/api/auth/logout', {}, {
              headers:{
                'Authorization': 'Bearer ' + token
              }
            })
            .then(res=>{
              if(res.data['status']['status'] === "success"){
                sessionStorage.removeItem('access_token_1');
                this.$router.push('/');
                $('#MyAccountDropdown').hide();
                console.log(res.data['status']['status']);
              }else {
                console.log(res.data['status']['message']);
              }
          })
        },

      changeRoute(){
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/auth/me',{
          headers:{
            'Authorization': 'Bearer '+token
          }
        })
        .then(res=>{
          if (res.data['status']['status'] === "success"){
            if (res.data['User']['type'] === '1'){
              this.$router.push('/my_account');
            }else if (res.data['User']['type'] === '2'){
              this.$router.push('/my_account_2');
            }
            else {
              this.$router.push('/');
            }
          }else {
            console.log(res.data['status']['status']);
          }
        })
      }
    }
}
</script>
