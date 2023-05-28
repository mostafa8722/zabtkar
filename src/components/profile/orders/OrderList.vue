<template>
  <v-container :class="($vuetify.breakpoint.lgAndUp) ? 'trimmed-container' : ''">
    <v-row dense>
      <v-col
        v-for="(item, index) in getOrderItems" 
        :key="index"
        cols="12"
      >
        <OrderItem :item="item"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderItem from './OrderItem'

export default {
  name: 'OrderList',
  components: {
    OrderItem
  },
  computed: {
    ...mapGetters('order', ['getOrderItems'])
  },
  
}
</script>

<style scoped>

</style>