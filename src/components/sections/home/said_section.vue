<template>
  <section class="said-about-us" id="said-about-us">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <h5 class="text-right"><span class="text-con"> قالوا عنا </span><span class="text-c"></span></h5>
          <p>عرض بعض مراجعات الزبائن في التعامل من منصة شغف</p>
          <div class="row">

            <div class="col-lg-12 o-h">
              <carousel :items-to-show="4" :wrapAround="true" :snapAlign="start" :initialSlide="0">
                <slide v-for="(review, index) in Reviews" :key="index">
                  <div class="said-cur-p text-center">
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
                </slide>
                <template #addons>
                  <navigation />
                  <pagination />
                </template>
              </carousel>
            </div>

          </div>
        </div>
        <div class="col-lg-3 login100-pic" v-tilt><img class="w-100" src="../../../assets/img/said-about.svg" alt=""></div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
    mounted() {
        console.log('Reviews mounted')
    },
  components:{
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
