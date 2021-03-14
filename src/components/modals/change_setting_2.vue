<template>
    <thanks_message></thanks_message>
    <div class="modal fade change-sit acount-sitting-2" id="exampleModalCenter-5" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-header">
                    <p>تعديل بيانات الحساب</p>
                </div>
                <div class="modal-body secound-m">
                    <div class="form-group">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1"><i class="fas fa-user"></i> نبذة شخصة</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="bio">عبدالله جرغون بكالوريوس تصميم عملت في العديد من الشركات وحصلت على العديد من المشاريع واعمل اعمل الان كفريلانسر عبر منصات العمل الحرمن الشركات وحصلت على العديد
                                        </textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput1"><i class="fas fa-user"></i> الاسم كاملا</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" placeholder="" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1"> <i class="fas fa-phone-alt"></i> رقم الجوال</label>

                        <div class="row w-100 phone-n">
                            <input class="form-control mr-sm-2 search-t col-lg" type="number" placeholder="" aria-label="Search" v-model="mobile">
                            <span class="flag-img">(+966) <img src="../../assets/img/saudi-arabia.svg" alt=""></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail2"><i class="fas fa-envelope"></i> البريد الالكتروني</label>
                        <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">المدينة</label>
                        <select class="form-control minimal" id="exampleFormControlSelect2">
                            <option>المملكة العربية السعودية - المدينة المنورة</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1"><i class="fas fa-map-marker-alt"></i> الموقع</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="المملكة العربية السعودية - المدينة المنورة - شارع الملك عبد الله">
                    </div>
                    <div class="row">
                        <div class="form-group col-lg-6">
                            <label for="formGroupExampleInput"> رقم الايبان</label>
                            <input type="number" class="form-control" id="formGroupExampleInput" placeholder="" v-model="iban_number">
                        </div>
                        <div class="form-group col-lg-6">
                            <label for="exampleFormControlSelect1"> الجنس</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option :value="gender='1'">ذكر</option>
                                <option :value="gender= '2'">أنثى</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h6 class="text-right">صورة الهوية الوطنية</h6>                                                                                                   <!-- Upload  -->
                          <form id="file-upload-form" class="">
                            <input id="file" type="file" ref="file" accept="image/*">
                          </form>
                        </div>
                    </div>
                    <div class="tab-button">
                        <button type="submit" v-on:click.prevent="changeSetting2()" class="btn" data-toggle="modal" aria-label="Close" data-dismiss="modal">حفظ التعديل</button>
                    </div>
                    <div class="tab-a"></div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import thanks_message from "@/components/modals/thanks_message";
import axios from "axios";
import jquery from 'jquery';
let $ = jquery;

export default {
    mounted() {
        console.log('Component mounted.')
    },
    components:{
        thanks_message
    },
    data(){
      return{
        User:[],
        bio: '',
        name: '',
        mobile: '',
        email: '',
        country_id : '1',
        city_id : '1',
        gender :'',
        identity_image: '',
        iban_number :'',
        file :'',
      }
    },
    methods:{
      changeSetting2(){
        let file = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('identity_image',file);
        console.log(file);
        formData.append('bio',this.bio);
        formData.append('name',this.name);
        formData.append('mobile',this.mobile);
        formData.append('email',this.email);
        formData.append('country_id',this.country_id);
        formData.append('city_id',this.city_id);
        formData.append('gender',this.gender);
        formData.append('iban_number',this.iban_number);
        const token = sessionStorage.getItem('access_token_1');
        axios.post('http://18.194.157.202/api/auth/update',
            formData,
            {
              headers:{
                'Authorization': 'Bearer ' + token,
                'X-localization' : 'ar',
              }
            })
            .then(res=>{
              if (res.data['status']['status'] === "success"){
                this.User = res.data['User'];
                console.log(res.data['status']['message']);
                $('#exampleModalCenter-5').modal('hide');
                console.log(res.data['User']);
              }else {
                console.log(res.data['status']['message']);
              }
            })
            .catch(e=>{
              console.log(e);
            })
      }
    }

}
</script>
