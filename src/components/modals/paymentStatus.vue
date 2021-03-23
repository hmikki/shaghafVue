<template>
    <div class="modal fade thanks" id="paymentStatus" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body secound-m">
                    <div class="model-img login100-pic js-tilt" data-tilt><img src="../../assets/img/thanks.svg" alt=""></div>
                    <h4 class="vc-m">{{ Transaction['status_str'] }}</h4>
                    <div class="tab-button">
                        <button type="submit" class="btn" data-toggle="modal" data-target="#exampleModalCenter-8" aria-label="Close" data-dismiss="modal">تقييم</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
<div>
  status :{{ Transaction['status_str'] }}
</div>
</template>
<script>
import axios from "axios";

export default {
  name:'paymentStatus',
    mounted() {
        console.log('Thank you mounted.')
    },
  data(){
      return{
        Transaction:[],
      }
  },
  methods:{
      checkPayment(){
        try {
          const token = sessionStorage.getItem('access_token_1');
          axios.get('http://18.194.157.202/api/transactions/check_payment',
              {
                headers:{
                  'Authorization' : 'Bearer ' + token,
                  'X-localization' : 'ar',
                },
                params:{
                  transaction_id : sessionStorage.getItem('transaction_id'),
                }
              })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Transaction = res.data['Transaction'];
            }else {
              console.log(res.data['status']['status']);
            }
          })
        }catch (e){
          console.log(e);
        }
      }
  }
}
</script>
