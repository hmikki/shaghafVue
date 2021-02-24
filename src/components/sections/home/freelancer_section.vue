<template>
    <div class="owl-carousel owl-theme">
        <div v-for="freelancer in Freelancers">  <div class="card" onclick="location.href='#';">
                <div class="img-o-h">
                    <div class="order-card-img">
                        <img class="card-img-top" :src="freelancer.avatar" alt="Card image cap" style="border-radius: 50%; min-width: 70px;min-height: 70px">
                    </div>
                </div>
                <div class="card-body">
                    <h4>{{ freelancer.name }}</h4>
                    <p class="card-text">{{freelancer.bio}}</p>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-3 p-0"><span><i class="fas fa-map-marker-alt"></i> {{ freelancer.City.name }}</span></div>
                        <div class="col-lg-2"></div>
                        <div class="col-4 star">
                            <span class="fa fa-star":class="{'checked': freelancer.rate >= '1'}"></span>
                            <span class="fa fa-star":class="{'checked': freelancer.rate >= '2'}"></span>
                            <span class="fa fa-star":class="{'checked': freelancer.rate >= '3'}"></span>
                            <span class="fa fa-star":class="{'checked': freelancer.rate >= '4'}"></span>
                            <span class="fa fa-star":class="{'checked': freelancer.rate >= '5'}"></span>
                        </div>
                    </div>
                </div>
        </div> </div>

                    </div>
</template>
<script>
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
            axios.get('http://3.124.189.172/api/home/get_freelancers', {
                headers:{
                    'X-localization' : 'ar',
                },
                params:{
                    'category_id' : 1,
                },

            })
                .then(res => {
                    this.Freelancers = res.data['Freelancers'];
                    console.log(res.data['Freelancers']);
                });
        }
    }
}
</script>
