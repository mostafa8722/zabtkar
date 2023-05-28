<template>
  <div>
    <ProfileMenuItem v-if="isLoggedIn" title="اطلاعات حساب کاربری" icon="mdi-account" @select="onProfileMenuItemSelect(1)"/>
    <ProfileMenuItem v-if="isLoggedIn" title="نرخ لیر" icon="mdi-currency-try" :value="getMultiplier + ' تومان '"/>
    <ProfileMenuItem v-if="isLoggedIn" title="کیف پول" icon="mdi-wallet" :value="getCredit + ' لیر '"/>
    <ProfileMenuItem v-if="isLoggedIn" title="آدرس های من" icon="mdi-home" @select="onProfileMenuItemSelect(2)"/>
    <ProfileMenuItem v-if="isLoggedIn" title="سفارشات" icon="mdi-shopping" @select="onProfileMenuItemSelect(3)"/>
    <ProfileMenuItem title="قوانین و مقررات" icon="mdi-script" @select="onProfileMenuItemSelect(4)"/>
    <ProfileMenuItem title="ارتباط با ما" icon="mdi-phone" @select="onProfileMenuItemSelect(5)"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileMenuItem from './ProfileMenuItem'

export default {
  name: 'ProfileMenu',
  components: {
    ProfileMenuItem
  },
  methods: {
    ...mapActions('auth', ['logout']),
    onProfileMenuItemSelect(index) {
      this.$store.commit('profile/updateSelectedMenuItem', index)
    },
    onLogout() {
      this.logout()
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('price', ['getMultiplier']),
    ...mapGetters('credit', ['getCredit'])
  }
}
</script>

<style scoped>

</style>