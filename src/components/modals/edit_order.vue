<template>
    <div class="modal fade add-o" id="exampleModalCenter-10" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-header">
                    <p>تعديل خدمة</p>
                </div>
                <div class="modal-body secound-m">
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">الخدمة الرئيسية</label>
                        <select class="form-control minimal" id="exampleFormControlSelect1">
                            <option v-for="(category, index) in Categories" :key="index" :class="{'selected' : index === 0}">
                              {{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group" v-for="(category,index) in Categories" :key="index">
                        <label for="exampleFormControlSelect2" >الخدمة الفرعية</label>
                        <select class="form-control minimal" id="exampleFormControlSelect2">
                            <option v-for="(sub, index) in category.SubCategories" :key="index" :class="{'selected' : index === 0}">{{ sub.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput1"> إسم الخدمة</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" :placeholder="Product.name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect3"> نوع الخدمة</label>
                      <select class="form-control minimal" id="exampleFormControlSelect3">
                        <option :v-model="type = '1'">خدمات</option>
                        <option :v-model="type = '2'">منتجات</option>
                      </select>
                    </div>

                    <div class="form-group">
                        <label for="formGroupExampleInput3"> السعر</label>
                        <input type="number" class="form-control" id="formGroupExampleInput3" :placeholder="Product.price" v-model="price">
                    </div>
                    <div class="form-group">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1"> الوصف</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" v-text="Product.description" v-model="description">
                                        </textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <h6 class="text-right">صورة الخدمة</h6>                                                                                                   <!-- Upload  -->
                            <form id="file-upload-form" class="uploader">
                                <input id="file-upload" type="file" name="fileUpload" onchange="ImageViewTrigger(this,'edit_order')" accept="image/*" :v-model="media" />

                                <label for="file-upload" id="file-drag">
                                    <img id="file-image" src="#" alt="Preview" class="hidden">
                                    <div id="start">
                                        <img src="../../assets/img/upload.svg" alt="" id="edit-order">
                                        <div id="notimage" class="hidden">Please select an image</div>
                                    </div>
                                    <div id="response" class="hidden">
                                        <div id="messages"></div>
                                        <progress class="progress" id="file-progress" value="0">
                                            <span>0</span>%
                                        </progress>
                                    </div>
                                </label>
                            </form>
                        </div>
                    </div>
                    <div class="tab-button">
                        <button type="submit" class="btn">تعديل</button>
                    </div>
                    <div class="tab-a"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import jquery from 'jquery';
import services from "@/components/sections/add_service/services";
let $ = jquery;

export default {
    mounted() {
        console.log('Component mounted.')
    },
  data(){
      return{
        Categories:[],

        SubCategories: [],
        Product:[],
        product_id:services.data().product_id,
        name: '',
        description:'',
        category_id:'',
        sub_category_id:'',
        price:'',
        type:'',
        media:[],
      }
  },
  created() {
    this.fetchAllCategories();
  },
  methods:{
      fetchAllCategories(){
      axios.get('http://18.194.157.202/api/home/categories',
          {
            headers:{
              'X-localization' : 'ar',
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Categories = res.data['Categories'];
              console.log(res.data['status']['status']);
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
      editOrder(){
        const token = sessionStorage.getItem('access_token_1');
        axios.post('http://18.194.157.202/api/products/update',
            {
              product_id:this.product_id,
              name: this.name,
              description: this.description,
              category_id: this.category_id,
              sub_category_id: this.sub_category_id,
              price: this.price,
              type: this.type,
              media:this.media,
            },
            {
              headers:{
                'Authorization' : 'Bearer ' +token,
                'X-localization' : 'ar',
              },
            })
        .then(res=>{
          if (res.data['status']['status'] === "success"){
            this.Product = res.data['Product'];
            console.log(res.data['status']['status']);
          }else {
            console.log(res.data['status']['message']);
          }
        })
        .catch(e=>{
          console.log(e);
        })
      },
    ImageViewTrigger(input,name) {
      if (input.files && input.files[0]) {
        console.log('1');
        let reader = new FileReader();
        reader.onload = function (e) {
          $('#'+name).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>
