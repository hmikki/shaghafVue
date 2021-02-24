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
                    <div class="model-img login100-pic js-tilt" data-tilt><img src="assets/img/verification-code.svg" alt=""></div>
                    <span class="vc-m">يرجى إدخال الرمز المرسل الى رقم الجوال {{ User.mobile }}</span>
                    <div class="v-code-main">
                        <div class="vcode" id="vcode">
                            <input type="phone" class="vcode-input" maxlength="1" id="vcode1" v-model="code">
                            <input type="phone" class="vcode-input" maxlength="1" v-model="code">
                            <input type="phone" class="vcode-input" maxlength="1" v-model="code">
                            <input type="phone" class="vcode-input" maxlength="1" v-model="code">
                        </div>
                    </div>
                    <div class="tab-button">
                        <button type="submit" class="btn">تأكيد</button>
                    </div>
                    <div class="tab-a"> <span> لم يتم ارسال الكود <a href="" v-on:click="resendVerification()"> اعادة الارسال </a></span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        console.log('Verification mounted.')
    },
    data(){
        return{
            User:[],
            mobile: '',
            type: '',
            code: [],
        }
    },
    created() {
        //this.verification();
        //this.resendVerification();
    },
    methods:{
        /*verification(){
            axios.post('http://3.124.189.172/api/auth/verify',{
                headers:{
                    'Authorization' : 'token $[access_token]'
                },
                params:{
                    code: this.code,
                    type: this.type,
                }
            })
                .then(res=>{
                    this.User = res.data['User']
            })
        },*/
        /*resendVerification(){
            axios.get('http://3.124.189.172/api/auth/resend_verify',{
                headers:{
                    'Authorization' : 'token $[access_token]'
                },
                params:{
                    type: this.User.type
                }
            })
                .then(res=>{
                    console.log('code sent, check your mobile messages');
                })
        }*/
    }
}
</script>
