<template>
  <div class="container pa-2" style="min-width: 100%">
    <div class="d-flex flex-row justify-space-between">
      <div class="d-flex flex-row">
        <p class="black-font ml-2 my-auto">جمع کل:</p>
        <Price :price="getCartItemsTotalPrice" :outlined="false"/>
      </div>
      <v-btn
        color="primary"
        class="black-font submit-btn"
        elevation="2"
        @click="onCartConfirmHandler"
      >تایید</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Price from '../base/Price'

export default {
  name: 'CartFooter',
  components: {
    Price
  },
  methods: {
    onCartConfirmHandler() {
      this.$router.push({
        name: 'CartConfirm',
      })
    }
  },
  computed: {
    ...mapGetters('cart', ['getCartItemsTotalPrice'])
  }
}
</script>

<style scoped>

@media (max-width: 600px) {
  .container {
    background-color: var(--secondary-color);
    position: fixed;
    bottom: 55px;
  }

}

@media (min-width: 600px) {
  .container {
    background-color: var(--secondary-color);
    position: fixed;
    bottom: 0;
  }

}

p, span {
  color: var(--white-color);
}

.price {
  font-size: 1.1rem;
  direction: rtl;
}

.submit-btn {
  color: var(--white-color);
  font-size: 1.0rem;
}
</style>