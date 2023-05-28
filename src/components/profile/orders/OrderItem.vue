<template>
  <v-card class="mb-3 px-3 pt-3">
    <v-list-item>
      <v-list-item-avatar width="120" height="120" rounded>
        <v-img :src="`http://zabtkar.tooska-co.ir${item.images[0].image}`" :lazy-src="`http://zabtkar.tooska-co.ir${item.images[0].thumbnail}`"></v-img>
      </v-list-item-avatar>
      <v-list-item-title>
        <p class="bold-font" >{{ getStatus }}</p>
      </v-list-item-title>
    </v-list-item>
    <v-divider class="mt-3"></v-divider>
    <div class="d-flex">
      <v-btn
        class="ma-auto"
        icon
        @click="show_products = !show_products"
        >
          <v-icon>{{ show_products ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <div v-show="show_products">
        <OrderDetails class="my-3" :item="item"/>
        <v-divider></v-divider>
        <OrderTimeline :item="item"/>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import OrderDetails from './OrderDetails'
import OrderProductList from './OrderProductList'
import OrderTimeline from './OrderTimeline.vue'

export default {
  name: 'OrderItem',
  components: {
    OrderDetails,
    OrderProductList,
    OrderTimeline
  },
  props: {
    item: {
      type: Object,
      default: {},
      required: true,
    }
  },
  data() {
    return {
      show_products: false
    }
  },
  computed: {
    getStatusHistory() {
      return (this.item && this.item.statusHistory) ? this.item.statusHistory : []
    },
    getStatus() {
      return (this.getStatusHistory.length > 0) ? this.getStatusHistory[0].statusText : ''
    }
  }
}
</script>

<style scoped>
</style>