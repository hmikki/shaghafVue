<template>
    <change_password_2></change_password_2>
    <change_setting_2></change_setting_2>
    <!-- start wrapper -->
    <div class="wrapper">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                    <li class="breadcrumb-item active" aria-current="page">حسابي</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="acount-sitting acount-sitting-2">
                        <div class="acount-sitting-com">
                            <div class="sitting-h sitting-h-b">
                                <h5>بيانات الحساب</h5>
                            </div>
                            <div class="siting-body">
                                <div class="edit-c"><a href="" data-toggle="modal" data-target="#exampleModalCenter-5" aria-label="Close" data-dismiss="modal"><i class="fas fa-pen"></i></a></div>
                                <div class="acount-user-img">
                                    <img :src="User.avatar" id="profile-image" alt="">
                                    <input type="file" class="d-none" id="profile-img" onchange="ImageViewTrigger(this,'profile-image')" accept="image/*">
                                    <label for="profile-img"><span><i class="fas fa-plus-circle"></i></span></label>
                                </div>
                                <div class="form-group">
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1"><i class="fas fa-user"></i> نبذة شخصة</label>
                                        <textarea disabled class="form-control" id="exampleFormControlTextarea1" rows="3" :placeholder="User.bio"> </textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput"><i class="fas fa-user"></i> الاسم كاملا</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" :placeholder="User.name" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1"> <i class="fas fa-phone-alt"></i> رقم الجوال</label>

                                    <div class="row w-100 phone-n">
                                        <input class="form-control mr-sm-2 search-t col-lg" type="number" :placeholder="User.mobile" disabled aria-label="Search">
                                        <span class="flag-img">(+966) <img src="../../assets/img/saudi-arabia.svg" alt=""></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1"><i class="fas fa-envelope"></i> البريد الالكتروني</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" :placeholder="User.email" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2"><i class="fas fa-map-marker-alt"></i> الموقع</label>
                                    <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="المملكة العربية السعودية - المدينة المنورة - شارع الملك عبد الله" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">المدينة</label>
                                    <select disabled class="form-control minimal" id="exampleFormControlSelect1">
                                        <option :class="{'selected' : User.city_id === '1'}">المملكة العربية السعودية - المدينة المنورة</option>
                                        <option :class="{'selected' : User.city_id === '1'}">2</option>
                                        <option :class="{'selected' : User.city_id === '1'}">3</option>
                                        <option :class="{'selected' : User.city_id === '1'}">4</option>
                                        <option :class="{'selected' : User.city_id === '1'}">5</option>
                                    </select>
                                </div>
                                <div class="row">
                                    <div class="form-group col-lg-6">
                                        <label for="formGroupExampleInput2"> رقم الايبان</label>
                                        <input type="number" class="form-control" id="formGroupExampleInput2" :placeholder="User.iban_number" disabled>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="exampleFormControlSelect2"> الجنس</label>
                                        <select disabled class="form-control" id="exampleFormControlSelect2">
                                            <option value="" :class="{'selected': User.gender === 'male'}">ذكر</option>
                                            <option value="" :class="{'selected': User.gender === 'female'}">أنثى</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="Identity">
                                            <h6>صورة الهوية الوطنية</h6>
                                            <img :src="User.identity_image" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="acount-sitting-com">
                            <div class="sitting-h">
                                <h5>معلومات الأمن</h5>
                            </div>
                            <div class="siting-body">
                                <div class="form-group">
                                    <label for="inputPassword"> <i class="fas fa-lock"></i> كلمة المرور</label>
                                    <input type="password" class="form-control" id="inputPassword" placeholder="***********************" disabled>
                                </div>
                                <a href="" data-toggle="modal" data-target="#exampleModalCenter-6" aria-label="Close" data-dismiss="modal">هل تريد تغيير كلمة المرور؟</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import change_setting_2 from "@/components/modals/change_setting_2";
import change_password_2 from "@/components/modals/change_password_2";
import axios from "axios";

export default {
  name: 'my_account',
    mounted() {
        console.log('My_account_2 mounted.')
    },
  components:{
      change_setting_2,
      change_password_2,
  },
  data(){
      return{
        User:[],
      }
  },
  created() {
    this.userDetails2();
  },
  methods:{
    userDetails2(){
      const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/auth/me',{
          headers:{
            'Authorization': 'Bearer '+token
          }
        })
            .then(res=>{
              if(res.data['status']['status'] === "success"){
                this.User = res.data['User'];
                console.log(token);
                console.log(res.data['User'])
              }else {
                console.log(res.data['status']['status'])
              }
            })
    },
  }
}
</script>
