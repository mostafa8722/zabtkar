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

        <h3 class="medium-font font-15 justify-center d-flex mt-3"> افزودن کالا به سبد خرید از طریق لینک</h3>
        <div class="filter-header-box mt-3 d-flex mr-2 ml-2">
          <h5 class="regular-font font-11 text-orange" >   کاربر گرامی به دلیل  تنوع بالای برندها ، امکان لیست کردن     </h5>
          <h5 class="regular-font  font-11 mt-2 text-orange" >  همه محصولات در این وبسایت وجود ندارد      </h5>
          <h5 class="regular-font font-11   mt-4 text-orange" >     لطفا جهت سفارش کالای لیست نشده در وبسایت    </h5>
          <h5 class="regular-font font-11  mt-2 text-orange" >          فرم زیر را پر کنید تا به سبدتان اضافه شود.     </h5>
          
        </div>

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
          placeholder="  لینک کالا "
          background-color="white"
          outlined
          v-model="link"
          type="text"
            ></v-text-field>

            <v-text-field
          dense
          v-model="variant"
          class="regular-font mt-3 "
          label=" سایز"
          placeholder="   سایز "
          background-color="white"
          outlined
          type="text"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font mt-3 "
          label=" رنگ"
          placeholder="   رنگ "
          background-color="white"
          outlined
          v-model="color"
          type="text"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font mt-3 "
          label=" قیمت (به لیر)"
          placeholder="   قیمت (به لیر) "
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
  background-color: #878787;
  border-radius: 20px;

  margin-left: 40px!important;

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
  .add-product{
    border-radius: 15px;
  }
 
  </style>