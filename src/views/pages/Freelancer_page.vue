<template>
  <confirm_order></confirm_order>
    <div class="wrapper">
        <div class="container">
            <div class="sevice-user">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                        <li class="breadcrumb-item"><a href="#">خدماتنا</a></li>
                        <li class="breadcrumb-item" aria-current="page"><a href="">التصميم الجرافيكي</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{Freelancer['name']}}</li>
                    </ol>
                </nav>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="img-o-h">
                                <router-link to="/chats"><span class="chat"><img src="../../assets/img/chat.svg" alt=""></span></router-link>
                                <div class="order-card-img">
                                    <img class="card-img-top" :src="Freelancer['avatar']" alt="Card image cap">
                                </div>
                            </div>
                            <div class="card-body">
                                <h4>{{ Freelancer['name'] }}</h4>
                                <span>{{ Freelancer['bio'] }}</span>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-3 p-0"><span><i class="fas fa-map-marker-alt"></i> city</span></div>
                                    <div class="col-lg-2"></div>
                                    <div class="col-4 star">
                                        <span class="fa fa-star" :class="{'checked' : Freelancer['rate'] >= 1}"></span>
                                        <span class="fa fa-star" :class="{'checked' : Freelancer['rate'] >= 2}"></span>
                                        <span class="fa fa-star" :class="{'checked' : Freelancer['rate'] >= 3}"></span>
                                        <span class="fa fa-star" :class="{'checked' : Freelancer['rate'] >= 4}"></span>
                                        <span class="fa fa-star" :class="{'checked' : Freelancer['rate'] >= 5}"></span>
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
                                  <div id="carouselExampleControls-4" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                      <div class="carousel-item active">
                                        <div class="row">
                                          <div class="col-lg-3" v-for="(portfolio, index) in Portfolios" :key="index">
                                            <img :src="portfolio.media" alt="portfolio" style="max-width: 150px">
                                          </div>
                                        </div>
                                      </div>

                                    </div>

                                  </div>
                                </div>
                                <div class="col-lg-1 pre-next">
                                    <a class="carousel-control-prev" href="#carouselExampleControls-4" role="button" data-slide="prev">
                                        <span class="arow-s-l arow-s" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleControls-4" role="button" data-slide="next">
                                        <span class="arow-s-r arow-s" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
                                        <span class="sr-only">Next</span>
                                    </a>
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
                    <a href="javascript:;" class="active">منتجات</a>
                    <a href="javascript:;">خدمات</a>
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
                        <a class="btn pro-ser-button" data-toggle="modal" data-target="#exampleModalCenter-12" aria-label="Close" data-dismiss="modal" v-on:click.prevent="getProductId(product.id)">أطلب الان</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  <!--confirm order -->

</template>
<script>
import confirm_order from "@/components/modals/confirm_order"
import axios from "axios";
import { GoogleMap, Marker } from 'vue3-google-map'
//import jquery from 'jquery';
//let $ = jquery;


export default {
    name: 'Freelancer_page',
    components:{
      GoogleMap,
      Marker,
      confirm_order,
    },
    mounted() {
        console.log('Component mounted.');
    },
  data(){
      return{
        Freelancer: [],
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
      this.fetchFreelancer();
      this.fetchFreelancerPortfolios();
      this.fetchFreelancerProducts();


  },
  methods:{
      fetchFreelancer() {
        axios.get('http://18.194.157.202/api/home/get_freelancer', {
          headers:{
            'X-localization' : 'ar',
          },
          params:{
            user_id : sessionStorage.getItem('freelancer_id')
          }
        },)
            .then(res => {
              if (res.data['status']['status'] === "success"){
                this.Freelancer = res.data['Freelancer'];
                console.log(res.data['Freelancer']);
              }else {
                console.log(res.data['status']['status']);
              }
            })
            .catch(e=>{
              console.log(e);
            })
      },
      fetchFreelancerPortfolios(){
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/portfolios',
            {
              headers:{
                'Authorization' : 'Bearer ' +token,
                'X-localization': 'ar',
              },
              params:{
                user_id : sessionStorage.getItem('freelancer_id')
              }
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
      fetchFreelancerProducts(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/products',
          {
            headers:{
              'Authorization': 'Bearer ' +token,
              'X-localization' : 'ar',
            },
            params:{
              user_id : sessionStorage.getItem('freelancer_id'),
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
      getProductId(product_id) {
        sessionStorage.setItem('product_id', product_id);
      },
    /*
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

  },*/
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
  }

  },
  setup() {
    const center = { lat: 32, lng: 35.25 }
    return { center }
  },
}
</script>
