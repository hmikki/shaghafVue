<template>
  <header_section></header_section>
  <router-view/>
  <footer_section></footer_section>
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

@import "assets/css/bootstrap.min.css";
@import "assets/css/all.min.css";
@import "assets/css/normlaize.css";
@import "https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/css/intlTelInput.css";
@import "https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css";
@import "https://cdn.jsdelivr.net/npm/intl-tel-input@16.0.3/build/css/intlTelInput.css";
@import "assets/css/owl.theme.default.css";
@import "assets/css/style.css";
@import "assets/css/responsive.css";
</style>

<script>
import header_section from "@/components/layouts/header_section";
import footer_section from "@/components/layouts/footer_section";

//const token = ''//sessionStorage.getItem('access_token');
export default {
  components: {
    header_section,
    footer_section
  },
}
</script>