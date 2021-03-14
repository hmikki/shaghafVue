<template>
  <collection_request></collection_request>
  <deposit></deposit>
  <div class="wrapper">
    <div class="container">
      <div class="sevice-user financial-operations orders">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
            <li class="breadcrumb-item active" aria-current="page">عملياتي المالية</li>
          </ol>
        </nav>
        <!-- start navs section -->
        <div class="row d-flex justify-content-center">
          <div class="modal-tab col-3">
            <ul class="nav nav-pills mb-3 list-con row" id="pills-tab" role="tablist">
              <li class="nav-item col-6">
                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">رصيدي</a>
              </li>
              <li class="nav-item col-6">
                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#transaction" role="tab" aria-controls="pills-profile" aria-selected="false">عملياتي المالية</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <div class="row">
              <div class="col-lg-2"></div>
              <div class="col-lg-8 p-0">
                <div class="row p-balance">
                  <div class="col-lg-4">
                    <div class="balance">
                      <h5>الرصيد المتاح</h5>
                      <p>{{ Balance['AvailableBalance'] }}</p>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="balance">
                      <h5>الرصيد المعلق</h5>
                      <p>{{ Balance['HeldBalance'] }}</p>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="balance">
                      <h5>الرصيد الكلي</h5>
                      <p>{{ Balance['TotalBalance'] }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-2"></div>
            </div>
            <div class="row">
              <div class="col-lg-4"></div>
              <div class="col-lg-2">
                <button type="submit" class="btn" data-toggle="modal" data-target="#exampleModalCenter-11"  aria-label="Close" data-dismiss="modal">طلب تحصيل</button>
              </div>
              <div class="col-lg-2">
                <button type="submit" class="btn" data-toggle="modal" data-target="#deposit"  aria-label="Close" data-dismiss="modal">ايداع</button>
              </div>
              <div class="col-lg-4"></div>
            </div>
          </div>

          <div class="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="pills-profile-tab">
            <div class="row">
              <div class="col-lg-3"></div>
              <div class="col-lg-6 p-balance">
                <div class="balance balance-op row" v-for="(transaction, index) in Transactions" :key="index">
                  <div class="col-lg-10">
                    <i class="fas fa-arrow-down"></i>
                    <span>  {{ transaction['value'] }} ريال سعودي</span>
                    <p class="balance-op-p">{{ transaction['type_str'] }} : <span>{{ transaction['status_str'] }}</span></p>
                  </div>
                  <div class="col-lg-2 balance-op-link">
                    <a href=""><i class="fas fa-chevron-left"></i></a>
                  </div>
                </div>
              </div>
              <div class="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import collection_request from "@/components/modals/collection_request";
import axios from "axios";
import deposit from "@/components/modals/deposit";
export default {
  name: 'financial',
  components:{
    collection_request,
    deposit,
  },
  mounted() {
    console.log('financial mounted.');
  },
  data(){
    return{
      Balance:[],
      Transactions:[],
    }
  },
  created() {
    this.fetchBalance();
    this.fetchTransaction();
  },
  methods:{
    fetchBalance(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/transactions/my_balance',
          {
              headers:{
                'Authorization' : 'Bearer ' +token,
                'X-localization' : 'ar'
              }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          this.Balance = res.data['Balance'];
          console.log(res.data['Balance']);
          console.log(res.data['status']['status']);
        }else{
          console.log(res.data['status']['status']);
        }
      })
      .catch(e=>{
        console.log(e);
      })
    },
    fetchTransaction(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/transactions',
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar'
            },
            params:{
              per_page : 10
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          this.Transactions = res.data['Transactions'];
          console.log(res.data['Transactions']);
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