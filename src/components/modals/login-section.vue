<template>
    <!-- Modal -->
    <div class="modal fade login-register" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body">
                    <!-- start navs section -->

                    <div class="modal-tab">
                        <ul class="nav nav-pills mb-3 list-con col-lg row" id="pills-tab" role="tablist">
                            <li class="nav-item col-6">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">تسجيل الدخول</a>
                            </li>
                            <li class="nav-item col-6">
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"> إنشاء حساب</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <form action="" accept-charset="UTF-8">
                                <div class="form-group">
                                    <label for="mobile"> <i class="fas fa-phone-alt"></i> رقم الجوال</label>

                                    <div class="row w-100 phone-n">
                                        <input class="form-control mr-sm-2 search-t col-lg" id="mobile" type="number" placeholder="ادخال رقم الجوال" aria-label="Search" v-model="mobile" required>
                                        <span class="flag-img">(+966) <img src="src/assets/img/saudi-arabia.svg" alt=""></span>
                                    </div> </div>
                                <div class="form-group">
                                    <label for="password"> <i class="fas fa-lock"></i> كلمة المرور</label>
                                    <input type="password" class="form-control" id="password" placeholder="ادخل كلمة المرور" v-model="password" required>
                                </div>
                                <a href="" data-toggle="modal" data-target="#exampleModalCenter-1"  aria-label="Close" data-dismiss="modal">هل نسيت كلمة المرور؟</a>
                                <div class="tab-button">
                                    <button type="submit" class="btn" v-on:click.prevent="login">تسجيل الدخول</button>
                                </div>
                            </form>


                        </div>
                        <register_section></register_section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import register_section from "@/components/modals/register_section";
import Jquery from 'jquery';
let $ = Jquery;


export default {
  name: 'login',
  components:{
    register_section
  },
    mounted() {
        console.log('Component mounted.')
        },
    data(){
      return{
          User:[
          ],
          mobile :'',
          password: '',
      }
    },
    created() {
        this.login();
    },
    methods:{

        login( ){
            axios.post('http://18.194.157.202/api/auth/login', {
              'X-localization' : 'ar',
              'mobile': this.mobile,
              'password': this.password,

            }).then(res =>{
                if(res.data['status']['status'] === "success"){
                    this.User = res.data['User'];
                    const token = res.data['User']['access_token'];
                    console.log(token);
                    //sessionStorage.setItem('access_token', token);
                    sessionStorage.setItem('access_token_1', token);
                    $('#exampleModalCenter').modal('hide');
                  /*if (res.data['User']['type'] === '1'){
                    this.$router.push('/my_account');
                  }else if (res.data['User']['type'] === '2'){
                    this.$router.push('/my_account_2');
                  }else {
                    this.$router.push('/');
                  }*/

                    console.log(res.data['status']['status']);
                    console.log(res.data['User']['access_token']);

                }else {
                  //sessionStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
                  console.log('error');
                }

            })
                .catch(e=>{
                  console.log(e);
                });

        }
    }

}
</script>
