<template>
  <v-layout
    class="d-flex flex-column justify-center align-center w-100 h-100"
    style="backgroundColor: var(--accent-color)"
  >
    <div class="close">
      <v-btn icon @click="$router.replace({name: 'Main'})" outlined>
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </div>

    <LoginCard 
      min-width="400px"
      :loading="isLoading"
      :username="username"
      @update:username="(value) => (username = value)"
      :password="password"
      @update:password="(value) => (password = value)"
      @click:submit="submit"
      @click:register="$router.push({name: 'Register'})"
    />
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :color="snackbarColor"
      absolute
    >
      <span class="bold-font">{{ snackbarMessage }}</span>
    </v-snackbar>
  </v-layout>
</template>

<script>
import LoginCard from '../components/auth/LoginCard'
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Login",
  components: {
    LoginCard
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapActions("auth", ["login", 'setLoading']),
    async submit() {
      try {
        const response = await this.login({
          username: this.username,
          password: this.password
        });
      } catch (error) {
        this.showSnackbar('نام کاربری یا رمز عیور شما اشتباه است', 'error')
      }
    },
    showSnackbar(message, color) {
      this.snackbarMessage = message
      this.snackbarColor = color
      this.snackbar = true;
    }
  },

  computed: {
    ...mapState("auth", ["token"]),
    ...mapGetters("auth", ["isLoading", "isLoggedIn"]),
  },

  mounted() {
    this.setLoading(false);
    if (this.isLoggedIn) {
      this.$router.push({
        name: "Main",
      });
    }
  },

  watch: {
    token(value) {
      if (value) {
        this.snackbarMessage = 'با موفقیت وارد حساب کاربری خود شدید'
        this.snackbarColor = 'success'
        this.snackbar = true;
        setTimeout(() => {
          this.$router.push({
            name: "Main",
          });
        }, 2000)
      }
    },
  },
};
</script>

<style scoped>
.close {
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>