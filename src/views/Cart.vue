<template>
  <div>
    <CartHeader v-if="$vuetify.breakpoint.width <= 600" />
    <div v-if="isCartEmpty" class="d-flex flex-row justify-center align-center">
      <p class="mt-5 text-center text-h5">
        <span class="bold-font">سبد خرید شما خالی  می باشد</span>
      </p> 
    </div>
    <div v-if="!isCartEmpty">
      <CartProductsList style="z-index: 1"/>
      <!-- <CartFooter class="d-block d-md-none" style="z-index: 2"/> -->
    </div>
  </div>  
</template>

<script>
import CartHeader from '../components/cart/CartHeader'
import CartFooter from '../components/cart/CartFooter'
import CartProductsList from '../components/cart/CartProductsList'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartHeader,
    CartFooter,
    CartProductsList
  },
  computed: {
    ...mapGetters('cart', ['isCartEmpty'])
  }
}
</script>

<style scoped>
</style>