<template>
    <div class="wrapper">
        <div class="container">
            <div class="sevice-user">
                <nav aria-label="breadcrumb">
                  <div>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
                        <li class="breadcrumb-item"><router-link to="/our_serve">خدماتنا</router-link></li>
                        <li class="breadcrumb-item" aria-current="page"><a href="">التصميم الجرافيكي</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ User.name }}</li>
                    </ol>
                  </div>
                </nav>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="img-o-h">
                                <router-link to="/chats"><span class="chat"><img src="../../assets/img/chat.svg" alt=""></span></router-link>
                                <div class="order-card-img">
                                    <img class="card-img-top" :src="User.avatar" alt="Card image cap">
                                </div>
                            </div>
                            <div class="card-body">
                                <h4>{{ User.name }}</h4>
                                <span>{{ User.bio }}</span>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-3 p-0"><span><i class="fas fa-map-marker-alt"></i> {{User.City.name}}</span></div>
                                    <div class="col-lg-2"></div>
                                    <div class="col-4 star">
                                        <span class="fa fa-star" :class="{'checked' : User.rate >= '1'}"></span>
                                        <span class="fa fa-star" :class="{'checked' : User.rate >= '2'}"></span>
                                        <span class="fa fa-star" :class="{'checked' : User.rate >= '3'}"></span>
                                        <span class="fa fa-star" :class="{'checked' : User.rate >= '4'}"></span>
                                        <span class="fa fa-star" :class="{'checked' : User.rate >= '5'}"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="pre-works said-about-us">
                                <div class="col-lg-11 o-h">
                                    <h6>الأعمال السابقة</h6>
                                  <carousel :items-to-show="1" :wrap-around="true" style="width: 100%">
                                    <Slide>
                                      <div class="col-lg-3" v-for="(portfolio, index) in Portfolios" :key="index">
                                        <img :src="portfolio.media" style="max-width: 150px">
                                      </div>
                                    </Slide>
                                    <template #addons>
                                      <navigation />
                                      <pagination />
                                    </template>
                                  </carousel>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="pre-works pre-works-sec">
                                <div class="col-lg-3">
                                    <h6>الموقع</h6>
                                </div>
                                <div class="col-lg-9">
                                    <div class="map-pre-w">
                                      <GoogleMap
                                          api-key="AIzaSyCrtMEBxgNcO0-bqdMFxo5hev35ugBZMhI"
                                          style="width: 100%; height: 500px"
                                          :center="center"
                                          :zoom="15"
                                          :init="initializeGoogleMap" :markers="markers" :getUserLocation="true">
                                        <Marker :options="{ position: center }" />
                                      </GoogleMap>
                                      <!--                                        <img src="../../assets/img/map.svg" alt="">-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="row justify-content-center">
                <div class="pro-ser col-3">
                  <!-- start navs section -->
                  <div class="col-lg most-l">
                    <a href="javascript:;" class="active" v-on:click.prevent="fetchProducts(2)">منتجات</a>
                    <a href="javascript:;" v-on:click.prevent="fetchProducts(1)">خدمات</a>
                  </div>
                </div>
              </div>
              <div class="row pb-5">
                <div class="col-lg-3" v-for="(product, index) in Products" :key="index">
                  <div class="card pro-ser-card">
                    <img class="card-img-top" :src="product['first_image']" alt="Card image cap">
                    <div class="card-body">
                      <h6 class="card-title">{{product['name']}}</h6>
                      <p class="card-text">{{ product['description'] }}</p>
                      <hr>
                      <div class="row">
                        <div class="col-lg-3"></div>
                        <div class="col-lg-6"><span class="count count-pr">السعر : {{ product.price }}</span></div>
                        <div class="col-lg-3"></div>
                      </div>
                        <a class="btn pro-ser-button" data-toggle="modal" data-target="#exampleModalCenter-12" aria-label="Close" data-dismiss="modal" :v-model="product_id = product.id">أطلب الان</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  <!--confirm order -->
  <div class="modal fade confirm-order-page" id="exampleModalCenter-12" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-header">
          <p>تأكيد الطلب</p>
        </div>
        <div class="modal-body secound-m">
          <div class="form-group">
            <label for="deliveredDate"><img src="../../assets/img/calendar.svg" alt=""> تاريخ التسليم</label>
            <input type="date" class="form-control" id="deliveredDate" placeholder="05873131316" v-model="delivered_date">
          </div>
          <div class="form-group">
            <label for="deliveredTime"><img src="../../assets/img/clock-1.svg" alt=""> توقيت التسليم</label>
            <input type="time" class="form-control" id="deliveredTime" placeholder="05873131316" v-model="delivered_time">
          </div>
          <div class="form-group">
            <label for="notes"><img :src="User['avatar']" alt=""> الملاحظات</label>
            <textarea class="form-control" id="notes" rows="5" v-model="note">
                                        </textarea>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="row confirm-order">
                <div class="col-lg-4 pr-0">
                  <img class="w-100" :src="Product['first_image']" alt="">
                </div>
                <div class="col-lg-7 confirm-order-content">
                  <h5>{{ Product['name'] }}</h5>
                  <p>{{ Product['description'] }} </p>
                  <div class="row">
                    <div class="col-lg-6">
                      <span>{{ Product['category_name'] }}</span>
                    </div>
                    <div class="col-lg-6">
                      <span>{{ Product['price'] }} ر.س</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-1 pl-0">
                  <div class="count-card">
                    <div class="add-to-cart">
                                           <span>
                                               <i id="increment" v-on:click.prevent="quantity++" :v-model="quantity" class="fas fa-plus"></i>
                                           </span>
                    </div>
                    <div class="cart-counter">
                      {{ quantity }}
                    </div>
                    <div class="remove-from-cart">
                                           <span>
                                               <i id="decrement" v-on:click="quantity--" :v-model="quantity" class="fas fa-minus"></i>
                                           </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="row total-price">
                <h6 class="h5 col-lg-6">السعر الاجمالي</h6>
                <p :v-model="total = quantity * Product['price']" class="col-lg-6">{{ total }} ر.س</p>
              </div>
            </div>
          </div>
          <div class="tab-button">
            <button type="submit" class="btn" v-on:click.prevent="creatrOrder()">اطلب الان</button>
          </div>
          <div class="tab-a"></div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import { GoogleMap, Marker } from 'vue3-google-map';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import jquery from 'jquery';
