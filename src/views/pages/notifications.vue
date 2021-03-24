<template>
  <div class="wrapper">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a><i class="fas fa-home"></i></a></li>
          <li class="breadcrumb-item active" aria-current="page">اشعاراتي</li>
        </ol>
      </nav>
      <section class="notifications">
        <div class="row">
          <div class="col-lg-5">
              <a id="notify" v-for="(notification, index) in Notifications" :key="index"
              v-on:click.prevent="getNotificationId(notification.id)">
                <router-link to="/notification_1">
                <div class="alert alert-success" role="alert">
                  <span id="title"> <i class="fas fa-exclamation-circle alert-icon"></i>&nbsp;{{ notification.title }}  </span>
                  <p id="messages"> {{ notification.message }} </p>
                  <span class="mb-0" id="read_at"> {{notification.read_at}} </span>
                </div>
                </router-link>
              </a>
          </div>
          <div class="col-lg-2"></div>
          </div>
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button type="button" class="page-link" v-if="page !== 1" @click="page--"> Previous </button>
                </li>
                <li class="page-item">
                  <button type="button" class="page-link" v-for="(pageNumber, index) in pages.slice(page-1, page+5)" :key="index" @click="page = pageNumber"> {{pageNumber}} </button>
                </li>
                <li class="page-item">
                  <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-lg-4"></div>
        </div>

      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    console.log('notification mounted.')
  },
  components:{
  },
  data(){
    return{
      Notifications:[],
      page: 1,
      perPage: 3,
      pages: [],
    }
  },
  created() {
    this.getNotification();
  },
  methods:{
    getNotification() {
      try {
        const token = sessionStorage.getItem('access_token_1');
        axios.get('http://18.194.157.202/api/notifications',
            {
              headers:{
                'Authorization' :'Bearer ' +token,
                'X-localization' : 'ar'
              },
            })
            .then(res=>{
              if (res.data['status']['status'] === "success"){
                this.Notifications = res.data['Notifications'];
                console.log(res.data['Notifications']);
              }else {
                console.log(res.data['status']['status']);
              }
            })
            .catch(e=>{
              console.log(e);
            })
      }catch (e){
        console.log(e);
      }
    },
    getNotificationId(notification_id){
      sessionStorage.setItem('notification_id', notification_id);
    },
    setPages () {
      let numberOfPages = Math.ceil(this.Notifications.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (Notifications) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  Notifications.slice(from, to);
    },
  },
  computed: {
    displayedPosts () {
      return this.paginate(this.Notifications);
    }
  },
  watch: {
    Notifications () {
      this.setPages();
    }
  },
  filters: {
    trimWords(value){
      return value.split(" ").splice(0,20).join(" ") + '...';
    }
  }
  }

</script>
<style>
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 14px;
  color: black;
  font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;
}
</style>