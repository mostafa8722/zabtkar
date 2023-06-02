<template>
      <v-card   title="This is a title" class="mx-auto d-flex flex-column box-filter mt-5" >

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
          type="email"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font mt-3 "
          label=" سایز"
          placeholder="   سایز "
          background-color="white"
          outlined
          type="email"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font mt-3 "
          label=" رنگ"
          placeholder="   رنگ "
          background-color="white"
          outlined
          type="email"
            ></v-text-field>

            <v-text-field
          dense
          class="regular-font mt-3 "
          label=" قیمت (به لیر)"
          placeholder="   قیمت (به لیر) "
          background-color="white"
          outlined
          type="email"
            ></v-text-field>

        </div>

        <v-btn class=" regular-font mt-auto mt-2  mb-4 mr-5 ml-5 white--text"   height="50" variant='text' color="#FD562E" >افزودن به سبد</v-btn>
    
        
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
      }
    },
    methods: {
      ...mapActions("price", ["convertLirToToman"]),
      ...mapActions('bookmark', ['addBookmark', 'deleteBookmark']),
      onProductItemClick() {
        this.$emit('select')
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