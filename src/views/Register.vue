<template>
  <v-layout class="d-flex justify-center align-center w-100 h-100" style="backgroundColor: var(--accent-color);">
    
    <div class="close">
      <v-btn icon @click="$router.replace({name: 'Main'})" outlined>
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </div>

    <RegisterCard 
      :loading="isLoading"
      :name="name"
      @update:name="(value) => (name = value)"
      :phone-number="phoneNumber"
      @update:phoneNumber="(value) => (phoneNumber = value)"
      :email="email"
      @update:email="(value) => (email = value)"
      :username="username"
      @update:username="(value) => (username = value)"
      :password="password"
      @update:password="(value) => (password = value)"
      @click:submit="submit"
      @click:login="$router.push({name: 'Login'})"
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
import { mapActions, mapGetters } from 'vuex';
import RegisterCard from '../components/auth/RegisterCard'

export default {
  name: "Register",
  components: {
    RegisterCard
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
      name: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions('auth', ['register', 'setLoading']),
    async submit() {
      try {
        const response = await this.register({
          name: this.name,
          username: this.username,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password
        })
        const data = response.data;
        if (!data.success) {
          this.showSnackbar(data.message, 'error')
        } else {
          const message = `${this.name} عزیز از اینکه به جمع مشتریان پالوت پیوستید سپاسگزاریم`
          this.showSnackbar(message, 'success')
          setTimeout(() => {
            this.$router.replace({
              name: 'Login'
            })
          }, 2000);
        }
      } catch (error) {
        this.showSnackbar('خطا در ثبت نام! لطفا مجدد امتحان کنید', 'error')
      }
    },
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoading'])
  },
  mounted() {
    this.setLoading(false);
  }
};
</script>

<style scoped>
.close {
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>