<template>
  <v-card class="pa-3" outlined elevation="0" >
    <div class="d-flex flex-row justify-space-between">
      <p class="bold-font rtl">موجودی حساب شما:</p>
      <p v-if="hasCredit" class="black-font">
        <Price :price="getCredit" noToggle/>
      </p>
    </div>
    <v-btn :disabled="isLoading" :loading="isLoading" block class="bold-font" color="primary"> افزایش موجودی </v-btn>
  </v-card>
</template>

<script>
import Price from './Price.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "Credit",
  components: {Price},
  methods: {
    ...mapActions('credit', ['fetchCredit'])
  },
  computed: {
    ...mapGetters('credit', ['hasCredit', 'getCredit', 'isLoading'])
  },
  created() {
    this.fetchCredit()
  }
};
</script>

<style lang="scss" scoped>
</style>