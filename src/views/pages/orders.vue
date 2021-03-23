<template>
    <!-- start wrapper -->
    <div class="wrapper">
        <div class="container">
            <div class=" orders">
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
                      <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" v-on:click.prevent="fetchCurrentOrder(0)">الطلبات الحالية</a>
                    </li>
                    <li class="nav-item col-6">
                      <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#transaction" role="tab" aria-controls="pills-profile" aria-selected="false" v-on:click.prevent="fetchCurrentOrder(1)">الطلبات السابقة</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <div class="row">
                    <div class="col-lg-3" v-for="(order, index) in Orders" :key="index" v-on:click.prevent="getOrderId(order.id)">
                      <div class="card pro-ser-card">
                        <img class="card-img-top" src="{{(order.Product)?order.Product.first_image:''}}" alt="Card image cap">
                        <div class="card-body">
                          <h6 class="card-title">{{ (order.Product)?order.Product.name:'-' }}</h6>
                          <p class="card-text">{{ (order.Product)?order.Product.description:'-' }}</p>
                          <hr>
                          <div class="row bg-h">
                            <div class="col-lg-6"><span class="count count-pr">{{ order.total }}</span></div>
                            <div class="col-lg-6">
                              <span class="count">عدد الخدمة : {{ order.quantity }}</span>
                            </div>
                          </div>

                          <div class="row">
                            <div class="m-name col-7">
                              <span class="count">المنفذ</span>
                              <p>{{ order['Freelancer']['name'] }}</p>
                            </div>
                            <button type="submit" class="btn" v-on:click.prevent="getFreelancerId(order['Freelancer']['id'])">
                              <div class="col-5 refused">
                                {{ order['status_str'] }}
                              </div>
                            </button>
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
                        <img class="card-img-top" :src="(order.Product)?order.Product.first_image:''" alt="Card image cap">
                        <div class="card-body">
                          <h6 class="card-title">{{ (order.Product)?order.Product.name:'-' }}</h6>
                          <p class="card-text">{{ (order.Product)?order.Product.description:'-' }}</p>
                          <hr>
                          <div class="row bg-h">
                            <div class="col-lg-6"><span class="count count-pr">{{ order.total }}</span></div>
                            <div class="col-lg-6">
                              <span class="count">عدد الخدمة : {{ order.quantity }}</span>
                            </div>
                          </div>

                          <div class="row">
                            <div class="m-name col-7">
                              <span class="count">المنفذ</span>
                              <p>{{ order['Freelancer']['name'] }}</p>
                            </div>
                            <button type="submit" class="btn" v-on:click.prevent="getFreelancerId(order['Freelancer']['id'])">
                              <div class="col-5 refused">
                                {{ order['status_str'] }}
                              </div>
                            </button>
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
    name:'orders',
    mounted() {
        console.log('Component mounted.')
    },
  data(){
    return {
      Orders: [],
      Product: [],
      Freelancer: [],
      User:[],
      is_completed: 0,
    }
  },
  created() {
      this.fetchCurrentOrder();
  },
  methods:{
    fetchCurrentOrder(val){
      try {
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/orders',
            {
              headers: {
                'Authorization': 'Bearer ' + token,
                'X-localization': 'ar',
              },
              params: {
                per_page: 10,
                is_completed: val,
              }
            })
            .then(res => {
              if (res.data['status']['status'] === "success") {
                this.Orders = res.data['Orders'];
                console.log(res.data['Orders']);
                console.log(res.data['status']['status']);
              } else {
                console.log(res.data['status']['message']);
              }
            })
            .catch(e => {
              console.log(e);
            })
      }catch (e){
        console.log(e);
      }
    },
    getOrderId(order_id){
      sessionStorage.setItem('order_id', order_id);
    },
    getFreelancerId(id){
      sessionStorage.setItem('freelancer_id', id);
      this.$router.push('/orders_details');
    }
  },

}
</script>
