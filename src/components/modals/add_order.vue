<template>
    <div class="modal fade add-o" id="exampleModalCenter-9" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-header">
                    <p>إضافة خدمة</p>
                </div>
                <div class="modal-body secound-m">
                    <div class="form-group">
                        <label for="categories">الخدمة الرئيسية</label>
                        <select class="form-control minimal" id="categories" v-on:change.prevent="addSubCategories()">
                          <option>select</option>
                          <option v-for="(category, index) in Categories" :key="index" :class="{'selected': index === 0}" :value="category_id = category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="subcategories">الخدمة الفرعية</label>
                        <select class="form-control minimal" id="subcategories">
                          <option >select</option>
                          <option v-for="(subcategory, index) in SubCategories" :key="index" :value="sub_category_id = subcategory.id">
                            {{ subcategory['name'] }}</option>
                            </select>
                    </div>

                    <div class="form-group">
                        <label for="formGroupExampleInput"> إسم الخدمة</label>
                        <input type="text" class="form-control" id="formGroupExampleInput1" placeholder="تصميم منازل" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput"> نوع الخدمة</label>
                      <select class="form-control minimal" id="exampleFormControlSelect3">
                        <option :v-model="type = '1'">خدمات</option>
                        <option :v-model="type = '2'">منتجات</option>
                      </select>
                    </div>

                    <div class="form-group">
                        <label for="formGroupExampleInput"> السعر</label>
                        <input type="number" class="form-control" id="formGroupExampleInput" placeholder="550 ر.س" v-model="price">
                    </div>
                    <div class="form-group">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1"> الوصف</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" v-model="description">تصميم فيلا على برنامج اليستريتور
                                        </textarea>
                        </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <h6 class="text-right">صورة الخدمة</h6>
                          <input type="file" v-on:change="onSelectImage" id="product_image">                                                                          <!-- Upload  -->
                          <form id="file-upload-form" class="">
<!--                          <input id="file-upload" type="file" name="fileUpload" accept="image/*" />

                          <label for="file-upload" id="file-drag">
                            <img id="file-image" src="#" alt="Preview" class="hidden">
                            <div id="start">
                              <img src="../../assets/img/upload.svg" alt="" id="add-order">
                              <div id="notimage" class="hidden">Please select an image</div>
                            </div>
                            <div id="response" class="hidden">
                              <div id="messages"></div>
                              <progress class="progress" id="file-progress" value="0">
                                <span>0</span>%
                              </progress>
                            </div>
                          </label>-->
                        </form>
                      </div>
                    </div>
                    <div class="tab-button">
                        <button type="submit" class="btn" v-on:click.prevent="addService()">اضافة</button>
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
let $ = jquery;

export default {

    mounted() {
        console.log('Component mounted.')
    },
    data(){
        return{
          Categories:[],
          SubCategories: [],
          product:[],
          Products:[],
          name:'',
          description:'',
          category_id: '',
          sub_category_id:'',
          price:'',
          type:'',
          media:[],
          url: 'http://18.194.157.202/storage/users/avatar/5366aeda6ab7226dbbac7ddc52317e62.svg',
          headers: {'access-token': sessionStorage.getItem('access_token_1')},
          filesUploaded: []
        }
    },
    created() {
      this.fetchAllCategories();
    },
  methods: {
    fetchAllCategories() {
      axios.get('http://18.194.157.202/api/home/categories',
          {
            headers: {
              'X-localization': 'ar',
            }
          })
          .then(res => {
            if (res.data['status']['status'] === "success") {
              this.Categories = res.data['Categories'];

              console.log(res.data['status']['status']);
            } else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e => {
            console.log(e);
          })
    },
    addService() {
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/products/store',
          {
            name: this.name,
            description: this.description,
            category_id: this.category_id,
            sub_category_id: this.sub_category_id,
            price: this.price,
            type: this.type,
            media : this.media,
          },
          {
            headers: {
              'Authorization': 'Bearer ' + token,
              'X-localization': 'ar',
            },
          })
          .then(res => {
            if (res.data['status']['status'] === "success") {
              this.Product = res.data['Product'];
              console.log(res.data['status']['status']);
            } else {
              console.log(res.data['status']['message']);
            }
          })
    },
    addSubCategories() {
      var select = document.getElementById('categories').value;
      console.log(select);
      axios.get('http://18.194.157.202/api/home/categories',
          {
            headers: {
              'X-localization': 'ar',
            }
          })
          .then(res => {
            if (res.data['status']['status'] === "success") {
              this.SubCategories = res.data['Categories'][select - 1]['SubCategories'];
              console.log(res.data['Categories'][select - 1]['SubCategories']);
            } else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e => {
            console.log(e);
          })
    },
    ImageViewTrigger() {
      var input = document.getElementById('file-upload');
      console.log(input);
      var name = 'add-order';
      if (input.files && input.files[0]) {
          console.log('done');
          let reader = new FileReader();
          reader.onload = function (e) {
          $('#'+name).attr('src', e.target.result);
      };
          reader.readAsDataURL(input.files[0]);
      }
    },
    onSelectImage(event) {
      console.log(event);
      this.media = event.target.files[0];
      console.log(this.media);
      let reader = new FileReader();
      reader.onload = function (e) {
        $('#add-order').attr('src', e.target.result);
      };
      reader.readAsDataURL(this.media);
    }

  }
}
</script>
