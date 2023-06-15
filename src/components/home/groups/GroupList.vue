<template>
  <v-card
    tile
    elevation="0"
    outlined
    class="d-flex flex-row justify-sm-center flex-nowrap"
    color="secondary"
    style="overflow-x: auto"
  >
    <GroupItem v-for="(group, index) in getGroups" :key="index" :group="group" @select="onGroupItemSelect"/>
  </v-card>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from "vuex";
import GroupItem from "./GroupItem";
export default {
  name: "CategoryList",
  components: {
    GroupItem,
  },
  methods: {
    ...mapActions('home', ['fetchGroups', 'fetchProductsByGroupId','setFilter','setFilterType','setSearchInput','setGroupId']),
    ...mapMutations('home', ['updateProducts']),
    onGroupItemSelect(item) {
     
      this.setFilterType('group');
      this.setGroupId(item.id);
   
      
      this.setFilter({
    name :"",
    from:0,
    count:15,
    groupIds:[+item.id],
    brands : [],
    variants : [],
    priceMin:0,
    priceMax : 0,
  }); 

    
    
     if(this.$route.name==="Products")
     this.setSearchInput({from:0});

   


     
      this.$router.push({ path: '/products', query: { groupIds : item.id } })
   
    }
  },
  computed: {
    ...mapGetters('home', ['getGroups']),
    
  },
  mounted() {
    this.fetchGroups()
  }
};
</script>

<style scoped>



</style>