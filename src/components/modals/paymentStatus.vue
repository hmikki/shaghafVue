<template>
  <div class="wrapper">
    <div class="container">
      <div class="sevice-user">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
            <li class="breadcrumb-item active" aria-current="page">عملية الدفع</li>
          </ol>
        </nav>
        <section class="payment">
          <div>
            <div class="row">
              <div class="col-lg-3"></div>
              <div class="col-lg-6 payMethod">
                <form>
                  <div class="form-group">
                    <label for="transaction_id">رقم العملية</label>
                    <input type="text" id="transaction_id" class="form-control" :placeholder="Transaction.id" disabled>
                  </div>
                  <div class="form-group">
                    <label for="transaction_type">نوع العملية</label>
                    <input  id="transaction_type" type="text" class="form-control" :placeholder="Transaction.type_str" disabled>
                  </div>
                  <div class="form-group">
                    <label for="transaction_status">حالة العملية</label>
                    <input id="transaction_status" type="text" class="form-control" :placeholder="Transaction.status_str" disabled>
                  </div>
                  <router-link to="/financial"> <button type="submit" class="btn text-center"> الذهاب للمحفظة</button> </router-link>
                </form>
              </div>
              <div class="col-lg-3"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name:'paymentStatus',
    mounted() {
        console.log('paymentStatus mounted.')
    },
  data(){
      return{
        Transaction:[],
      }
  },
  created() {
    this.checkPayment();
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
              console.log(res.data['Transaction']);
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
<style>
.alert{
  background: white;
  padding: 20px;
  text-align: center;
}
</style>
