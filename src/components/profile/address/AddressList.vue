<template>
  <v-container :class="($vuetify.breakpoint.lgAndUp) ? 'trimmed-container' : ''">
    <v-row dense justify="end">
      <v-col
        v-for="(address, index) in getAddresses" :key="address.id"
        cols="12"
      >
        <AddressItem :address="address" :number="index+1"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import AddressItem from './AddressItem'

export default {
  name: 'AddressList',
  components: {
    AddressItem
  },
  computed: {
    ...mapGetters('address', ['getAddresses'])
  }
}
</script>

<style scoped>

</style>