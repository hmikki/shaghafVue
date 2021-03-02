<template>
  <edit_order></edit_order>
    <div class="row">
        <div class="col-lg-3" v-for="(product,index) in Products" :key="index">
          <span class="hidden" :v-model="product_id = product.id"></span>
            <div class="card pro-ser-card">
                <img class="card-img-top" src="../../../assets/img/product-1.svg" alt="Card image cap">
                <div class="card-body">
                    <h6 class="card-title">{{ product['name'] }}</h6>
                    <p class="card-text">{{ product['description'] }}</p>
                    <hr>
                    <ul>
                        <li>بيوت</li>
                        <li>منازل</li>
                        <li>تشطيب</li>
                    </ul>
                    <div class="row">
                        <div class="col-lg-12"><span class="count count-pr">{{ product.price }}</span></div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <button type="submit" class="btn" data-toggle="modal" data-target="#exampleModalCenter-10" aria-label="Close" data-dismiss="modal"><i class="fas fa-pen" ></i> تعديل </button>
                        </div>
                        <div class="col-lg-6">
                            <button type="submit" class="btn no-bg" data-toggle="modal" data-target="#exampleModalCenter-11" aria-label="Close" data-dismiss="modal"><i class="far fa-trash-alt"></i> حذف </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- modal -->
  <div class="modal fade add-o" id="exampleModalCenter-11" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-header">
          <p>حذف</p>
        </div>
        <div class="modal-body secound-m">
          هل أنت متأكد من عملية الحذف؟
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">اغلاق</button>
          <button type="button" class="btn btn-danger" v-on:click.prevent="deleteService()">حذف</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import edit_order from "@/components/modals/edit_order.vue";
import jquery from 'jquery';
let $ = jquery;

export default {
    name:'services',
    mounted() {
        console.log('Component mounted.')
    },
  components:{
    edit_order,
  },
  data(){
    return{
      Products:[],
      product_id:'',
    }
  },
  created() {
      this.fetchServices();
  },
  methods:{
    fetchServices(){
      const token = sessionStorage.getItem('access_token_1');
      axios.get('http://18.194.157.202/api/products',
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            },
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          this.Products = res.data['Products'];
          console.log(res.data['Products']);
          console.log(res.data['status']['status']);
        }else {
          console.log(res.data['status']['status']);
        }
      })
      .catch(e=>{
        console.log(e);
      })
    },
    deleteService(){
      const token = sessionStorage.getItem('access_token_1');
      axios.post('http://18.194.157.202/api/products/destroy',
          {
            product_id:this.product_id,
          },
          {
            headers:{
              'Authorization' : 'Bearer ' +token,
              'X-localization' : 'ar',
            }
          })
      .then(res=>{
        if (res.data['status']['status'] === "success"){
          console.log(res.data['status']['message']);
          $('#exampleModalCenter-11').modal('hide');
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
