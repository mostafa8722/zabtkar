<template>
  <div>

    <div class="order-created__close">
      <v-btn icon @click="close" text>
        <v-icon color="primary">mdi-close</v-icon>
      </v-btn>
    </div>

    <div class="d-flex flex-column align-center" style="height: 100vh">
      <div class="d-flex flex-column mx-3 my-auto">
        <v-alert
          outlined
          type="success"
          text
          class="my-auto mx-3"
        >
          <span class="bold-font">سفارش شما با موفقیت ثبت شد</span>
        </v-alert>
        <p class="mx-auto mt-6 medium-font" style="color: black; font-size: 14px;">
          جهت پیگیری روند خرید به بخش <span style="color: var(--primary-color)" @click="viewOrders">سفارشات</span> در پروفایل مراجعه کنید 
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules',
  methods: {
    close() {
      this.$store.commit('profile/updateSelectedMenuItem', -1)
    },
    viewOrders() {
      this.$store.commit('profile/updateSelectedMenuItem', -1)
      setTimeout(() => {
        this.$store.commit('profile/updateSelectedMenuItem', 3)
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-created {
  &__close {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
  }
}
</style>