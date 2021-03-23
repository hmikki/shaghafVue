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
                  <span> <i class="fas fa-exclamation-circle alert-icon"></i>&nbsp; {{ notification.title }} </span>
                  <p>{{ notification.message }}</p>
                  <span class="mb-0">{{ notification.read_at }}</span>
                </div>
                </router-link>
              </a>
          </div>
          <div class="col-lg-2"></div>
        </div>
        <div class="overflow-auto">
          <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
          ></b-pagination>

          <p class="mt-3">Current Page: {{ currentPage }}</p>

          <b-table
              id="my-table"
              :Notifications="Notifications"
              :per-page="perPage"
              :current-page="currentPage"
              small
          ></b-table>
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
      perPage: 10,
      currentPage: 1,
    }
  },
  computed: {
    rows() {
      return this.Notifications.length
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
  }
}
</script>