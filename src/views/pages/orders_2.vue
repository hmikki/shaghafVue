<template>

    <!-- start wrapper -->
    <div class="wrapper">
        <div class="container">
            <div class="sevice-user orders orders-2 add-orders">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">الطلبات</li>
                    </ol>
                </nav>
                <div class="row justify-content-center">
                    <div class="pro-ser col-3">
                        <!-- start navs section -->
                        <div class="col-lg most-l">
                            <a href="javascript:;" class="active">الطلبات الحالية</a>
                            <a href="javascript:;">الطلبات السابقة</a>
                        </div>
                    </div>
                </div>
                <orders_2_section></orders_2_section>

            </div>
        </div>
    </div>

</template>
<script>
import orders_2_section from "@/components/sections/orders_2/orders_2_section";

export default {
    mounted() {
        console.log('Component mounted.')
    },
    components:{
      orders_2_section,
    }
}
</script>
