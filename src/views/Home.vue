<template>
  <div>
     <v-dialog
      v-model="openAdd"
      v-if="$vuetify.breakpoint.width <= 600" 
      overlay-opacity="0.9" 
    >
    <AddProduct/>
      </v-dialog>
    
    <GroupList />
    <div v-if="isLoading || brandsLoading" class="mt-3 d-flex flex-row   ">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
    </div>
   
  

    <v-row dense class="d-flex mr-3 ml-3 ">
     
      <v-col
        
        
      v-if="$vuetify.breakpoint.width > 600"
        
        cols="2"
       
      >
        <v-responsive  class="p-sticky-0">
          <AddAdvertise />
        
        </v-responsive>
      </v-col>
      <v-col
        
        
      :cols="$vuetify.breakpoint.width > 600?8:12"
       
      >
        <v-responsive >
         
          <BrandList />

        
        </v-responsive>
      </v-col>

      <v-col
        
        
      v-if="$vuetify.breakpoint.width > 600"
        
        cols="2"
       
      >
        <v-responsive  class="p-sticky-0">
          <AddProduct />
        
        </v-responsive>
      </v-col>
    </v-row>
   
      <BottomNavigation/>
  
   
    <div class="contact-us d-none d-sm-flex flex-column">
      <a href="https://wa.me/989361513383" target="_blank" class="d-flex flex-row" style="gap: 1rem">
        <v-img src="@/assets/whatsapp.png" width="50px" height="50px" ></v-img>
        <p class="medium-font my-auto mx-auto">واتس آپ</p>
      </a>
      <a href="http://instagram.com/_u/paloot.onlineshop/" target="_blank" class="d-flex flex-row" style="gap: 1rem; margin-right: 10px">
        <img src="@/assets/instagram.png" />
        <p class="medium-font my-auto mx-auto">اینستاگرام</p>
      </a>
    </div>
    <div class="d-flex mr-3 flex-column  d-sm-none contact-us__icon d-block" v-if="$vuetify.breakpoint.width <= 600"   >
   
    <v-btn
    @click="showFilter"
    class="mdi--link"
     size="small" icon="mdi-link-variant"
    >
      <v-icon  class="black--text "
    
                >mdi-link-variant</v-icon
              >
    </v-btn>
    <a href="https://wa.me/989361513383" target="_blank" class=" d-block d-sm-none">
      <v-img src="@/assets/whatsapp.png" width="50px" height="50px"></v-img>
    </a>
    <a href="http://instagram.com/_u/paloot.onlineshop/" target="_blank" class=" d-block d-sm-none">
      <v-img src="@/assets/instagram.png" class="br-50" width="35px" height="35px"></v-img>
    </a>
    
   </div>

  </div>
</template>

<script>
import HomeHeader from '../components/home/HomeHeader'
import GroupList from '../components/home/groups/GroupList'
import BrandList from '../components/home/brands/BrandList'
import ProductList from '../components/home/products/ProductList'
import FilterSection from '../components/features/Filters'
import AddProduct from '../components/features/AddProduct'
import AddAdvertise from '../components/features/AddAdvertise'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BottomNavigation from '@/components/BottomNavigation.vue'

export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    GroupList,
    BrandList,
    ProductList,
    FilterSection,
    AddProduct,
    AddAdvertise,
    BottomNavigation
},
data(){
return {
  openAdd : false,
}
},


  methods: {
    ...mapMutations('home', ['updateShowProducts']),
    ...mapActions('home', ['fetchProductsByBrandId', 'fetchProductsByGroupId']),
    handleBackButton() {
      if (!this.$route.query.brand || this.$route.query.group) {
        if (this.showProducts) {
          this.updateShowProducts(false)
        } 
      }
    },
    showFilter(){
      this.openAdd = true
       },
       setSelectedBottomNavigationItem(value) {
      this.$store.dispatch("setBottomNavigationSelectedItem", value);
      if (value == 4) {
        this.$router.replace({
        name: "Main",
        query: {
          
        },
      });
        this.$store.commit("home/updateShowProducts", false);
        this.$store.commit("home/updateShowSearchedBrands", false);
      }
    },
  },
  computed: {
    ...mapGetters('home', ['isLoading', 'showProducts', 'brandsLoading'])
  },
  mounted() {
  
    if (this.$route.query.brand) {
      this.fetchProductsByBrandId(this.$route.query.brand)
    }

    if (this.$route.query.cart) {
      this.setSelectedBottomNavigationItem(3)
    }
    else if (this.$route.query.favorite) {
      this.setSelectedBottomNavigationItem(2)
    }else if (this.$route.query.profile && this.$vuetify.breakpoint.width<=600 ) {
      this.setSelectedBottomNavigationItem(1)
    }else {
      this.setSelectedBottomNavigationItem(4)
    }

    if(this.$route.query.myaddress){
      this.$store.commit("profile/updateSelectedMenuItem", 2);
    }else if(this.$route.query.myorders){
      this.$store.commit("profile/updateSelectedMenuItem", 3);
    }else if(this.$route.query.rules){
      this.$store.commit("profile/updateSelectedMenuItem", 4);
    }else if(this.$route.query.contact){
      this.$store.commit("profile/updateSelectedMenuItem", 5);
    }
  },
  created() {

    //window.addEventListener('scroll', this.onScroll);
    window.addEventListener('popstate', this.handleBackButton)
  },
  destroyed() {
    window.removeEventListener('popstate', this.handleBackButton)
  },
}
</script>

<style scoped>
.contact-us {
  background-color: white;
  position: fixed;
  left: 0;
  bottom: 20px;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-decoration: none;
}

.contact-us:hover {
  cursor: pointer;
}

.contact-us p {
  color: var(--primary-color);
  text-decoration: none;
}

.contact-us__icon {
  position: fixed;
  left: -5px;
  bottom: 80px;
  padding: 0;
  align-items: center;
}

.contact-us__icon:hover {
  cursor: pointer;
}

img {
  background-blend-mode: multiply;
  background-color: transparent;
  width: 30px;
  height: 30px;
}

.back-btn {
  position: absolute;
  left: 20px;
  top: 130px;
}

.mdi--link{
  background-color: blue;
  border-radius: 50%;
  padding:5px;
  margin-top:5px;
  width: 35px;
  height: 35px;
}
.p-sticky-0{
    position: sticky;
    top:0px;
  }
  .br-50{
    border-radius: 50%;
  }
</style>