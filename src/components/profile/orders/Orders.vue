<template>
  <div>
    <OrdersHeader class="header"/>
    <div v-if="orderLoading" class="d-flex flex-row justify-center mt-3">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="getOrderItems.length == 0 && !orderLoading" class="d-flex flex-row justify-center align-center">
      <p class="mt-5 text-center text-h5">
        <span class="bold-font">لیست سفارشات شما خالی  می باشد</span>
      </p> 
    </div>
    <OrderList v-if="!orderLoading"/>
  </div>
</template>

<script>
import OrdersHeader from './OrdersHeader'
import OrderList from './OrderList'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Orders',
  components: {
    OrdersHeader,
    OrderList
  },
  methods: {
    ...mapActions('order', ['fetchOrders'])
  },
  computed: {
    ...mapGetters('order', ['orderLoading', 'getOrderItems'])
  },
  mounted() {
    this.fetchOrders();
  }
}
</script>

<style scoped>
</style>