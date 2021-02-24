<template>
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
                    <a href="javascript:;" class="active">الكل</a>
                    <a href="javascript:;">التصميم الجرافيكي</a>
                    <a href="javascript:;">الموشن جرافيك</a>
                    <a href="javascript:;">الترجمة</a>
                    <a href="javascript:;">التعليق الصوتي</a>
                </div>

                <cards></cards>
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
