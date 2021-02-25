<template>
    <div class="modal fade change-pas" id="exampleModalCenter-3" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-header">
                    <p>تغيير كلمة المرور</p>
                </div>
                <div class="modal-body secound-m">
                    <div class="form-group">
                        <label for="inputPassword-1"> <i class="fas fa-lock"></i> كلمة المرور القديمة</label>
                        <input type="password" class="form-control" id="inputPassword-1" placeholder="كلمة المرور القديمة" v-model="old_password">
                    </div>
                    <div class="form-group">
                        <label for="inputPassword-2"> <i class="fas fa-lock"></i> كلمة المرور الجديدة</label>
                        <input type="password" class="form-control" id="inputPassword-2" placeholder="كلمة المرور الجديدة" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="inputPassword-3"> <i class="fas fa-lock"></i>تأكيد كلمة المرور الجديدة</label>
                        <input type="password" class="form-control" id="inputPassword-3" placeholder="تأكيد كلمة المرور الجديدة" v-model="password_confirmation">
                    </div>
                    <div class="tab-button">
                        <button type="submit" class="btn" v-on:click="changePassword()">تغيير</button>
                    </div>
                    <div class="tab-a"></div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from "axios";

export default {
    mounted() {
        console.log('Component mounted.')
    },
    data(){
        return{
            User:[],
            password:'',
            password_confirmation:'',
            old_password:'',
        }
    },
    created() {
        this.changePassword();
    },
    methods:{
        changePassword(){
            const token = sessionStorage.getItem('access_token');
            axios.post('http://3.124.189.172/api/auth/change_password',
                {
                  arguments:{
                    password:this.password,
                    password_confirmation:this.password_confirmation,
                    old_password:this.old_password,
                  }
                },
                {
                  headers:{
                    'Authorization': 'Bearer ' + token,
                    'X-localization': 'ar'
                  }
                })
            .then(res=>{
              if (res.data['status']['status'] === "success"){
                this.User = res.data['User'];
                console.log(res.data['status']['status'])
              }else {
                console.log(res.data['status']['message']);
              }
            })
        }
    }
}
</script>
