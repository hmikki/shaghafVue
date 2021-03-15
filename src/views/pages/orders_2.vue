<template>

    <!-- start wrapper -->
    <div class="wrapper">
        <div class="container">
            <div class="sevice-user orders orders-2 add-orders">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">الطلبات</li>
                    </ol>
                </nav>
              <div class="row d-flex justify-content-center">
                <div class="modal-tab col-3">
                  <ul class="nav nav-pills mb-3 list-con row" id="pills-tab" role="tablist">
                    <li class="nav-item col-6">
                      <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" v-on:click.prevent="fetchOrders(0)">الطلبات الحالية</a>
                    </li>
                    <li class="nav-item col-6">
                      <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#transaction" role="tab" aria-controls="pills-profile" aria-selected="false" v-on:click.prevent="fetchOrders(1)">الطلبات السابقة</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <div class="row">
                    <div class="col-lg-3" v-for="(order, index) in Orders" :key="index" v-on:click.prevent="getOrderId(order.id)">
                      <div class="card pro-ser-card">
                          <img class="card-img-top" :src="order.Product.first_image" alt="Card image cap">
                        <div class="card-body">
                          <h6 class="card-title">{{ order.Product.name }}</h6>
                          <p class="card-text">{{ order.Product.description }}</p>
                          <hr>
                          <div class="row bg-h">
                            <div class="col-lg-6"><span class="count count-pr">{{ order.price }}</span></div>
                            <div class="col-lg-6">
                              <span class="count">عدد الخدمة : {{ order.quantity }}</span>
                            </div>
                          </div>

                          <div class="color-1">
                            <button type="submit" class="btn" v-on:click.prevent="getCustomerId(order.user_id)">
                              status  </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <div class="row">
                    <div class="col-lg-3" v-for="(order, index) in Orders" :key="index" v-on:click.prevent="getOrderId(order.id)">
                      <div class="card pro-ser-card">
                        <img class="card-img-top" :src="order.Product.first_image" alt="Card image cap">
                        <div class="card-body">
                          <h6 class="card-title">{{ order.Product.name }}</h6>
                          <p class="card-text">{{ order.Product.description }}</p>
                          <hr>
                          <div class="row bg-h">
                            <div class="col-lg-6"><span class="count count-pr">{{ order.price }}</span></div>
                            <div class="col-lg-6">
                              <span class="count">عدد الخدمة : {{ order.quantity }}</span>
                            </div>
                          </div>

                          <div class="color-1">
                            <button type="submit" class="btn" v-on:click.prevent="getCustomerId(order.user_id)">
                              status  </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    components:{
    },
    data(){
      return{
        Orders: {
          Freelancer: [],
          User:[],
          is_completed: null
        },
        Product: [],
      }
    },
  created() {
    this.fetchOrders();
  },
  methods:{
    fetchOrders(val){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/orders',
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            },
            params:{
              is_completed : val,
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Orders = res.data['Orders'];
              console.log(res.data['Orders']);
              console.log(res.data['status']['status']);
            }else {
              console.log(res.data['status']['message']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
    getOrderId(order_id){
      sessionStorage.setItem('order_id', order_id);
    },
    getCustomerId(id){
      sessionStorage.setItem('customer_id', id);
      this.$router.push('/orders_details');
    }
  },
}
</script>
