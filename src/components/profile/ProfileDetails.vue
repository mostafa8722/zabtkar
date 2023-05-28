<template>
  <div>
    <v-app-bar elevation="2">
      <p class="my-auto black-font">اطلاعات حساب کاربری</p>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon color="primary"> mdi-close </v-icon>
      </v-btn>
    </v-app-bar>

    <v-container class="mt-3" :class="($vuetify.breakpoint.lgAndUp) ? 'trimmed-container' : ''">
      <v-row>
        <!-- <v-col lg="5" class="d-none d-sm-block">
          <Credit />
        </v-col> -->
        <v-col>
          <v-card outlined class="pa-3">
            <v-form
              v-model="valid"
              :disabled="isLoading"
              class="mx-6 mt-6"
              @submit.prevent="submit"
            >
              <v-text-field
                :value="getUsername"
                label="نام کاربری"
                :rules="rules.username"
                color="primary"
                class="regular-font"
                append-icon="mdi-account"
                readonly
              ></v-text-field>
              <v-text-field
                v-model="name"
                label="نام و نام خانوادگی"
                class="regular-font mt-3"
                append-icon="mdi-account-box"
                color="primary"
                :rules="rules.name"
              >
              </v-text-field>
              <v-text-field
                v-model="phoneNumber"
                label="شماره تماس"
                color="primary"
                class="regular-font mt-3"
                append-icon="mdi-phone"
                counter
                maxlength="11"
                minlength="11"
                type="number"
                :rules="rules.phoneNumber"
              >
              </v-text-field>
              <v-text-field
                v-model="email"
                label="ایمیل"
                color="primary"
                class="regular-font mt-3"
                append-icon="mdi-email"
                :rules="rules.email"
              >
              </v-text-field>
  
              <v-btn
                type="submit"
                :disabled="!valid || isLoading"
                :loading="isLoading"
                class="bold-font my-3"
                color="primary"
                block
              >
                ثبت
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Credit from '../base/Credit'

export default {
  name: "ProfileDetails",
  components: {
    Credit
  },
  data() {
    return {
      valid: false,
      name: "",
      phoneNumber: "",
      email: "",
      rules: {
        name: [
          (value) =>
            (value || "").length > 0 || "نام و نام خانوادگی را وارد کنید",
        ],
        username: [
          (value) => (value || "").length > 0 || "نام کاربری را وارد کنید",
        ],
        phoneNumber: [
          (value) => (value || "").length > 0 || "شماره همراه را وارد کنید",
          (value) => value.length == 11 || "شماره همراه وارد شده معتبر نیست",
        ],
        email: [
          (value) => (value || "").length > 0 || "ایمیل را وارد کنید",
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "ایمیل نامعتبر است";
          },
        ],
        password: [
          (value) => (value || "").length > 0 || "رمز عبور را وارد کنید",
        ],
      },
    };
  },
  methods: {
    ...mapActions("auth", ["updateProfile", "fetchCredit"]),
    submit() {
      this.updateProfile({
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
      });
    },
    close() {
      this.$store.commit("profile/updateSelectedMenuItem", -1);
    },
  },
  computed: {
    ...mapGetters("auth", [
      "getProfile",
      "isLoading",
      "getToken",
      "getCredit",
      "hasCredit",
    ]),
    getUsername() {
      return this.getProfile && this.getProfile.username
        ? this.getProfile.username
        : "";
    },
  },
  mounted() {
    this.fetchCredit();
    this.name = this.getProfile.name;
    this.phoneNumber = this.getProfile.phoneNumber;
    this.email = this.getProfile.email;
  },
};
</script>

<style lang="scss" scoped>
</style>