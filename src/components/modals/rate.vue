<template>
    <div class="modal fade thanks rate-page" id="rate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body secound-m">
                    <h4 class="vc-m">كيف كان طلبك من الشريك</h4>
                    <p class="vc-m">{{ Order.Freelancer['name'] }}</p>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" v-model="rate" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" v-model="rate" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" v-model="rate" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" v-model="rate" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" v-model="rate" />
                        <label for="star1" title="text">1 star</label>
                    </div>

                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1"><h5>ملاحظات</h5></label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" v-model="review"></textarea>
                        </div>
                    </form>
                    <div class="tab-button">
                        <button type="submit" class="btn" v-on:click.prevent="reviewOrder(); updateOrder(8)">تقييم</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import axios from "axios";
const token= sessionStorage.getItem('access_token');

export default {
  name: 'rate',
    mounted() {
        console.log('Component mounted.')
    },
  data(){
      return{
        Order:[],
        order_id:'1',
        rate:'',
        review:'',
      }
  }
  ,created() {
  },
  methods:{
    reviewOrder(){
        axios.post('http://18.194.157.202/api/orders/review',
            {
                order_id:this.order_id,
                rate:this.rate,
                review:this.review,
            },
        {
          headers: {
            'Authorization': 'Bearer ' + token,
            'X-localization': 'ar'
          },
            }
        )
            .then(res=>{
              if (res.data['status']['status']){
                this.Order = res.data['Order'];
                console.log(res.data['status']['status']);
              }else {
                console.log(res.data['status']['message']);
              }
            })
            .catch(e=>{
              console.log(e);
            });
      },
    updateOrder(order_status){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/orders/update',
          {
            order_id : sessionStorage.getItem('order_id'),
            status : order_status,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            },
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
    }

  }
}
</script>
