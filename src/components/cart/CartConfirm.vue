<template>
  <div>
    <CartConfirmHeader class="d-block d-sm-none"/>
    <v-container class="pa-3">
      <v-card class="pa-3 flex-row d-none d-sm-flex">
        <div class="d-flex flex-row">
          <Price :price="getCartItemsTotalPrice" class="mr-3"/>
          <p class="my-auto light-font rtl">مبلغ قابل پرداخت:</p>
        </div>
        <v-spacer></v-spacer>
        <p class="my-auto black-font">سبد کالا: {{ getCartItemsCount }} عدد</p>
      </v-card>
      <v-card class="pa-3 mt-3 d-flex flex-column">
        <span class="mx-auto regular-font">شماره کارت: 1111-2222-3333-4444</span>
        <span class="mx-auto mt-2 regular-font">به نام فلان فلانی</span>
        <v-form>
          <v-file-input
            class="regular-font mt-2"
            accept="image/*"
            prepend-icon=""
            append-icon="mdi-image"
            label="لطفا تصویر فیش واریزی را انتخاب کنید"
            reverse
          ></v-file-input>
          <v-select
            class="regular-font"
            reverse
            :items="getAddresses"
            item-text="addressText"
            return-object
            label="لطفا آدرس ارسال را انتخاب کنید"
            append-icon="mdi-map-marker"
          ></v-select>
          <v-btn type="submit" color="primary" large block class="black-font">
            تایید نهایی و اتمام
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CartConfirmHeader from './CartConfirmHeader'
import Price from '../base/Price'

export default {
  name: 'CartConfirm',
  data() {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  components: {
    CartConfirmHeader,
    Price
  },
  methods: {
    ...mapActions('price', ['fetchMultiplier']),
    ...mapActions('address', ['fetchAddresses'])
  },
  computed: {
    ...mapGetters('cart', ['getCartItemsCount', 'getCartItemsTotalPrice']),
    ...mapGetters('address', ['getAddresses'])
  },
  mounted() {
    this.fetchMultiplier()
    this.fetchAddresses()
  }
}
</script>

<style scoped>

</style>