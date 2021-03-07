<template>
  <section class="said-about-us" id="said-about-us">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <h5 class="text-right"><span class="text-con"> قالوا عنا </span><span class="text-c"></span></h5>
          <p>عرض بعض مراجعات الزبائن في التعامل من منصة شغف</p>
          <div class="row">
            <div class="col-lg-12 o-h">

              <div class="my-class col-lg-4" style="display: inline-flex">
                <div class="said-cur-p text-center" v-for="(review, index) in Reviews" :key="index">
                  <div class="b-sh">
                    <div class="said-img">
                      <img :src="review['User']['avatar']" alt="" style="max-width: 70px">
                    </div>
                    <h4>{{ review['User']['name'] }}</h4>
                    <p>{{ review['review'] }}</p>
                    <div class="star">
                      <span class="fa fa-star" :class="{'checked': review.rate >=1}"></span>
                      <span class="fa fa-star" :class="{'checked': review.rate >=2}"></span>
                      <span class="fa fa-star" :class="{'checked': review.rate >=3}"></span>
                      <span class="fa fa-star" :class="{'checked': review.rate >=4}"></span>
                      <span class="fa fa-star" :class="{'checked': review.rate >=5}"></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="col-lg-3 login100-pic js-tilt" data-tilt><img class="w-100" src="../../../assets/img/said-about.svg" alt=""></div>
      </div>
    </div>
  </section>
<!--    <section class="said-about-us" id="said-about-us1">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <h5 class="text-right"><span class="text-con"> قالوا عنا </span><span class="text-c"></span></h5>
                    <p>عرض بعض مراجعات الزبائن في التعامل من منصة شغف</p>
                    <div class="row">
                        <div class="col-lg-11 o-h">
                            <div id="carouselExampleControls-3" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="row">
                                            <div class="col-lg-4 text-center" style="margin-bottom: 30px" v-for="(review, index) in Reviews" :key="index">
                                                <div class="b-sh">
                                                    <div class="said-img">
                                                        <img :src="review['User']['avatar']" alt="" style="max-width: 70px">
                                                    </div>
                                                    <h4>{{ review['User']['name'] }}</h4>
                                                    <p>{{ review['review'] }}</p>
                                                    <div class="star">
                                                        <span class="fa fa-star" :class="{'checked' : review.rate >= 1}"></span>
                                                        <span class="fa fa-star" :class="{'checked' : review.rate >= 2}"></span>
                                                        <span class="fa fa-star" :class="{'checked' : review.rate >= 3}"></span>
                                                        <span class="fa fa-star" :class="{'checked' : review.rate >= 4}"></span>
                                                        <span class="fa fa-star" :class="{'checked' : review.rate >= 5}"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <a class="carousel-control-prev" href="#carouselExampleControls-3" role="button" data-slide="prev">
                                <span class="arow-s-l arow-s" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls-3" role="button" data-slide="next">
                                <span class="arow-s-r arow-s" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 login100-pic js-tilt" data-tilt v-tilt><img class="w-100" src="../../../assets/img/said-about.svg" alt=""></div>
            </div>
        </div>
    </section>-->
</template>

<script>
import axios from "axios";

export default {
    mounted() {
        console.log('Reviews mounted')
    },
    data(){
        return {
            Reviews:[],
        }
    },
    created() {
      this.fetchReviews();
    },
    methods:{
        fetchReviews(){
            axios.get('http://18.194.157.202/api/home/get_reviews',
                {
                  headers:{
                    'X-localization' : 'ar',
                  },
                  params:{
                    per_page: 4
                  }
                })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Reviews = res.data['Reviews'];
              console.log(res.data['status']['status']);
              console.log(res.data['Reviews']);
            }else {
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
