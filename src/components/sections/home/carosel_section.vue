<template>
    <div class="first-s">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="container">
                <div class="carousel-inner">
                    <div class="carousel-item"  v-for="(Adv,index) in Advs" :class="{'active': index === 0}" >
                        <img class="d-block w-100" :src="Adv.image" alt="First slide">
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="arow-s-l arow-s" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="arow-s-r arow-s" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
                <span class="sr-only">Next</span>
            </a>
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleControls" v-for="(Adv,index) in Advs" :class="{'active': index === 0}" :data-slide-to="index"></li>
            </ol>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        console.log('carousel mounted.');
    },
    data() {
        return {
                Advs :[],
            }
        },
    created() {
        this.fetchAdvertisment();
    },
    methods : {
        fetchAdvertisment(){
            axios.get('http://3.124.189.172/api/home/advertisements')
            .then(res => {
                this.Advs = res.data['Advertisements'];
                console.log(res.data['Advertisements'])
            });
        },
    },
};

</script>
