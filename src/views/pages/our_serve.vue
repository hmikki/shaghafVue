<template>
  <login_section></login_section>
    <div class="wrapper">
        <div class="container">
            <div class="our-services">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                        <li class="breadcrumb-item"><a href="#">خدماتنا</a></li>
                        <li class="breadcrumb-item active" aria-current="page">التصميم الجرافيكي</li>
                    </ol>
                </nav>
                <div class="col-lg most-l">
                    <a href="javascript:;" v-on:click.prevent="fetchAllFreelancers()" class="active">الكل</a>
                    <a href="javascript:;" v-for="(category, index) in Categories" :key="index" v-on:click.prevent="category_id = category.id; fetchFreelancers()">
                      {{ category.name }}
                    </a>
                </div>

              <div class="cards">
                <div class="row">
                  <div class="col-lg-3" v-for="(freelancer, index) in Freelancers" :key="index">
                    <router-link v-on:click="getFreelancerId(freelancer.id)" to="/Freelancer_page">
                    <div class="card">
                      <div class="img-o-h">
                        <div class="order-card-img">
                          <img class="card-img-top" :src="freelancer.avatar" alt="Card image cap" style="width: 70px; height: 70px">
                        </div>
                      </div>
                      <div class="card-body">
                        <h4>{{ freelancer.name }}</h4>
                        <p class="card-text">{{ freelancer.bio }}</p>
                      </div>
                      <div class="card-footer">
                        <div class="row">
                          <div class="col-3 p-0"><span><i class="fas fa-map-marker-alt"></i>{{freelancer.City['name'] }}</span></div>
                          <div class="col-lg-2"></div>
                          <div class="col-4 star">
                            <span class="fa fa-star" :class="{'checked': freelancer.rate >= 1}"></span>
                            <span class="fa fa-star" :class="{'checked': freelancer.rate >= 2}"></span>
                            <span class="fa fa-star" :class="{'checked': freelancer.rate >= 3}"></span>
                            <span class="fa fa-star" :class="{'checked': freelancer.rate >= 4}"></span>
                            <span class="fa fa-star" :class="{'checked': freelancer.rate >= 5}"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </router-link>
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

export default {
    name:'our_serve',
    mounted() {
        console.log('Component mounted.')
    },
  components:{
    login_section,
  },
  data(){
      return{
        Categories: {
          SubCategories:[],
        },
        category_id: sessionStorage.getItem('category_id'),
        Freelancers:[],
      }
  },
  created() {
      this.fetchServices();
      this.fetchAllFreelancers();
  },
  methods:{
    fetchServices(){
      axios.get('http://18.194.157.202/api/home/categories',
          {
            headers:{
              'X-localization':'ar',
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Categories = res.data['Categories'];
              console.log(res.data['Categories']);
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },

    fetchFreelancers(){
      axios.get('http://18.194.157.202/api/home/get_freelancers',
          {
            headers:{
              'X-localization':'ar',
            },
            params:{
              'category_id' : this.category_id,
            },
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Freelancers = res.data['Freelancers'];
              console.log(res.data['Freelancers']);
            }else {
              console.log(res.data['Freelancers']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
    fetchAllFreelancers(){
      axios.get('http://18.194.157.202/api/home/get_freelancers', {
        headers:{
          'X-localization' : 'ar',
        },
      },)
          .then(res => {
            if (res.data['status']['status'] === "success"){
              this.Freelancers = res.data['Freelancers'];
              console.log(res.data['Freelancers']);
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
    getFreelancerId(freelancer_id){
      sessionStorage.setItem('freelancer_id', freelancer_id);
    }
  }
}
</script>
