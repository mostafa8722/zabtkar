<template>
  <div>
 
    <AppBarVue  />
   
    <GroupList />
    
  

   
    <v-row dense class="d-flex mr-3 ml-3 ">
     
      <v-col
      v-if="$vuetify.breakpoint.width > 600"
        
        cols="2"
       
      >
        <v-responsive class="p-sticky-0 ">
          <FilterSection />
        
        </v-responsive>
      </v-col>

      <v-col
        
        
        :cols="$vuetify.breakpoint.width > 600?8:12"
       
      >
        <v-responsive  >
         
         
    <div v-if="isLoadingProducts && getProducts.length==0 && getProducts.length%15==0 " class="mt-15 d-flex flex-row   ">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
    </div>
          <ProductList />
        </v-responsive>
    
      </v-col>

      <v-col
      v-if="$vuetify.breakpoint.width > 600"
        
        cols="2"
       
      >
        <v-responsive class="p-sticky-0" >
          <AddProduct />
        
        </v-responsive>
      </v-col>
    </v-row>
   

    
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
   <div v-if="isLoadingProducts && getProducts.length>0 &&  getProducts.length%15==0" class="mt-3 d-flex flex-row   ">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
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
import BottomNavigation from '@/components/BottomNavigation.vue'

export default {
  name: 'products',
  components: {
    HomeHeader,
    GroupList,
    BrandList,
    ProductList,
    FilterSection,
    AddProduct,
    AppBarVue,
    BottomNavigation
},
  methods: {
    ...mapMutations('home', ['updateShowProducts']),
    ...mapActions('home',
     ['fetchProductsByBrandId', 'fetchProductsByGroupId',
     'setFilterType',
     'setGroupId',
     'setSearchQuery',
     'setBrandId',
     'setSearchFilter',
     'setSearchInput','setFilter','clearSearchedProducts']),
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
   async onScroll() {
   
        if(!this.isLoadingProducts && this.getProducts.length>0 && this.getProducts.length%15===0){
          console.log("ddd","loading2")
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.9;
      if (bottomOfWindow) {
        console.log("ddd","loading3",this.getProducts.length)
        // if(this.getProducts.length<=15)
        //   this.from = 0 ;

        this.getFilter.from += this.getFilter.count ;
         
    
   
    this.setFilter(this.getFilter);
    let data = {from: this.getFilter.from};
 
    if(this.getFilterType==="filter")
    this.setSearchFilter();
    else 
     this.setSearchFilter(this.initFilter);
    
     
      }
    }
 
     
     
    }
  },
  computed: {
    ...mapGetters('home', ['isLoading','isLoadingProducts', 
    'showProducts', 'brandsLoading',"searchQuery","getFilter",
    "getProducts",
    'getFilterType',
    'getGroupId'
  ]),
    
  },
  data() {
      return {
        openAdd: false,
        openFilter: false,
        pagination :1,
        from : 0,
        count : 15,
        timeOutScroll : null,
        initFilter:{
          name :"",
    from:0,
    count:15,
    groupIds:[],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,
        }
       
     
      }
    },
  
    async mounted() {
  this.clearSearchedProducts();

  this.setFilter({
    name :"",
    from:0,
    count:15,
    groupIds:[],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,
  });
      let from = 0;
      let count = 15;
  
      let group = 0;
      let brand = 0;
      let variants = [];
      let name =   "";
      let priceMin =  0;
      let priceMax =   0;



      if(this.$route.query.groupIds){
        this.setFilterType('group');
      this.setGroupId(this.$route.query.groupIds);
      this.initFilter.groupIds = [this.$route.query.groupIds];
      }


      if(this.$route.query.search){
        this.setFilterType('keyword');
        this.setSearchQuery(this.$route.query.search);
        this.initFilter.name = this.$route.query.search;
      }
      name  = this.$route.query.search; 

      if(this.$route.query.brands){
        this.setFilterType('brand');
        this.initFilter.brands = [this.$route.query.brands];
      this.setBrandId(this.$route.query.brands);
      }
    

      // if(this.$route.query.variants)
      // variants .push( this.$route.query.variants); 

      // if(this.$route.query.priceMin)
      // priceMin  = this.$route.query.priceMin; 


      // if(this.$route.query.priceMax)
      // priceMax  = this.$route.query.priceMax; 

      const data  = {from,count,group,name,brand,variants,priceMax,priceMin}



   
    
 
      this.setSearchInput(data);


    
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('popstate', this.handleBackButton);
   
  },
  destroyed() {
    window.removeEventListener('popstate', this.handleBackButton)
  },
  watch:{
    async searchQuery(new_val,old_val){
   
      let data ={name:new_val};
      this.setSearchInput(data);

      this.initFilter= {
          name :new_val,
    from:0,
    count:15,
    groupIds:[],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,
        }

    }
  },
  getFilter(new_val,old_val){
   
console.log("dddddd",new_val.groupIds)
 },
 getGroupId(new_val,old_val){
 
  this.initFilter= {
          name :"",
    from:0,
    count:15,
    groupIds:[parseInt(new_val)],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,
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