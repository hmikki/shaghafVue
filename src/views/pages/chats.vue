<template>
  <div class="wrapper">
    <div class="container">
      <section class="chats">
        <div class="row">
          <div class="col-lg-4">
            <div class="chat-r">
              <div v-for="(room,index) in Rooms" :key="index" class="col-lg-12 chat-cur" v-on:click.prevent="openChat(); room_id = room.id; user_id = room.User.id">
                <div class="row">
                  <div class="col-lg-3">
                    <img class="b-r-half" :src="room.User['avatar']" alt="">
                  </div>
                  <div class="col-lg-9 chat-p">
                    <h4>{{ room.User['name'] }}</h4>
                    <p>{{ room.latest_message }}</p>
                  </div>

                </div>
                <hr>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="chat-l">
              <div class="row">
                <div class="col-lg-12 chat-cur pb-5" onclick="location.href='#';">
                  <div class="row">
                    <div class="col-lg-10 mr-5 chat-p">
                      <img class="col-lg-2 b-r-half" :src="chatRoom['User']['avatar']" alt="avatar">
                      <h4>{{ chatRoom['User']['name'] }}</h4>
                    </div>
                  </div>
                  <hr class="ml-0 mr-0">
                </div>
                <div class="col-lg-12">
                  <div class="col-lg-12" v-for="(message, index) in Messages" :key="index" :class="{'l-litter' :message.user_id === user_id , 'm-litter' : message.user_id !== user_id}">
                    <div class="col-lg-6 mb-3 ml-auto">
                      <p v-show="message.type === 1" class=" ch-messsage">{{message.message}}</p>
                      <img v-show="message.type === 3" :src="'http://18.194.157.202/'+ message.message" >
                      <audio controls v-show="message.type === 2">
                        <source :src="'http://18.194.157.202/' + message.message" type="audio/mpeg">
                        Your browser does not support the audio element.
                      </audio>
                      <p class="ch-messsage" v-show="message.type === 4">
                        <a :href="'http://18.194.157.202/'+message.message" :src="'http://18.194.157.202/'+message.message" style="overflow-wrap: anywhere">
                          {{ message.message }}</a>
                      </p>
                      <span>{{ message.created_at }}</span>
                    </div>

                  </div>
                </div>
              </div>
              <hr class="ml-0 mr-0">
              <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 d-flex-chat p-0 chat-button" v-on:click.prevent="sendMessage()">
                  <button type="submit">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
                <div class="col-lg-7 p-0">
                  <form>
                    <div class="write-m-chat">
                      <label style="display:none" for="exampleFormControlTextarea1"></label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="كتابة رسالة" v-model="message" :v-modal="type = 1"></textarea>
                    </div>
                  </form>
                </div>
                <div class="col-lg-1 d-flex-chat upload-voice">
                  <a href="" v-on:mouseup="sendMessage()" :v-model="type = 2">
                    <i class="fas fa-microphone">
                      <input type="file" accept="audio/*" capture>
                    </i>
                  </a>
                </div>
                <div class="col-lg-1 d-flex-chat chat-upload-img">
                  <form v-on:submit.prevent="sendMessage()">
                    <div class="image-upload">
                      <label for="file-input">
                        <i class="fas fa-images"></i>
                      </label>
                      <input id="file-input" type="file" :v-model="type === 4" />
                    </div>
                  </form>
                </div>
                <div class="col-lg-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name : 'chats',
  mounted() {
    console.log('chat mounted.');
  },
  data(){
    return{
      Rooms:[],
      Messages:[],
      user_id: 1,
      chatRoom:[],
      room_id: 1,
      message:'',
      type : 1,
    }
  },
  created() {
    this.fetchRooms();
    this.fetchMessages();
    this.openChat();
  },
  methods:{
    fetchRooms(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/chats/rooms',
          {
            headers:{
              'Authorization': 'Bearer ' +token,
              'X-localization': 'ar',
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          this.Rooms = res.data['ChatRooms'];
          console.log(res.data['ChatRooms']);
          console.log(res.data['status']['status']);
        }else {
          console.log(res.data['status']['status']);
        }
      })
      .catch(e=>{
        console.log(e);
      })
    },
    openChat(){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/chats/rooms/create',
          {
            user_id : this.user_id,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' :'ar',
            }
          })
      .then(res=>{
          if (res.data['status']['status'] === "success"){
            this.chatRoom = res.data['ChatRoom'];
            const chat_user_id = res.data['ChatRoom']['User']['id'];
            console.log(chat_user_id);
            sessionStorage.setItem('chat_user_id' , chat_user_id);
            console.log(res.data['ChatRoom']);
            console.log(res.data['status']['status']);
          }else {
            console.log(res.data['status']['status']);
          }
      })
      .catch(e=>{
        console.log(e);
      })
    },
    fetchMessages(){
      console.log(this.room_id);
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/chats/rooms/messages',
          {
            headers:{
              'Authorization': 'Bearer ' +token,
              'X-localization': 'ar',
            },
            params:{
              chat_room_id: this.room_id,
            }
          })
          .then(res=>{
            if (res.data['status']['status'] === "success"){
              this.Messages = res.data['ChatRoomMessages'];
              console.log(res.data['ChatRoomMessages']);
              console.log(res.data['status']['status']);
            }else {
              console.log(res.data['status']['status']);
            }
          })
          .catch(e=>{
            console.log(e);
          })
    },
    sendMessage(){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/chats/rooms/messages/create',
          {
            chat_room_id: this.room_id,
            type: this.type,
            message: this.message,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          console.log(res.data['status']['status']);
        }else {
          console.log(res.data['status']['status']);
        }
      })
      .catch(e=>{
        console.log(e);
      })
    },
      }
}
</script>