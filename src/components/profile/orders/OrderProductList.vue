<template>
  <v-container fluid="true" class="pa-0 ma-0">
    <v-row dense>
      <v-col
        v-for="i in 2" :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
      >
        <OrderProductItem class="my-3"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderProductItem from './OrderProductItem'

export default {
  name: 'OrderProductList',
  components: {
    OrderProductItem
  }
}
</script>

<style scoped>

</style>