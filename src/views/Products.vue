<template>
  <div>
 
    <AppBarVue  />
   
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
        
        cols="3"
       
      >
        <v-responsive class="p-sticky-0">
          <FilterSection />
        
        </v-responsive>
      </v-col>

      <v-col
        
        
        :cols="$vuetify.breakpoint.width > 600?6:12"
       
      >
        <v-responsive min-height="130px" class="fill-height">
         
        
          <ProductList />
        </v-responsive>
      </v-col>

      <v-col
      v-if="$vuetify.breakpoint.width > 600"
        
        cols="3"
       
      >
        <v-responsive class="p-sticky-0" >
          <AddProduct />
        
        </v-responsive>
      </v-col>
    </v-row>
   
    <div v-if="isLoading" class="mt-3 d-flex flex-row   ">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
    </div>
      <v-dialog
      v-model="openFilter"
      overlay-opacity="0.9"
      v-if="$vuetify.breakpoint.width <= 600" 
      
    >
    <FilterSection/>
      </v-dialog>

      <v-dialog
      overlay-opacity="0.9"
      v-model="openAdd"
      v-if="$vuetify.breakpoint.width <= 600" 
      
    >
    <AddProduct/>
      </v-dialog>
      

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
    @click="showFilter('filter')"
    size="small"
    icon="mdi-filter"
    class="mdi--filter"
    >
      <v-icon class="black-text"
     
                >
                mdi-filter-outline
                </v-icon
              >
    </v-btn>
    <v-btn
    @click="showFilter('add')"
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
import AppBarVue from '../components/AppBar'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'products',
  components: {
    HomeHeader,
    GroupList,
    BrandList,
    ProductList,
    FilterSection,
    AddProduct,AppBarVue
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
    showFilter(type){
        this.openAdd = false;
        this.openFilter = false;

        type==="filter" ? this.openFilter = true : this.openAdd = true ;
       
      
      
    },
    onScroll() {


      if(!this.isLoading){
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.9;
      if (bottomOfWindow) {
        this.from += this.count ;
         
      const data = {
        group :  this.$route.query.group?this.$route.query.group:1,
        from:this.from,
        count : this.count
      }
      this.fetchProductsByGroupId(data);
      }
    }
    }
  },
  computed: {
    ...mapGetters('home', ['isLoading', 'showProducts', 'brandsLoading',"searchQuery"]),
    
  },
  data() {
      return {
        openAdd: false,
        openFilter: false,
        pagination :1,
        from : 0,
        count : 15,
       
     
      }
    },
  
    mounted() {
  
      const data = {
        group :  this.$route.query.group?this.$route.query.group:1,
        from:this.from,
        count : this.count
      }
      this.fetchProductsByGroupId(data);


    
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('popstate', this.handleBackButton);
   
  },
  destroyed() {
    window.removeEventListener('popstate', this.handleBackButton)
  },
  watch:{
    searchQuery(new_val,old_val){
   
      this.from = 0;
      this.count = 15;
      const data = {
        group :  this.$route.query.group?this.$route.query.group:1,
        from:this.from,
        count : this.count
      }
      this.fetchProductsByGroupId(data);
    }
  }
}
</script>

<style lang="scss" scoped>
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
  left: 5px;
  bottom: 50px;
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
 
  margin-top:5px;
  width: 35px;
  height: 35px;
}

.mdi--filter{
  background-color: #FD562E;
  border-radius: 50%;
 
  width: 35px;
  height: 35px;
  transform: rotate(180deg);
}
.z-ltr{
  direction: ltr !important;;

}
.mdi,.v-icon{
    transform: rotate(180deg) !important;

  }
  .p-sticky-0{
    position: sticky;
    top:0px;
  }
  .br-50{
    border-radius: 50%;
  }
</style>