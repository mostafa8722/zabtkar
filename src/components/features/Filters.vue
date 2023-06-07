<template>
      <v-card   class="mx-auto d-flex flex-column  box-filter mt-5" >

        <h3 class="medium-font font-15 justify-center d-flex mt-3"> فیلتر</h3>
        <div class="filter-header-box mt-3 d-flex mr-3 ml-3">
          <h5 class="regular-font font-13 text-orange" >برای دسترسی دقیق تر به  محصولات </h5>
          <h5 class="regular-font font-13 mt-2 text-orange" >نتایج را از فرم زیر فیلتر کنید </h5>
          
        </div>

        <div class="line-divider mt-4"></div>
        <FilterList :items="getGroups" title="گروه کالا" :isOpen="false" type="group"  />
        <FilterList :items="getBrandList" title="برند" :isOpen="false" type="brand"  />
        <FilterList :items="variants" title="سایز" :isOpen="false" type="size"  />
        <FilterList :items="[1,2,3]" title="محدوده ی قیمت (لیر)" :isOpen="false" type="price"  />
       
        <v-btn @click="handleFilters" class=" regular-font mt-15 mr-5 ml-5 mb-4 white--text"   height="50" variant='text' color="#FD562E" > اعمال </v-btn>
    
    
        <div></div>
       
      </v-card>
  </template>
  
  
  <script>
 // import Price from '@/components/base/Price.vue'
  import { mapActions, mapGetters } from "vuex";
  import FilterList from  "./Filter"
  
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
    mounted(){
      this.fetchBrands({from:0,count:10});
      this.getVariants2();
    },
    data() {
      return {
        isActive: false,
        showOriginalName: true,
        showLirPrice: true,
        variants:[],
     
      }
    },
    methods: {
      ...mapActions("price", ["convertLirToToman"]),
      ...mapActions('home', ['fetchBrands', 'fetchProductsByGroupId','setSearchInput']),
      ...mapActions('bookmark', ['addBookmark', 'deleteBookmark',]),
     
      handleFilters(){


        const data = {
       
       from:0,
       count : 15,
     
     }

     this.setSearchInput(data);
      },
  
    
    },
    computed: {
      ...mapGetters("price", ["getMultiplier"]),
      ...mapGetters('bookmark', ['isBookmarked']),
      ...mapGetters('home', ['getGroups' ,'getBrands','getProducts','getBrandsCount', 'getSearchedBrands', 'getShowSearchedBrands','getFilter']),
  
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
  background-color: #878787;
  height: 500px;
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
  </style>