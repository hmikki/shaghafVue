<template>
    <section class="our-serve" id="our-serve">
        <div class="test login100-pic js-tilt" data-tilt>
            <img src="src/assets/img/test.svg" alt="">
        </div>
        <div class="container">
            <h5 class="text-right"><span class="text-con"> خدماتنا </span><span class="text-c"></span></h5>
            <div class="row">
                <div class="col-lg-3 login100-pic js-tilt" data-tilt v-for="(Category, index) in Categories" :key="index">
                  <router-link to="/our_serve">

                    <div class="service">
                        <img v-bind:src="Category.image" alt="" style="width: 80%">
                        <p>{{Category.name}}</p>
                    </div>
                  </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: 'Categories',
    mounted() {
        console.log('Services mounted')
    },
    data() {
        return {
            Categories : [],
        }
    },
    created() {
        this.fetchCategories();
    },
    methods : {
        fetchCategories(){
            axios.get('http://18.194.157.202/api/home/categories',{
                headers:{
                    'X-localization':'ar',
                }
            })
                .then(res => {
                  if (res.data['status']['status'] === "success"){
                    this.Categories = res.data['Categories'];
                    console.log(res.data['Categories']);
                  }else {
                   console.log(res.data['status']['status']);
                  }
                });
        },
    },
}
</script>
