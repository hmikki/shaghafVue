<template>
  <div class="modal fade collection-request" id="deposit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="text-center">طلب تحصيل</h5>
        <div class="modal-body secound-m">
          <div class="model-img login100-pic js-tilt" data-tilt><img src="../../assets/img/col-req.svg" alt=""></div>
          <span class="vc-m"> </span>
          <div class="container">
            <div class="form-group">
              <label for="balance"></label>
              <input id="balance" class="form-control mr-sm-2" type="number" placeholder="800 ر.س" aria-label="number" v-model="value">
            </div>
          </div>
          <div class="tab-button">
            <button type="submit" class="btn" v-on:click.prevent="createTransaction()">ايداع</button>
          </div>
          <form action="/" class="paymentWidgets" data-brands="VISA MASTER AMEX"></form>
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
  name:'deposit',
  mounted() {
    console.log('deposit mounted');
  },
  data(){
    return{
      value:'',
      Transaction:[],
    }
  },
  created() {

  },
  methods:{
    createTransaction(){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/transactions/generate_checkout',
          {
            value: this.value,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              const transaction_id = res.data['Transaction']['id'];
              const payment_token = res.data['Transaction']['payment_token'];
              sessionStorage.setItem('transaction_id', transaction_id);
              sessionStorage.setItem('payment_token', payment_token);
              $('#deposit').modal('hide');
              console.log(res.data['status']['status'] + ':' + 'transaction_id = ' + transaction_id + ',' + 'payment_token = ' + payment_token);
              axios.get('https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+ transaction_id)
              .then(res=>{
                console.log(res);
              })
              .catch(e=>{
                console.log(e);
              });
              axios.get('https://test.oppwa.com/v1/checkouts/'+payment_token+'/payment')
                  .then(res=>{
                    console.log(res);
                  })
                  .catch(e=>{
                    console.log(e);
                  });
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
  }
}
</script>