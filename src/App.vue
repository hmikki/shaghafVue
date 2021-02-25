<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<style scoped>
@import "assets/css/all.min.css";
@import "assets/css/ltr.css";
@import "assets/css/normlaize.css";
@import "assets/css/owl.theme.default.css";
@import "assets/css/responsive.css";
@import "assets/css/style.css";
@import "assets/css/bootstrap-grid.min.css";
@import "assets/css/bootstrap.min.css";
@import "assets/css/owl.theme.default.css";
@import "assets/css/v4-shims.min.css";
</style>
<script>
export default {
  mounted() {
    console.log('App mounted.');
  },
  data(){
    return{
      User:[],
    }
  },
  created() {
    this.refresh();
  },
  methods:{
    refresh(){
      const token = localStorage.getItem('access_token');
      if(!token){
        console.log('you are guest');
      }

    }
  }
}
</script>

