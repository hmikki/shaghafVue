<template>
  <div class="modal fade collection-request" id="cancel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="text-center">الغاء الطلب</h5>
        <div class="modal-body secound-m">
          <div class="model-img login100-pic js-tilt" data-tilt><img src="../../assets/img/386px-Ambox_warning_yellow.svg.png" style="width: 150px; height: 150px" alt=""></div>
          <span class="vc-m"> </span>
          <div class="container">
            <div class="form-group">
              <label for="balance"></label>
              <input id="balance" class="form-control mr-sm-2" type="text" placeholder="سبب الالغاء" aria-label="number">
            </div>
          </div>
          <div class="tab-button">
            <button type="submit" class="btn" id="dep" v-on:click.prevent="updateOrder(4)">ارسال</button>
          </div>
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
  name:'cancel',
  mounted() {
    console.log('cancel mounted');
  },
  data(){
    return{
      cancel_reason : '',
    }
  },
  created() {

  },
  methods:{
    updateOrder(order_status){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/orders/update',
          {
              order_id : sessionStorage.getItem('order_id'),
              status : order_status,
              reject_reason : this.cancel_reason,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            },
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              console.log(res.data['status']['status']);
              $('#cancel').modal('hide');
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    }
  }
}
</script>