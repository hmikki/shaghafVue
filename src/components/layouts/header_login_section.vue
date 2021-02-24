<template>
    <header>
        <div class="header-1">
            <div class="container">
                <a href=""><i class="fas fa-wifi"></i></a>
                <a href=""><i class="fab fa-youtube"></i></a>
                <a href=""><i class="fab fa-twitter"></i></a>
                <a href=""><i class="fab fa-facebook-f"></i></a>
            </div>
        </div>
        <nav class="navbar navbar-light bg-light">
            <div class="container">
                <div class="row w-100">
                    <div class="col-lg-3 page-logo" onclick="location.href='index.php';">
                        <div class="row login100-pic js-tilt" data-tilt>
                            <div class="col-lg-5">
                                <a href="index.php"><img src="assets/img/logo.svg" alt=""></a>
                            </div>
                            <div class="col-lg-7 padding">
                                <a class="navbar-brand" href="index.php">منصة شغف</a>
                            </div>
                        </div>
                    </div>
                    <form class="form-inline col-lg-5">
                        <div class="row w-100">
                            <input class="form-control mr-sm-2 search-t col-lg" type="search" placeholder="بحث عن خدمة" aria-label="Search">
                            <button class="btn btn-outline my-2 my-sm-0 search-b col-lg-2" type="submit"><i class="fas fa-search"></i></button>
                        </div>
                    </form>
                    <div class="col-lg-4 pl-0 logo-h">
                        <div class="row">
                            <div class="col-2 my-cart">
                            </div>
                            <div class="col-lg-10 l-r">
                                <div class="row">
                                    <div class="nav-item dropdown col-lg-12 pr-0">
                                        <a class="nav-link dropdown-toggle user-name" href="#" id="MyAccount" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img :src="User.avatar" alt="">
                                            <i class="fas fa-chevron-down"></i><span>{{User.name}}</span>
                                        </a>
                                        <div class="dropdown-menu" id="MyAccountDropdown" aria-labelledby="MyAccount">
                                            <a class="dropdown-item" href="#">حسابي</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">خدماتي</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">عملياتي المالية</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="/" @click="logout()">تسجيل خروج</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    </header>
</template>
<script>
export default {
    mounted() {
        console.log('Component mounted.')
    },
    data(){
        return {
            User:[]
        }
    },
    created() {
        this.userDetails();
        this.logout();
    },
    methods:{
        userDetails(){
            axios.get('http://3.124.189.172/api/auth/me',{
                headers:{
                    'Authorization' : 'Bearer $[access_token]'
            })
            .then(res=>{
                this.User = res.data['User'];
                console.log(res.data['User']);
            })
        },
        logout(){
            axios.post('http://3.124.189.172/api/auth/logout',{
                arguments:{
                    headers:{
                        'Authorization' : 'token $[access_token]'
                    }
                }
            })
        }
    }
}
</script>
