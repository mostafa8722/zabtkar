<template>
      <div    class="d-flex flex-column  pt-3  "
      :class="{'bg-white':isOpen }"
      >

         <div @click="handleClick" class="section-title cursor-pointer  pr-3 pl-3  d-flex jusitfy-between">
          <h4 class="regular-font  text-999"
          :class="{'text-orange':isOpen }"
          >  {{ title }}</h4>

          <v-icon
          v-if="isOpen"
              color="#999999"
                >mdi-chevron-up</v-icon
              >
          
        
         <v-icon
         v-else
            
                >mdi-chevron-left</v-icon>
              
          
         </div>
        
        

    
       

         <div class="pr-3 pl-3 " v-if="isOpen && type!=='price'" v-for="(item, index) in items" 
        :key="index">
         
          <v-checkbox
            class="regular-font  "
            :label="getTitle(item)"
            color="red"
       
          
            :input-value="handleChecked(item)"
            @change="handleFilter($event,item)"
            hide-details
          ></v-checkbox>

        </div>

        <div class="pr-3 pl-3  mt-3 d-flex" v-if="isOpen && type==='price'" 
        >
        <span class="regular-font mr-3 mt-2">از </span>
        <v-text-field
          dense
          class="regular-font mr-1 "
          label=" از"
          placeholder="   از  "
          background-color="white"
          outlined
          v-model="minPrice"
          type="text"
            ></v-text-field>

            <span class="regular-font mr-4  mt-2">تا </span>
        <v-text-field
          dense
          class="regular-font mr-1 "
          label=" تا"
          placeholder="   تا  "
          background-color="white"
          outlined
          type="text"
          v-model="maxPrice"
            ></v-text-field>
          

        </div>
        <div class="line-divider mt-2"></div>
       
      </div>


  </template>
  
  
  <script>  
 // import Price from '@/components/base/Price.vue'

import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "Filter",
    emits: ['select'],
    props: {
      items: {
        type: Object,
        default: null,
        require: true,
      },
      title: {
        type: String,
        default: "",
        require: true,
      },

      isOpen: {
        type: Boolean,
        default: false,
        require: true,
      },
      type: {
        type: String,
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
        minPrice : 0,
        maxPrice:'',
      }
    },
    methods: {
      ...mapActions("price", ["convertLirToToman"]),
      ...mapActions('bookmark', ['addBookmark', 'deleteBookmark']),

      ...mapActions('home', ['setFilter']),


      handleClick() {
        this.isOpen =  !this.isOpen;
      },
      getTitle(item){
        if(this.type==="group" || this.type==="brand"  )
        return item.name;
        else  if(this.type==="variant"  )
        return item;
        else
        return "a";
      },
      handleFilter(event,item){
      
      const groupIds = this.getFilter.groupIds;
      const brands = this.getFilter.brands;
      const variants = this.getFilter.variants;
      if(this.type==="group"  ){
       
        const index = groupIds.findIndex((group)=>group==item.id);
        
        index<=-1 && event ? groupIds.push(item.id) : groupIds.splice(index,1) ;
      }else  if(this.type==="brand"  ){
       const index = brands.findIndex((brand)=>brand==item.id);
       index<=-1 && event ? brands.push(item.id) : brands.splice(index,1) ;
     }else  if(this.type==="variant"  ){
       const index = variants.findIndex((variant)=>variant==item);
       index<=-1 && event ? variants.push(item) : variants.splice(index,1) ;
     }
      this.getFilter.groupIds = groupIds;
      this.getFilter.brands = brands;
      this.getFilter.variants = variants;



      this.setFilter(this.getFilter);
     
      
      },
      handleChecked(item){
        const groupIds = this.getFilter.groupIds;
      const brands = this.getFilter.brands;
      const variants = this.getFilter.variants;
  
      if(this.type==="group"  ){
       
        const index = groupIds.findIndex((group)=>group==item.id);
        
       return  index<=-1  ? false : true ;
      }else  if(this.type==="brand"  ){
       
       const index = brands.findIndex((brand)=>brand==item.id);
       
     return   index<=-1  ? false : true ;
     }else  if(this.type==="variant"  ){
       
       const index = variants.findIndex((variant)=>variant==item);
       
     return   index<=-1  ? false : true ;
     }
    
      
      }
  
  
    },
    computed: {
      ...mapGetters("price", ["getMultiplier"]),
      ...mapGetters('bookmark', ['isBookmarked']),
      ...mapGetters('home', ["searchQuery","getFilter"]),
  
  
     
    },

    watch:{
      minPrice(new_val,old_val){

        if(!isNaN(new_val) && parseInt(new_val)){
          this.getFilter.priceMin = parseInt(new_val);
        }
    
        this.setFilter(this.getFilter);

      },
      maxPrice(new_val,old_val){

        if(!isNaN(new_val) && parseInt(new_val)){
          this.getFilter.priceMax = parseInt(new_val);
        }

        this.setFilter(this.getFilter);

        }
    }
  };
  </script>
  
  <style lang="scss" scoped>

.box-filter{
  background-color: #878787;
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
    color: #fd562e !important;
  }
  .font-13{
    font-size: 13px;
  }
  .font-15{
    font-size: 15px;
  }
  .text-white{
    color: #ffffff;
  }
  .bg-white{
    background-color: #ffffff;
  }
  .bg-gray{
    background-color: #878787;
  }
  .jusitfy-between{
    justify-content: space-between;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .text-999{
    color:#999;
  }
  </style>