<template>
    <div class="wrapper">
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                    <li class="breadcrumb-item"><a href="#">الطلبات</a></li>
                    <li class="breadcrumb-item"><a href="#">الطلبات الحالية</a></li>
                    <li class="breadcrumb-item"><a href="#">تفاصيل الطلب</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ Order.title }} {{ Order.Freelancer.name }}</li>
                </ol>
            </nav>
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <div class="orders-details">
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="card pro-ser-card">
                                    <img class="card-img-top" src="../../assets/img/product-1.svg" alt="Card image cap">
                                    <div class="card-body">
                                        <h6 class="card-title">{{ Order.Product.name }}</h6>
                                        <p class="card-text">{{ Order.Product.description }}</p>
                                        <hr>
                                        <ul>
                                            <li>بيوت</li>
                                            <li>منازل</li>
                                            <li>تشطيب</li>
                                        </ul>
                                        <div class="row bg-h">
                                            <div class="col-lg-5"><span class="count count-pr"> {{Order['Product']['price']}} </span></div>
                                            <div class="col-lg-2"></div>
                                            <div class="col-lg-5">
                                                <span class="count">عدد الخدمة : {{ Order.quantity }}</span>
                                            </div>
                                        </div>
                                        <div class="m-name">
                                            <span class="count">المنفذ</span>
                                            <p>{{ Order.Freelancer.name }}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div class="midd-line"></div>
                            </div>
                            <div class="col-lg-5">
                                <div class="t-d">
                                    <span><img src="../../assets/img/clock.svg" alt=""> {{ Order['delivered_time'] }}</span>
                                    <span><img src="../../assets/img/calendar.svg" alt=""> {{ Order['delivered_date'] }}</span>
                                </div>
                                <div class="order-state">
                                    <div class="order-header">
                                        <h5>حالة الطلب</h5>
                                    </div>
                                    <div class="order-content t-d">
                                        <div class="doted-bor">
                                          <div v-for="(status, index) in Order.OrderStatuses" :key="index">
                                            <span>{{ status.status_str}}</span>
                                            <p>{{ status.created_at }}</p>
                                            <div class="time-line">
                                              <div class="">
                                                <i class="fas fa-check-circle"></i>
                                              </div>
                                              <span class="test-border"></span>
                                              <div class="">
                                                <i class="fas fa-circle"></i>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="total-price t-d">
                                    <p>السعر الاجمالي</p>
                                    <span> {{ Order.total }} </span>
                                </div>
                                <div class="tab-button" id="accept" v-show="(Order.status === 1) && (Order.User.type === 2)">
                                    <button type="submit" class="btn">قبول الطلب</button>
                                </div>
                              <div class="tab-button" id="reject" v-show="(Order.status === 1) && (Order.User.type === 2)">
                                <button type="submit" class="btn">رفض الطلب</button>
                              </div>
                              <div class="tab-button" id="cancel" v-show="(Order.status === 1) && (Order.User.type === 1)">
                                <button type="submit" class="btn">الغاء الطلب</button>
                              </div>
                              <div class="tab-button" id="paid" v-show="(Order.status === 1) && (Order.User.type === 1)">
                                <button type="submit" class="btn">تم الدفع</button>
                              </div>
                              <div class="tab-button" id="inProgress" v-show="(Order.status === 5) && (Order.User.type === 2)">
                                <button type="submit" class="btn">قيد التنفيذ</button>
                              </div>
                              <div class="tab-button" id="delivered" v-show="(Order.status === 6) && (Order.User.type === 2)">
                                <button type="submit" class="btn">تم التسليم</button>
                              </div>
                              <div class="tab-button" id="recieved" v-show="(Order.status === 7) && (Order.User.type === 1)">
                                <button type="submit" class="btn">تم الاستلام</button>
                              </div>
                              <div class="tab-button" id="notDelivered" v-show="(Order.status === 6) && (Order.User.type === 2)">
                                <button type="submit" class="btn">لم يتم التسليم</button>
                              </div>
                              <div class="tab-button" id="notRecieved" v-show="(Order.status === 7) && (Order.User.type === 1)">
                                <button type="submit" class="btn">لم يتم الاستلام</button>
                              </div>
                              <div class="tab-button" id="chat" v-show="(Order.status === 2)">
                                <router-link to="/chats"> <button type="submit" class="btn">بدء المحادثة</button> </router-link>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-1">

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
        Order:[],
        order_id:'1',
        orderStatuses:[],
      }
  },
    created() {
      this.fetchOrderDetails();
      this.fetchOrderStatus();
    },
    methods:{
      fetchOrderDetails(){
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/orders/show',
            {
              headers:{
                'Authorization' : 'Bearer ' +token,
                'X-localization' : 'ar',
              },
              params:{
                order_id: '33',
              }
            })
        .then(res=>{
          if (res.data['status']['status'] === "success"){
            this.Order = res.data['Order'];
            console.log(res.data['status']['status']);
          }else {
            console.log(res.data['status']['message']);
          }
        })
        .catch(e=>{
          console.log(e);
        })
      },
      fetchOrderStatus(){
        axios.get('http://18.194.157.202/api/home/install',
            {
              headers:{
                'X-localization' : 'ar',
              }
            })
        .then(res=>{
          if (res.data['status']['status']){
            this.orderStatuses = res.data['data']['Essentials']['OrderStatuses'];
            console.log(res.data['data']['Essentials']['OrderStatuses']);
            console.log(res.data['status']['status']);
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
