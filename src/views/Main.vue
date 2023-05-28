<template>
  <div>
    <AppBar v-if="$vuetify.breakpoint.width > 600"/>
    <div>
      <Home v-show="getBottomNavigationSelectedItem == 4"/>
      <Cart v-show="getBottomNavigationSelectedItem == 3"/>
      <Bookmark v-show="getBottomNavigationSelectedItem == 2"/>
      <Profile v-show="getBottomNavigationSelectedItem == 1"/>
    </div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card color="#f0f0f0">
        <ProfileDetails v-if="getSelectedMenuItem == 1"/>
        <Addresses v-if="getSelectedMenuItem == 2"/>
        <Orders v-if="getSelectedMenuItem == 3"/>
        <Rules v-if="getSelectedMenuItem == 4"/>
        <ContactUs v-if="getSelectedMenuItem == 5"/>
        <Wallet v-if="getSelectedMenuItem == 6"/>
        <OrderCreated v-if="getSelectedMenuItem == 7"/>
      </v-card>
    </v-dialog>
    <BottomNavigation/>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import BottomNavigation from '../components/BottomNavigation.vue'
import Home from './Home.vue'
import Cart from './Cart.vue'
import Bookmark from './Bookmark.vue'
import Profile from './Profile.vue'
import ProfileDetails from '../components/profile/ProfileDetails.vue'
import Addresses from '../components/profile/address/Addresses.vue'
import Orders from '../components/profile/orders/Orders.vue'
import Rules from '@/components/base/Rules.vue'
import ContactUs from '@/components/base/ContactUs.vue'
import Wallet from '@/components/base/Wallet.vue'
import OrderCreated from '@/components/base/OrderCreated.vue'
import { mapGetters } from 'vuex';

export default {
  name: "MainView",
  components: {
    AppBar,
    BottomNavigation,
    Home,
    Cart,
    Bookmark,
    Profile,
    ProfileDetails,
    Addresses,
    Orders,
    Rules,
    ContactUs,
    Wallet,
    OrderCreated
  },
  computed: {
    ...mapGetters(['getBottomNavigationSelectedItem']),
    getSelectedMenuItem() {
      return this.$store.state.profile.selected_menu_item;
    },
    dialog: {
      get() {
        return this.$store.state.profile.show_dialog;
      },
      set(value) {
        this.$store.commit('profile/updateShowDialog', value)
      }
    }
  }
};
</script>

<style scoped>
</style>