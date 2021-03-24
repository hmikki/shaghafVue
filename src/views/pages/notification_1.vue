<template>
  <div class="wrapper">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a><i class="fas fa-home"></i></a></li>
          <li class="breadcrumb-item active" aria-current="page">الاشعارات</li>
        </ol>
      </nav>
      <section class="notification">
        <div class="row">
          <div class="col">
            <h6>{{ Notification.title }}</h6>
            <p>{{ Notification.message }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  mounted() {
    console.log('notification 1 mounted.')
  },
  data(){
    return{
      Notification:[],
    }
  },
  created() {
    this.getNotification();
  },
  methods:{
    getNotification() {
      try {
        const token = sessionStorage.getItem('access_token_1');
        axios.post('http://18.194.157.202/api/notifications/read',
            {
                notification_id : sessionStorage.getItem('notification_id')
            },
            {
              headers:{
                'Authorization' :'Bearer ' +token,
                'X-localization' : 'ar'
              },
            })
            .then(res=>{
              if (res.data['status']['status'] === "success"){
                this.Notification = res.data['Notification'];
              }else {
                console.log();
              }
            })
            .catch(e=>{
              console.log(e);
            })
      }catch (e){
        console.log(e);
      }

    },
  }
}
</script>