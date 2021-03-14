<template>
  <div class="modal fade collection-request" id="add_portfolio" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="text-center">اضافة نماذج أعمال</h5>
        <div class="modal-body secound-m">
          <div class="model-img login100-pic js-tilt" data-tilt><img src="../../assets/img/job-portfolio-1956296-1650459.png" alt="" style="width: 150px ;height:150px"></div>
          <span class="vc-m"> </span>
          <div class="container">
            <div class="form-group">
              <label for="type"> النوع:</label>
              <select class="form-control minimal" id="type">
                <option :value="type = '1'">1</option>
                <option :value="type = '2'">2</option>
              </select>
            </div>
            <div class="form-group">
            <label for="description"></label>
              <textarea class="form-control" id="description" rows="3" v-model="description">تفاصيل نموذج العمل</textarea>
          </div>
          <div class="form-group">
          <label for="file"></label>
            <form id="file-upload-form" class="">
              <input id="file" ref="file" type="file" name="fileUpload" accept="image/*"/>
            </form>
        </div>
          </div>
          <div class="tab-button">
            <button type="submit" class="btn" id="dep" v-on:click.prevent="addPortfolio()">اضافة</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";


export default {
  name:'deposit',
  mounted() {
    console.log('deposit mounted');
  },
  data(){
    return{
      Portfolio:[],
      type:'',
      description:'',
      image:'',
      file:'',

    }
  },
  created() {

  },
  methods:{
    addPortfolio(){
      let file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('media',file);
      formData.append('type' , this.type);
      formData.append('description', this.description);
      console.log(file);
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/portfolios/store',
          formData,
          {
            headers:{
              'Authorization': 'Bearer '+token,
              'X-localization' : 'ar',
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          console.log(res.data['status']['status']);
          console.log(res.data['Portfolio']);
        }else {
          console.log(res.data['status']['message']);
        }
      })
    }
  }
}
</script>