let $ = jquery;


export default {
    name: 'serve_user',
    components:{
      GoogleMap,
      Marker,
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    mounted() {
        console.log('Component mounted.');
        this.fetchUser();
        this.fetchProduct();
    },
  data(){
      return{
        User:[],
        Portfolios:[],
        Products:[],
        Product:[],
        Order : [],
        delivered_date: '',
        delivered_time : '',
        quantity :1,
        note :'',
        product_id:'',
        lat: '',
        lng: '' ,
      }
  },
  created() {
      this.fetchUser();
      this.fetchUserPortfolios();
      this.fetchProducts();


  },
  methods:{
      fetchUser(){
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/auth/me',
            {
              headers:{
                'Authorization' : 'Bearer ' +token,
                'X-localization' :'ar'
              }
            })
        .then(res=>{
          if (res.data['status']['status'] === "success"){
            this.User = res.data['User'];
            this.lat = res.data['User']['lat'];
            this.lng = res.data['User']['lng'];
            const user_id = res.data['User']['id'];
            sessionStorage.setItem('user_id', user_id);
            console.log(res.data['User']);
          }else {
            console.log(res.data['status']['status']);
          }
        })
      },
      fetchUserPortfolios(){
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/portfolios',
            {
              headers:{
                'Authorization' : 'Bearer ' +token,
                'X-localization': 'ar',
              },
            })
        .then(res=>{
          if (res.data['status']['status'] === "success"){
            this.Portfolios = res.data['Portfolios'];
            console.log(res.data['Portfolios']);
          }else {
            console.log(res.data['status']['status'])
          }
        })
        .catch(e=>{
          console.log(e);
        })
      },
      fetchProducts(val){
      const token = sessionStorage.getItem('access_token_1');
      const user_id = sessionStorage.getItem('user_id');
      axios.get('http://18.194.157.202/api/products',
          {
            headers:{
              'Authorization': 'Bearer ' +token,
              'X-localization' : 'ar',
            },
            params:{
              user_id : user_id,
              type: val,
            }
          })
      .then(res =>{
        if (res.data['status']['status'] === "success"){
          this.Products = res.data['Products'];
          console.log(res.data['Products']);

        }else {
          console.log(res.data['status']['status']);
        }
      })
    },
      creatrOrder(){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/orders/store',
          {
            delivered_date: this.delivered_date,
            delivered_time : this.delivered_time,
            product_id : this.product_id,
            quantity :this.quantity,
            note : this.note,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Order = res.data['Order'];
              console.log(res.data['Order']);
              console.log(res.data['status']['status']);
              $('#exampleModalCenter-12').modal('hide');
            }else {
              console.log(res.data['status']['message']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
      fetchProduct(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/products/show',
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            },
            params:{
              product_id : this.product_id,
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Product = res.data['Product'];
              console.log(res.data['Product']);
              console.log(res.data['status']['status']);
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })

    },
      locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
          position => {
            this.lng = position.coords.longitude;
                this.lat = position.coords.latitude;
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
          },
          error => {
            console.log(error.message);
          },
      )
    },

  },
  setup() {
    const center = { lat: 32, lng: 35.25 }
    return { center }
  },
}
</script>
