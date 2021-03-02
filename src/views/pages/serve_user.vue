<template>
  <add_order></add_order>
  <login_section></login_section>
    <div class="wrapper">
        <div class="container">
            <div class="sevice-user">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                        <li class="breadcrumb-item"><a href="#">خدماتنا</a></li>
                        <li class="breadcrumb-item" aria-current="page"><a href="">التصميم الجرافيكي</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ User.name }}</li>
                    </ol>
                </nav>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="img-o-h">
                                <a href=""><span class="chat"><img src="../../assets/img/chat.svg" alt=""></span></a>
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
                                  <div id="carouselExampleControls-4" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                      <div class="carousel-item active">
                                        <div class="row">
                                          <div class="col-lg-3" v-for="(portfolio, index) in Portfolios" :key="index">
                                            <a href=""><img :src="portfolio.image" alt="portfolio"></a>
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
                                        <img src="../../assets/img/map.svg" alt="">
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
                    <img class="card-img-top" src="../../assets/img/product-1.svg" alt="Card image cap">
                    <div class="card-body">
                      <h6 class="card-title">{{product['name']}}</h6>
                      <p class="card-text">{{ product['description'] }}</p>
                      <hr>
                      <ul>
                        <li>بيوت</li>
                        <li>منازل</li>
                        <li>تشطيب</li>
                      </ul>
                      <div class="row">
                        <div class="col-lg-3"></div>
                        <div class="col-lg-6"><span class="count count-pr">{{ product.price }}</span></div>
                        <div class="col-lg-3"></div>
                      </div>
                      <router-link to="/orders">
                        <a class="btn pro-ser-button">أطلب الان</a>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import login_section from "@/components/modals/login-section";
import axios from "axios";
import add_order from "@/components/modals/add_order";

export default {
    name: 'serve_user',
    components:{
      login_section,
      add_order
    },
    mounted() {
        console.log('Component mounted.');
        this.fetchUser();
    },
  data(){
      return{
        User:[],
        Portfolios:[],
        Products:[],
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
      fetchProducts(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/products',
          {
            headers:{
              'Authorization': 'Bearer ' +token,
              'X-localization' : 'ar',
            },
            params:{
              user_id : '1'
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

  }
}
</script>
