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
                        <label for="exampleFormControlSelect1">الخدمة الرئيسية</label>
                        <select class="form-control minimal" id="exampleFormControlSelect1" v-on:change.prevent="">
                          <option>select</option>
                          <option :value="category.id"  v-for="(category, index) in Categories" :key="index" :class="{'selected': index === 0}" :v-model="category_id = category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">الخدمة الفرعية</label>
                        <select class="form-control minimal" id="exampleFormControlSelect2">
                          <option>select</option>
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
                            <h6 class="text-right">صورة الخدمة</h6>                                                                                                   <!-- Upload  -->
                            <form id="file-upload-form" class="uploader">
                                <input id="file-upload" type="file" name="fileUpload" v-on:change.prevent="ImageViewTrigger()" accept="image/*" :v-model="media" />
                                <p id="demo"></p>
                              <label for="file-upload" id="file-drag">
                                    <img id="file-image" src="#" alt="Preview" class="hidden">
                                    <div id="start">
                                        <img src="../../assets/img/upload.svg" alt="" id="add_order">
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
<!--                          <file-upload :url='url' :thumb-url='thumbUrl' :headers="headers" v-on:change.prevent="onFileChange"></file-upload>-->
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

export default {

    mounted() {
        console.log('Component mounted.')
    },
    data(){
        return{
          Categories:[],
          product:[],
          Products:[],
          name:'',
          description:'',
          category_id:'',
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
      addService(){
        const token = sessionStorage.getItem('access_token_1');
        axios.post('http://18.194.157.202/api/products/store',
            {
                name:this.name,
                description:this.description,
                category_id:this.category_id,
                sub_category_id:this.sub_category_id,
                price:this.price,
                type:this.type,
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
      },
    ImageViewTrigger(){
      var x = document.getElementById("file-upload");
      var txt = "";
      var media = [];
          if ('files' in x) {
        if (x.files.length == 0) {
          txt = "Select one or more files.";
        } else {
          for (var i = 0; i < x.files.length; i++) {
            txt += "<br><strong>" + (i+1) + ". file</strong><br>";
            var file = x.files[i];
            if ('name' in file) {
              txt += "name: " + file.name + "<br>";
             //set media for request
              media = file.name;
              this.media.push(media);
            }
            if ('size' in file) {
              txt += "size: " + file.size + " bytes <br>";
            }
          }
        }
      }
      else {
        if (x.value == "") {
          txt += "Select one or more files.";
        } else {
          txt += "The files property is not supported by your browser!";
          txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
      }
      document.getElementById("demo").innerHTML = txt;
}
  }
}
</script>
