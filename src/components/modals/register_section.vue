<template>
    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

        <form v-on:submit="register()" action="" accept-charset="UTF-8">
            <div class="radio-chose">
                <label for="radio-one" class="r-ch1"><i class="far fa-user-circle"></i> نوع التسجيل</label>
                <div class="switch-field r-ch2">
                    <input type="radio" id="radio-one" name="switch-one" value="yes" v-bind:v-model="type= '1'" checked/>
                    <label for="radio-one"><i class="fas fa-check-circle"></i> عميل شغف</label>
                    <input type="radio" id="radio-two" name="switch-one" value="no" v-bind:v-model="type= '1'" />
                    <label for="radio-two"><i class="fas fa-check-circle"></i> شريك شغف</label>
                </div>
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput"><i class="fas fa-user"></i> الاسم كاملا</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="ادخال الاسم كاملا" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"> <i class="fas fa-phone-alt"></i> رقم الجوال</label>

                <div class="row w-100 phone-n">
                    <input class="form-control mr-sm-2 search-t col-lg" type="number" placeholder="ادخال رقم الجوال" aria-label="Search" v-model="mobile" required>
                    <span class="flag-img">(+966) <img src="src/assets/img/saudi-arabia.svg" alt=""></span>
                </div> </div>
            <div class="form-group">
                <label for="exampleFormControlSelect1">المدينة</label>
                <select class="form-control minimal" id="exampleFormControlSelect1" v-bind:v-model="city_id= '1'">
                    <option v-bind:v-model="city_id= '1'">المملكة العربية السعودية - المدينة المنورة </option>
                    <option v-bind:v-model="city_id= '1'">2</option>
                    <option v-bind:v-model="city_id= '1'">3</option>
                    <option v-bind:v-model="city_id= '1'">4</option>
                    <option v-bind:v-model="city_id= '1'">5</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"><i class="fas fa-envelope"></i> البريد الالكتروني</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ادخال البريد الالكتروني" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="inputPassword"> <i class="fas fa-lock"></i> كلمة المرور</label>
                <input type="password" class="form-control" id="inputPassword" placeholder="ادخل كلمة المرور" v-model="password" required>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" required>
                    <label class="form-check-label" for="gridCheck">
                        أوافق على سياسة الخصوصية
                    </label>
                </div>
            </div>
            <div class="tab-button">
                <button type="submit" class="btn">إنشاء حساب</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";

export default {
    mounted() {
        console.log('Register mounted.');
    },
    data(){
        return{
            User: [],
            name: '',
            mobile: '',
            email: '',
            password: '',
            type: '',
            country_id : '1',
            city_id : '',
        }
    },
    created() {
        this.register();
    },
    methods:{
        register(){
            axios.post('http://3.124.189.172/api/auth/register',{
              'X-localization' : 'ar',
              'name': this.name,
              'mobile': this.mobile,
              'email': this.email,
              'password': this.password,
              'type': this.type,
              'country_id' : this.country_id,
              'city_id' : this.city_id,
            }).then(res=>{
                      if(res.data['status']['status'] === 'success'){
                        this.User = res.data['User'];
                        const access_token = res.data['User']['access_token'];
                        localStorage.setItem('access_token', access_token);
                        console.log(res.data['User']['access_token']);
                        console.log(res.data['status']['status']);
                        }else {
                        localStorage.removeItem('access_token') // if the request fails, remove any possible user token if possible
                          console.log(res.data['status']['message']);
                        }
            }) .catch(e => {
                this.errors.push(e);
            });
        }
    }
}
</script>
