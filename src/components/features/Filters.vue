<template>
      <v-card   class="mx-auto d-flex flex-column  box-filter mt-5" >
       
       
        <h3  class="medium-font font-15 justify-center d-flex mt-3"
        
     
        >
          <span  :data-tooltip="content" >
            فیلتر
          </span>
          
          
        
    </h3>
       

        <div class="line-divider mt-4"></div>
        <div class="filter-sections">
          <FilterList v-if="!$route.query.groupIds" :items="getInitialFilter.groups" title=" گروه" :isOpen="false" type="group"  />
        <FilterList v-if="!$route.query.brands" :items="getInitialFilter.brands" title="برند" :isOpen="false" type="brand"  />
        <FilterList :items="getInitialFilter.variants" title="سایز" :isOpen="false" type="variant"  />
        <FilterList :items="[1,2,3]" title=" قیمت (لیر)" :isOpen="false" type="price"  />
       
        </div>
      
 
        <div></div>
        <v-btn @click="handleFilters" class=" regular-font mt-2 mr-5 ml-5 btn-filter mb-4 white--text"   height="50" variant='text' color="#FD562E" > اعمال </v-btn>
    
    
      </v-card>
  </template>
  
  
  <script>
 // import Price from '@/components/base/Price.vue'
  import { mapActions, mapGetters } from "vuex";
  import FilterList from  "./Filter";
  import Vue from 'vue'
import VTooltip from 'v-tooltip';
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
    zIndex:1000
  }
}
tooltip(config)
Vue.use(VTooltip)
  
  export default {
    name: "Filters",
    emits: ['select'],
    props: {
      product: {
        type: Object,
        default: null,
        require: true,
      },
    },
    components: {
      FilterList
    
    },

    data() {
      return {
        isActive: false,
        showOriginalName: true,
        showLirPrice: true,
        variants:[],
        content: ' برای دسترسی دقیق تر به  محصولات ' +'نتایج را از فرم زیر فیلتر کنید ',
     
      }
    },
    methods: {
      ...mapActions("price", ["convertLirToToman"]),
      ...mapActions('home', ['fetchBrands', 'fetchProductsByGroupId','setSearchFilter','setFilter','setFilterType']),
      ...mapActions('bookmark', ['addBookmark', 'deleteBookmark',]),
     
      handleFilters(){


     this.getFilter.from = 0 ;
         
     this.setFilterType('filter');
   
     this.setFilter(this.getFilter);

     this.setSearchFilter();
      },
  
    
    },
    computed: {
      ...mapGetters("price", ["getMultiplier"]),
      ...mapGetters('bookmark', ['isBookmarked']),
      ...mapGetters('home', ['getGroups' ,'getBrands','getProducts','getInitialFilter',
      'getBrandsCount', 'getSearchedBrands', 'getShowSearchedBrands','getFilter']),
  
      getVariants() {

        console.log("getProducts",this.getProducts)

      //const variants = this.updatedVariants.length? this.updatedVariants:this.getProduct ? this.getProduct.variants : [];
     
      // return variants.map((variant) => {
      //   return {
      //     ...variant,
      //     disabled: !variant.exists,
      //   };
      // });
    },
      getBrandList() {
      return (this.getShowSearchedBrands) ? this.getSearchedBrands : this.getPaginatedBrands
    },
    getPaginatedBrands() {
      return this.getBrands(0, this.indexEnd)
    }
  
     
    },
    watch:{
      getProducts(new_val,old_val){
        console.log("getProducts2",new_val)
        let sizes = [];
        new_val.map(item=>  { sizes.push (...item.variants)});
     
       const seen = new Set();
       const uniqueAuthors = sizes.filter(item => {
  const duplicate = seen.has(item.id);
  seen.add(item.id);
  return !duplicate;
});

console.log("getProducts3",uniqueAuthors)
      this.variants = uniqueAuthors;

      }
    }
  };
  </script>
  
  <style lang="scss" scoped>

.box-filter{
background-color: #fff;
  height: 100vh;
  position: relative;



}
.filter-sections{
  height: 80vh;
   overflow-y: scroll;
}
  .filter-header-box {
    background-color: #FFE5C6;
    border-radius: 30px;
    padding: 10px 20px;
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
  .font-13{
    font-size: 13px;
  }
  .font-15{
    font-size: 15px;
  }
  .btn-filter{
    position: absolute;
    bottom: 40px;
    right: 5%;
    width: 80%;

  }
  </style>