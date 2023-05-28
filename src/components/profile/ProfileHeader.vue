<template>
  <div>
    <v-app-bar v-if="isLoggedIn">
      <v-progress-circular
        v-if="!hasProfile"
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
      <p v-if="hasProfile" class="my-auto black-font">{{ getName }}</p>
      <v-spacer v-if="hasProfile"></v-spacer>
      <v-btn v-if="isLoggedIn" icon @click="logoutDialog = true">
        <v-icon color="primary">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar v-if="!isLoggedIn">
      <p class="my-auto black-font">ورود | ثبت نام</p>
      <v-spacer></v-spacer>
    </v-app-bar>

    <logout-dialog v-model="logoutDialog" @click:submit="logout"/>
  </div>
</template>

<script>
import LogoutDialog from '../base/LogoutDialog.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProfileHeader',
  components: {
    LogoutDialog
  },
  data() {
    return {
      logoutDialog: false
    }
  },  
  methods: {
    ...mapActions('auth', ['logout']),
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'isLoading', 'getProfile', 'hasProfile']),
    getPhoneNumber() {
      return (this.getProfile) ? this.getProfile.phoneNumber : ''
    },

    getName() {
      return (this.getProfile) ? this.getProfile.name : ''
    }
  }
}
</script>

<style scoped>

</style>