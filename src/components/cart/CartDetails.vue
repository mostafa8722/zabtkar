<template>
  <div>
    <div class="d-flex flex-row justify-space-between">
      <p class="bold-font my-auto" dir="rtl">تعداد اقلام درخواستی:</p>
      <p class="bold-font my-auto">{{ getCartItemsCount }}</p>
    </div>
    <div class="d-flex flex-row justify-space-between mt-3">
      <p class="bold-font my-auto" dir="rtl">جمع سبد:</p>
      <Price class="my-auto" noToggle :price="getCartItemsTotalPrice" />
    </div>
    <div class="d-flex flex-row">
      <v-checkbox v-model="checkbox"></v-checkbox>
      <p class="my-auto medium-font">
        <a href="" @click="viewRules">قوانین سایت</a> را مطالعه کرده و با آن موافقم
      </p>
    </div>
    <v-btn
      @click="submit"
      block
      color="primary"
      class="bold-font"
      :disabled="!checkbox"
    >
      ثبت
    </v-btn>
    <v-snackbar
      top
      v-model="snackbar"
      :timeout="3000"
      app
    >
      <span class="bold-font">
        {{ 'لطفا قوانین سایت رو مطالعه و در صورت موافقت، باکس پایین را انتخاب کنید' }}
      </span>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Price from "@/components/base/Price.vue";

export default {
  name: "CartDetailsPanel",
  components: {
    Price,
  },
  emits: ["click:submit"],
  data() {
    return {
      snackbar: false,
      checkbox: false,
    };
  },
  methods: {
    submit() {
      if (this.checkbox)
        this.$emit('click:submit')
      else {
        this.snackbar = true
      }
    },
    viewRules(event) {
      event.preventDefault();
      this.$store.commit('profile/updateSelectedMenuItem', 4)
    }
  }, 
  computed: {
    ...mapGetters("cart", ["getCartItemsCount", "getCartItemsTotalPrice"]),
  },
};
</script>

<style lang="scss" scoped>
</style>