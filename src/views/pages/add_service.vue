<template>
    <!-- start wrapper -->
    <div class="wrapper">
        <div class="container">
            <div class="sevice-user orders add-orders">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">خدماتي</li>
                    </ol>
                </nav>
                <div class="row justify-content-end">
                    <div class="add-serv col-lg-2">
                        <button type="submit" class="btn" data-toggle="modal" data-target="#exampleModalCenter-9" aria-label="Close" data-dismiss="modal"><i class="fas fa-plus-circle"></i> إضافة خدمة</button>
                    </div>
                </div>
                <services></services>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    mounted() {
        console.log('Component mounted.')
    }
}
</script>
