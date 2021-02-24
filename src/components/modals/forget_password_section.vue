<template>
    <div class="modal fade" id="exampleModalCenter-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-header">
                    <p>نسيت كلمة المرور</p>
                </div>
                <div class="modal-body secound-m">
                    <div class="model-img login100-pic js-tilt" data-tilt><img src="assets/img/forget-password.svg" alt=""></div>
                    <span class="vc-m">سوف نساعدك استعادة كلمة المرور الخاصة بك</span>
                    <div class="form-group">
                        <label for="mobile"> <i class="fas fa-phone-alt"></i> رقم الجوال</label>

                        <div class="row w-100 phone-n">
                            <input class="form-control mr-sm-2 search-t col-lg" id="mobile" name="mobile" type="number" placeholder="ادخال رقم الجوال" aria-label="Search" v-model="mobile">
                            <span class="flag-img">(+966) <img src="assets/img/saudi-arabia.svg" alt=""></span>
                        </div> </div>
                    <div class="tab-button">
                        <button type="submit" class="btn">تأكيد</button>
                    </div>
                    <div class="tab-a"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        console.log('Component mounted.')
    },
    data(){
        return{
            User:[],
            mobile: '',

        }
    },
    created() {
        this.forgetPassword();
    },
    methods:{
        forgetPassword(){
            axios.post('http://3.124.189.172/api/auth/forget_password',{
                headers:{
                    'Authorization' : 'token $[access_token]'
                },
                params:{
                    mobile: this.mobile
                }
            })
            .then(res=>{
                console.log('code sent, check your mobile messages');
            })
        }
    }
}
</script>
