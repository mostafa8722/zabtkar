<template>
  <v-card class="pa-6 ma-3 rounded-lg" outlined>
    <v-card-title class="d-flex flex-row">
      <span class="black-font">ثبت نام</span>
    </v-card-title>

    <v-card-subtitle class="d-flex flex-row">
      <span class="regular-font">لطفا مشخصات زیر را وارد کنید</span>
    </v-card-subtitle>

    <v-form class="mx-4 mb-3" ref="form" v-model="valid" @submit.prevent="submit">
      <div class="d-flex flex-column">
        <v-text-field
          :value="name"
          label="نام و نام خانوادگی"
          :rules="rules.name"
          class="regular-font"
          append-icon="mdi-account-box"
          color="primary"
          @input="value => $emit('update:name', value)"
        ></v-text-field>
        <v-text-field
          :value="phoneNumber"
          label="شماره همراه"
          :rules="rules.phoneNumber"
          color="primary"
          class="regular-font"
          append-icon="mdi-phone"
          counter
          maxlength="11"
          minlength="11"
          type="number"
          @input="value => $emit('update:phoneNumber', value)"
        ></v-text-field>
        <!-- <v-text-field
          :value="email"
          label="ایمیل"
          :rules="rules.email"
          color="primary"
          class="regular-font"
          append-icon="mdi-email"
          @input="value => $emit('update:email', value)"
        ></v-text-field> -->
        <div class="d-flex flex-row gap">
          <v-text-field
            :value="username"
            label="نام کاربری"
            :rules="rules.username"
            color="primary"
            class="regular-font"
            append-icon="mdi-account"
            @input="value => $emit('update:username', value)"
          ></v-text-field>
          <v-text-field
            :value="password"
            label="رمز عبور"
            :rules="rules.password"
            color="primary"
            class="regular-font"
            :append-icon="getShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="getShowPassword ? 'text' : 'password'"
            @click:append="show_password = !show_password"
            @input="value => $emit('update:password', value)"
          ></v-text-field>
        </div>
        <v-btn
          color="primary"
          class="bold-font mt-3"
          type="submit"
          :loading="loading"
          :disabled="!formIsValid || loading"
        >
          ثبت
        </v-btn>
        <div class="mt-1 d-flex flex-row justify-end" @click="$emit('click:login')">
          <a class="text-caption">
            <span class="regular-font"> قبلا ثبت نام کرده اید؟ </span>
          </a>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "RegisterCard",
  props: {
    name: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    email: {
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
  emits: ['update:name', 'update:phoneNumber', 'update:email', 'update:username', 'update:password', 'click:login', 'click:submit'],
  model: [
    {
      prop: 'name',
      event: 'update:name',
    },
    {
      prop: 'phoneNumber',
      event: 'update:phoneNumber'
    },
    {
      prop: 'email',
      event: 'update:email'
    },
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
        name: [
          (value) => (value || "").length > 0 || "نام و نام خانوادگی را وارد کنید",
        ],
        username: [
          (value) => (value || "").length > 0 || "نام کاربری را وارد کنید",
        ],
        phoneNumber: [
          (value) => (value || "").length > 0 || "شماره همراه را وارد کنید",
        ],
        email: [
          (value) => (value || "").length > 0 || "ایمیل را وارد کنید",
          (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'ایمیل نامعتبر است'
          }
        ],
        password: [
          (value) => (value || "").length > 0 || "رمز عبور را وارد کنید",
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$emit('click:submit')
    }
  },
  computed: {
    formIsValid() {
      return this.valid;
    },

    getShowPassword() {
      return this.show_password
    }
  },
};
</script>

<style scoped>
.gap {
  gap: 1rem;
}
</style>