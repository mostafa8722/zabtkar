<template>
  <v-app-bar>
    <div class="d-flex flex-row">
      <Price :price="getCartItemsTotalPrice" class="mr-3"/>
      <p class="my-auto light-font rtl">مبلغ قابل پرداخت:</p>
    </div>
    <v-spacer></v-spacer>
    <p class="my-auto black-font">سبد کالا: {{ getCartItemsCount }} عدد</p>
  </v-app-bar>  
</template>

<script>
import { mapGetters } from 'vuex';
import Price from '../base/Price'

export default {
  name: 'CartConfirmHeader',
  components: {
    Price
  },
  computed: {
    ...mapGetters('cart', ['getCartItemsCount', 'getCartItemsTotalPrice'])
  }
}
</script>

<style scoped>

</style>