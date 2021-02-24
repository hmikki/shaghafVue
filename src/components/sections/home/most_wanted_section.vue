<template>
    <section class="most-wanted" id="most-wanted">
        <div class="shape">
            <div class="co-p">
                <div class="m-w-top container">
                    <div class="row">
                        <div class="col-lg-4">
                            <h5 class="text-right"><span class="text-con"> الاكثر طلبا </span><span class="text-c-y"></span></h5>
                        </div>

                        <div class="col-lg most-l">
                            <a href="javascript:;" class="active">الكل</a>
                            <a href="javascript:;" v-for="(category,index) in Categories">{{ category.name }}</a>
                        </div>
                    </div>
                </div>
                <!-- Set up your HTML -->
                <div class="container">
                    <freelancer_section></freelancer_section>

                </div>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        console.log('most wanted.')
    },
    data(){
        return{
            Categories: {
                category_id:'',
            },
            City:[],

        }
    },
    created() {
        this.fetchCategories();
    },
    methods:{
        fetchCategories(){
            axios.get('http://3.124.189.172/api/home/categories',{
                headers:{
                    'X-localization' : 'ar',
                }
            })
                .then(res => {
                    this.Categories = res.data['Categories'];
                    console.log(res.data['Categories']);
                });
        },
    }

}
</script>
