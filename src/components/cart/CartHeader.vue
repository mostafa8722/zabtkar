<template>
  <v-app-bar class="d-flex flex-row">
    <p class="my-auto black-font">سبد کالا: {{getCartItemsCount}} عدد</p>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartHeader',
  computed: {
    ...mapGetters('cart', ['getCartItemsCount'])
  }
}
</script>

<style scoped>
p {
  float: right;
}
</style>