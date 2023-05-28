<template>
  <div>
    <ProfileHeader class="d-block d-sm-none" />
    <RegisterCard 
      v-if="!isLoggedIn && !loginMode"
      :loading="isLoading"
      :name="register_data.name"
      @update:name="(value) => (register_data.name = value)"
      :phone-number="register_data.phoneNumber"
      @update:phoneNumber="(value) => (register_data.phoneNumber = value)"
      :email="register_data.email"
      @update:email="(value) => (register_data.email = value)"
      :username="register_data.username"
      @update:username="(value) => (register_data.username = value)"
      :password="register_data.password"
      @update:password="(value) => (register_data.password = value)"
      @click:submit="onRegisterSubmit"
      @click:login="loginMode = true"
    />
    <LoginCard
      v-if="!isLoggedIn && loginMode"
      :loading="isLoading"
      :username="login_data.username"
      @update:username="(value) => (login_data.username = value)"
      :password="login_data.password"
      @update:password="(value) => (login_data.password = value)"
      @click:submit="onLoginSubmit"
      @click:register="loginMode = false"
    />
    <ProfileMenu class="px-3 mt-10 mt-sm-0" style="margin-top: 70px" />
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :color="snackbarColor"
      app
    >
      <span class="bold-font">{{ snackbarMessage }}</span>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoginCard from "../components/auth/LoginCard";
import RegisterCard from '../components/auth/RegisterCard'
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/profile/ProfileMenu";

export default {
  name: "Profile",
  components: {
    ProfileHeader,
    ProfileMenu,
    LoginCard,
    RegisterCard,
  },
  data() {
    return {
      login_data: {
        username: '',
        password: ''
      },
      register_data: {
        name: '',
        phoneNumber: '',
        email: '',
        username: '',
        password: ''
      },
      loginMode: true,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'register', 'fetchProfile']),
    async onLoginSubmit() {
      try {
        await this.login(this.login_data)
      } catch (error) {
        this.showSnackbar('نام کاربری یا رمز عیور شما اشتباه است', 'error')
      }
    },
    async onRegisterSubmit() {
      try {
        const response = await this.register(this.register_data);
        const data = response.data;
        if (!data.success) {
          this.showSnackbar(data.message, 'error')
        } else {
          const message = `${this.register_data.name} عزیز از اینکه به جمع مشتریان پالوت پیوستید سپاسگزاریم`
          this.showSnackbar(message, 'success')
          this.loginMode = true;
        }
      } catch (error) {
        console.log(error)
        this.showSnackbar('خطا در ثبت نام! لطفا مجدد امتحان کنید', 'error')
      }
    },
    showSnackbar(message, color) {
      this.snackbarMessage = message
      this.snackbarColor = color
      this.snackbar = true;
    }
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "isLoading"]),
  },
  mounted() {
    this.fetchProfile()
  }
};
</script>

<style scoped>
</style>