<template>

</template>
<script>
import axios from "axios";
import most_wanted_section from "@/components/sections/home/most_wanted_section";

export default {

    mounted() {
        console.log('freelancer mounted.');
    },
    data(){
        return{
            Freelancers: [],
        }
    },
    created() {
        this.fetchFreelancer();
    },

    methods:{
      fetchFreelancer(){
        axios.get('http://18.194.157.202/api/home/get_freelancers', {
          headers:{
            'X-localization' : 'ar',
          },
          params:{
            'category_id' : most_wanted_section.data.category_id,
          },

        })
            .then(res => {
              this.Freelancers = res.data['Freelancers'];
              console.log(res.data['Freelancers']);
            });
      },
    }
}
</script>
