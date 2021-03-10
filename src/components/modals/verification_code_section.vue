<template>
    <div class="modal fade" id="exampleModalCenter-2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-header">
                    <p>تأكيد رقم الهاتف</p>
                </div>
                <div class="modal-body secound-m">
                    <div class="model-img login100-pic js-tilt" data-tilt><img src="../../assets/img/verification-code.svg" alt=""></div>
                    <span class="vc-m">يرجى إدخال الرمز المرسل الى رقم الجوال {{ User.mobile }}</span>
                    <div class="v-code-main">
                        <div class="vcode" id="vcode">
                            <input type="phone" class="vcode-input" id="vcode1" v-model="code">
                        </div>
                    </div>
                    <div class="tab-button">
                        <button type="submit" class="btn" v-on:click.prevent="verification()">تأكيد</button>
                    </div>
                    <div class="tab-a"> <span> لم يتم ارسال الكود <a href="" v-on:click="resendVerification()"> اعادة الارسال </a></span></div>
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
        console.log('Verification mounted.')
    },
    data(){
        return{
            User:[],
            mobile: '',
            type: 2,
            code: '',
        }
    },
    created() {
        this.verification();
    },
    methods:{
        verification(){
          const token = sessionStorage.getItem('access_token_1');
            axios.post('http://18.194.157.202/api/auth/verify',
                {
                  code: this.code,
                  type: this.type,
                },
                {
                  headers:{
                    'Authorization' : 'Bearer ' + token,
                    'X-localization': 'ar'
                  }
                })
                .then(res=>{
                  if (res.data['status']['status'] === "success"){
                    this.User = res.data['status']['status'];
                    $('#exampleModalCenter-2').modal('hide');
                    console.log(res.data['status']['status']);
                  }else {
                    console.log(res.data['status']['message']);
                  }

            })
          .catch(e=>{
            console.log(e);
          })
        },
        resendVerification(){
          const token = sessionStorage.getItem('access_token_1');
            axios.get('http://18.194.157.202/api/auth/resend_verify',{
                headers:{
                    'Authorization' : 'Bearer ' +token,
                    'X-localization': 'ar'
                },
                params:{
                    type: this.type
                }
            })
                .then(res=>{
                    if (res.data['status']['status'] === "success"){
                      this.User = res.data['User'];
                      console.log(res.data['status']['status']);
                    }else {
                      console.log(res.data['status']['status']);
                    }
                })
        }
    }
}
</script>
