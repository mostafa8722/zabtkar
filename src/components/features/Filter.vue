<template>
      <div    class="d-flex flex-column  pt-3  "
      :class="{'bg-white':isOpen }"
      >

         <div @click="handleClick" class="section-title cursor-pointer  pr-3 pl-3  d-flex jusitfy-between">
          <h4 class="regular-font  text-white "
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
            value="red"
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
      }
    },
    methods: {
      ...mapActions("price", ["convertLirToToman"]),
      ...mapActions('bookmark', ['addBookmark', 'deleteBookmark']),
      handleClick() {
        this.isOpen =  !this.isOpen;
      },
      getTitle(item){
        if(this.type==="group" || this.type==="brand" )
        return item.name;
        else
        return "a";
      }
  
  
    },
    computed: {
      ...mapGetters("price", ["getMultiplier"]),
      ...mapGetters('bookmark', ['isBookmarked']),
  
  
     
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
  </style>