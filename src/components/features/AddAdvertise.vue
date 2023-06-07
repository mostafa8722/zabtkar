<template>
   
      <v-card    class="mx-auto d-flex flex-column box-filter mt-5" >

      
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
      this.setBottomNavigationSelectedItem(3);
      this.$router.replace({
        name: "Main",
      });
    },
      onAddToCartClick() {
      if (!this.variant  || !this.color || !this.price ||isNaN(this.price) ) {

        !this.price  && isNaN(this.price) &&  (this.snackbarMessage = "  قیمت  وارد شده  صحیح  نمی باشد");
        !this.size &&  (this.snackbarMessage = "  سایز نمی تواند خالی باشد");
        !this.color &&  (this.snackbarMessage = "  رنگ نمی تواند خالی باشد");
        !this.link &&  (this.snackbarMessage = "  لینک نمی تواند خالی باشد");
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
  height:300px;
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