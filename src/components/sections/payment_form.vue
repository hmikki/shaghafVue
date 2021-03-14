<template>
  <div id="card_220921339056" class="wpwl-container wpwl-container-card">
    <form class="paymentWidgets" data-brands="VISA MASTER" :action="'https://test.oppwa.com/v1/checkouts/'+checkoutId+'/payment'" method="POST" target="cnpIframe" lang="en">
      <div class="wpwl-group wpwl-group-brand wpwl-clearfix">
        <div class="wpwl-label wpwl-label-brand">Brand</div>
        <div class="wpwl-wrapper wpwl-wrapper-brand">
          <select class="wpwl-control wpwl-control-brand" name="paymentBrand">
            <option value="MASTER">Mastercard</option>
            <option value="VISA">Visa</option>
          </select>
        </div>
        <div class="wpwl-brand wpwl-brand-card wpwl-brand-MASTER"></div>
      </div>
      <div class="wpwl-group wpwl-group-cardNumber wpwl-clearfix">
        <div class="wpwl-label wpwl-label-cardNumber">Card Number</div>
        <div class="wpwl-wrapper wpwl-wrapper-cardNumber">
          <input autocomplete="off" type="tel" name="card.number" class="wpwl-control wpwl-control-cardNumber" placeholder="Card Number">
        </div>
      </div>
      <div class="wpwl-group wpwl-group-expiry wpwl-clearfix">
        <div class="wpwl-label wpwl-label-expiry">Expiry Date</div>
        <div class="wpwl-wrapper wpwl-wrapper-expiry">
          <input autocomplete="off" type="tel" name="card.expiry" class="wpwl-control wpwl-control-expiry" placeholder="MM / YY">
        </div>
      </div>
      <div class="wpwl-group wpwl-group-cardHolder wpwl-clearfix">
        <div class="wpwl-label wpwl-label-cardHolder">Card holder</div>
        <div class="wpwl-wrapper wpwl-wrapper-cardHolder">
          <input autocomplete="off" type="text" name="card.holder" class="wpwl-control wpwl-control-cardHolder" placeholder="Card holder">
        </div>
      </div>
      <div class="wpwl-group wpwl-group-cvv wpwl-clearfix">
        <div class="wpwl-label wpwl-label-cvv">CVV</div>
        <div class="wpwl-wrapper wpwl-wrapper-cvv">
          <input autocomplete="off" type="tel" name="card.cvv" class="wpwl-control wpwl-control-cvv" placeholder="CVV">
        </div>
      </div>
      <div class="wpwl-group wpwl-group-submit wpwl-clearfix">
        <div class="wpwl-wrapper wpwl-wrapper-submit">
          <button v-on:click.prevent="pay()" type="submit" name="pay" class="wpwl-button wpwl-button-pay">Pay now</button>
        </div>
      </div>
      <input type="hidden" name="shopperResultUrl" :value="'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+ checkoutId + '/payment'">
      <input type="hidden" name="card.expiryMonth" value="">
      <input type="hidden" name="card.expiryYear" value="">
    </form>
  </div>
</template>


<script>

import axios from "axios";

let checkoutId = sessionStorage.getItem('payment_token');
let url = 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+ checkoutId + '/payment';
import(url);
export default {
  data(){
    return{
      checkoutId : sessionStorage.getItem('payment_token')
    }
  },
  created() {

  },
  methods:{
    pay(){
      axios.post('https://test.oppwa.com/v1/payments',
          {
              'entityId':'8a8294174b7ecb28014b9699220015ca',
              'paymentBrand':'VISA',
              'card.number':'4200000000000000',
              'card.holder':'Jane Jones',
              'card.expiryMonth':'05',
              'card.expiryYear':'2034',
              'card.cvv':'123'
          },
          {
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization':'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
            }
          })
      .then(res=>{
        if (res.data['result']['code'] === "000.200.000"){
          console.log('success');
        }else {
          console.log('fail');
        }
      })
      .catch(e=>{
        console.log(e);
      })

    }
  }
}
</script>