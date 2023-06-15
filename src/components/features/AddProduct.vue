<template>
   
      <v-card    class="mx-auto d-flex flex-column box-filter mt-5" >

        <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      class="bold-font pa-3"
      dir="rtl"
      top
    >
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-if="snackbarButton"
          class="mx-3"
          color="primary"
          @click="viewCart"
          v-bind="attrs"
        >
          برو به سبد
        </v-btn>
      </template>
    </v-snackbar>

        <h3 class="medium-font font-15 justify-center d-flex mt-3"
        :data-tooltip="content"
        
        > افزودن کالا لیست نشده به سایت </h3>
       

        <div class="line-divider mt-4"></div>
    
        <v-card-title class="line-clamp-5">
          <div class="product-item-title__wrapper">
  
           
          </div>
        </v-card-title>

        <div class="d-flex flex-column  mr-2 ml-2">
          <v-text-field
          dense
          class="regular-font mt-3 "
          label="لینک کالا"
        
          background-color="white"
          outlined
          v-model="link"
          type="text"
            ></v-text-field>

            <v-text-field
          dense
          v-model="variant"
          class="regular-font  "
          label=" سایز"
        
          background-color="white"
          outlined
          type="text"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font  "
          label=" رنگ"
        
          background-color="white"
          outlined
          v-model="color"
          type="text"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font  "
          label=" قیمت (به لیر)"
   
          background-color="white"
          outlined
          v-model="price"
          type="text"
            ></v-text-field>

        </div>

        <v-btn 
        @click.prevent = "onAddToCartClick"
        class=" regular-font mt-auto mt-2  mb-4 mr-5 ml-5 white--text add-product"   height="50" variant='text' color="#FD562E" >افزودن به سبد</v-btn>
    
        
      </v-card>
  </template>
  
  
  <script>

 // import Price from '@/components/base/Price.vue'
  import { mapActions, mapGetters } from "vuex";
  var tooltip = require('tooltip')
 

var config  = {
  showDelay: 100,
  style: {
    padding: 5,
    color:'#FD562E',
    left:"0px",
    fontFamily: 'Regular',
    backgroundColor: "#FFE5C6",
    position:"absolute",
    with:"200",
    height:"auto",
    zIndex:1000,
    direction:"rtl"
  }
}
tooltip(config)
  
  export default {
    name: "Filter",
    emits: ['select'],
    props: {
      product: {
        type: Object,
        default: null,
        require: true,
      },
    },
    components: {
    
    },
    data() {
      return {
        isActive: false,
        showOriginalName: true,
        showLirPrice: true,
        price :'',
        color:'',
        link :"",
        variant:'',
        snackbar: false,
      snackbarMessage: "",
      snackbarButton: false,
      snackbarTimeout: 2000,
      content : " کاربر گرامی به دلیل  تنوع بالای برندها ، امکان لیست کردن"+" "
      +"همه محصولات در این وبسایت وجود ندارد"
      +" لطفا جهت سفارش کالای لیست نشده در وبسایت"+" "
      +"فرم زیر را پر کنید تا به سبدتان اضافه شود"
      }
    
    },
    methods: {
      ...mapActions("price", ["convertLirToToman"]),
      ...mapActions(["setBottomNavigationSelectedItem"]),
      ...mapActions('bookmark', ['addBookmark', 'deleteBookmark']),
      ...mapActions("cart", [
      "addToCartExternal",
      "incrementItemCount",
      "decrementItemCount",
      "removeItemFromCart",
    ]),
      onProductItemClick() {
        this.$emit('select')
      },
      viewCart() {
        
        let  query = {
          cart : "insert"
        };
      this.$router.push({
        path: "/",
        query 
      });
      this.$store.dispatch("setBottomNavigationSelectedItem", 3);

    },
    isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
},
      onAddToCartClick() {

        
      if (!this.variant  || !this.color || !this.price ||isNaN(this.price) || !this.isValidUrl(this.link) ) {

        !this.price  && isNaN(this.price) &&  (this.snackbarMessage = "  قیمت  وارد شده  صحیح  نمی باشد");
        !this.variant &&  (this.snackbarMessage = "  سایز نمی تواند خالی باشد");
        !this.color &&  (this.snackbarMessage = "  رنگ نمی تواند خالی باشد");
         !this.isValidUrl(this.link)  &&  (this.snackbarMessage = " لینک وارد شده معتبر نمی باشد");
        this.snackbar = true;
        this.snackbarTimeout = 3000;
        this.snackbarButton = false;
        return;
      }

      this.addToCartExternal({
        price: this.price,
        color : this.color,
        variant: this.variant,
        link : this.link
      });
      this.snackbar = true;
      this.snackbarMessage = "محصول به سبد خرید اضافه شد";
      this.snackbarTimeout = 15000;
      this.snackbarButton = true;
    },
  
    },
    computed: {
      ...mapGetters("price", ["getMultiplier"]),
      ...mapGetters('bookmark', ['isBookmarked']),
  
      getTitle() {
        this.setShowOriginalName(this.hasOriginalName)
        if (this.hasOriginalName) {
          return this.product.originalName
        } else {
          return this.product.name
        }
      },
  
     
    },
  };
  </script>
  
  <style lang="scss" scoped>

.box-filter{
  background-color: #fff;
  
padding: 5px;
  margin-left: 30px!important;

}
  .filter-header-box {
    background-color: #FFE5C6;
    border-radius: 30px;
    padding: 10px 10px;
    flex-direction: column;
    align-items: center;

    
  }
  .flex-col{
    flex-direction: column;
  }
  .line-divider{
    background-color: #FD562E;
    height: 2px;
  }
  .text-orange {
    color:#FD562E;
  }
  .font-11{
    font-size: 11px;
  }
  .font-15{
    font-size: 15px;
  }

 
  </style>