<template>
  <v-bottom-navigation
    id="bottom-navigation"
    max-height="55"
    v-model="selected_item"
    fixed
    app
    grow
    color="primary"
    class="d-sm-none"
  >
    <v-btn
      v-for="(item, index) in getBottomNavigationItems"
      :key="index"
      :value="item.id"
      color="transparent"
      @click="onBottomNavigationItemClick(index)"
    >
      <span class="regular-font">{{ item.title }}</span>
      <v-badge
        v-if="index == 1"
        :content="getCartItemsCount"
        :value="getCartItemsCount"
        color="primary"
        overlap
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-badge>
      <v-icon v-else>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "BottomNavigation",
  methods: {
    ...mapMutations('home', ['updateShowProducts', 'updateShowSearchedBrands']),
    onBottomNavigationItemClick(index) {
      if (index == 0) {
        this.updateShowProducts(false)
        this.updateShowSearchedBrands(false)
      }
    }
  },
  computed: {
    ...mapGetters(['getBottomNavigationSelectedItem', 'getBottomNavigationItems']),
    ...mapGetters('cart', ['getCartItemsCount']),
    selected_item: {
      get() {
        return this.getBottomNavigationSelectedItem
      },
      set(value) {
        this.$store.dispatch('setBottomNavigationSelectedItem', value)
      }
    }
  }
};
</script>

<style scoped>

</style>