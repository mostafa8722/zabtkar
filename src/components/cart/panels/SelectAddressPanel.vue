<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="bold-font"> انتخاب آدرس </span>
    </v-expansion-panel-header>
    <v-expansion-panel-content style="max-width: 100%">
      <div v-if="isLoggedIn">
        <v-radio-group @change="onAddressChanged" v-if="getAddresses.length > 0">
          <div class="d-flex flex-row" v-for="(address, index) in getAddresses" :key="index">
            <v-radio
              class="radio-button mt-2"
              :value="address"
            ></v-radio>
            <p class="my-auto line-clamp">{{ address.addressText }}</p>
          </div>
        </v-radio-group>
        <div v-else class="d-flex">
          <p class="bold-font mx-auto">
            آدرسی وجود ندارد
          </p>
        </div>
        <div class="d-flex flex-row">
          <v-btn @click.stop="dialog = true" :disabled="isLoading" :loading="isLoading" fab small color="primary" class="my-auto" elevation="0">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p class="medium-font my-auto mx-2">افزودن آدرس جدید</p>
        </div>
        <v-btn @click="submit" :disabled="!address || isLoading || loading" :loading="isLoading || loading" block color="primary" class="bold-font mt-3"> ثبت </v-btn>
      </div>
      <div class="d-flex flex-column" v-else>
        <p class="bold-font mx-auto">
          برای ادامه خرید باید وارد حساب کاربری خود شوید
        </p>
        <v-btn @click="viewLogin" color="primary" class="bold-font" >
          ورود به حساب کاربری
        </v-btn>
      </div>
    </v-expansion-panel-content>
    <AddAddress v-model="dialog" :loading="isLoading" @click:submit="onAddAddress"/>
    <v-snackbar
      top
      v-model="snackbar"
      :timeout="3000"
      app
    >
      <span class="bold-font">
        {{ 'آدرس را انتخاب کنید' }}
      </span>
    </v-snackbar>
  </v-expansion-panel>
</template>

<script>
import AddAddress from '@/components/profile/address/AddAddress.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "SelectAddressPanel",
  components: {
    AddAddress
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Object,
      default: null
    }
  },
  emits: ['click:submit', 'update:address'],
  model: {
    prop: 'address',
    event: 'update:address'
  },
  data() {
    return {
      snackbar: false,
      dialog: false,
    }
  },
  methods: {
    ...mapActions(['setBottomNavigationSelectedItem']),
    ...mapActions('address', ['fetchAddresses', 'addAddress']),
    onAddAddress(address) {
      this.addAddress(address)
      .then(() => {
        this.dialog = false;
      })
      .catch(() => {
        this.dialog = false;
      });
    },
    onAddressChanged(address) {
      this.$emit('update:address', address)
    },
    submit() {
      if (this.address) 
        this.$emit('click:submit')
      else {
        this.snackbar = true
      }
    },
    viewLogin() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.setBottomNavigationSelectedItem(1)
      } else {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('address', ['getAddresses', 'isLoading']),
  },
  mounted() {
    this.fetchAddresses()
  }
};
</script>

<style lang="scss" scoped>

</style>