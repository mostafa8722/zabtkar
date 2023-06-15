<template>
  <v-card class="ma-3 pa-6 rounded-lg" outlined :min-width="minWidth">
    <v-card-title class="d-flex flex-row">
      <span class="black-font">ورود</span>
    </v-card-title>
    <v-card-subtitle class="d-flex flex-row">
      <span class="regular-font">لطفا مشخصات زیر را وارد کنید</span>
    </v-card-subtitle>
    <v-form class="mx-4 mb-3" ref="form" v-model="valid" @submit.prevent="submit">
      <v-text-field
        :value="username"
        placeholder="نام کاربری"
        :rules="rules.username"
        color="primary"
        class="regular-font"
        append-icon="mdi-account"
        @input="onUpdateUsername"
      ></v-text-field>
      <v-text-field
        :value="password"
        placeholder="رمز عبور"
        :rules="rules.password"
        color="primary"
        class="regular-font"
        :append-icon="getShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="getShowPassword ? 'text' : 'password'"
        @click:append="show_password = !show_password"
        @input="onUpdatePassword"
      ></v-text-field>
      <v-btn
        color="primary"
        class="bold-font mt-3"
        type="submit"
       
        block
       
      >
        ورود
      </v-btn>
      <div class="mt-1 d-flex flex-row justify-end" @click="$emit('click:register')">
        <a class="text-caption">
          <span class="regular-font"> حساب کاربری ندارید؟ </span>
        </a>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "LoginCard",
  props: {
    minWidth: {
      type: String,
      default: 'auto'
    },
    username: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:username', 'update:password', 'click:submit', 'click:register'],
  model: [
    {
      prop: 'username',
      event: 'update:username'
    },
    {
      prop: 'password',
      event: 'update:password'
    }
  ],
  data() {
    return {
      valid: false,
      show_password: false,
      rules: {
        username: [
          (value) => (value || "").length > 0 || "نام کاربری را وارد کنید",
        ],
        password: [
          (value) => (value || "").length > 0 || "رمز عبور را وارد کنید",
        ],
      },
    };
  },
  methods: {
    onUpdateUsername(newValue) {
      this.$emit('update:username', newValue)
    },
    onUpdatePassword(newValue) {
      this.$emit('update:password', newValue)
    },
    submit() {
      this.$emit('click:submit')
    }
  },
  computed: {
    formIsValid() {
      return this.valid
    },

    getShowPassword() {
      return this.show_password;
    },
  },
};
</script>

<style scoped>
</style>