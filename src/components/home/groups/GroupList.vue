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
    ...mapActions('home', ['fetchGroups', 'fetchProductsByGroupId']),
    ...mapMutations('home', ['updateProducts']),
    onGroupItemSelect(item) {
     
      this.$router.push({ path: '/products', query: { group: item.id } })
      this.updateProducts([])
      this.fetchProductsByGroupId(item.id)
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