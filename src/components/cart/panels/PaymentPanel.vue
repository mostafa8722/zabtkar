<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span class="bold-font">پرداخت</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-alert
        class="rounded-lg regular-font"
        text
        outlined
        color="deep-orange"
      >
        میزان اعتیار کیف پول شما ( <span>{{ getCredit }}</span> لیر ) می باشد. لطفا جهت خرید این سبد کالا
        کیف پول خود را حداقل به مقدار <span>{{ getRequiredCredit }}</span> لیر شارژ نمایید
      </v-alert>
      <v-text-field
        :value="getRequiredCredit"
        label="حداقل لیر مورد نیاز برای این سبد"
        outlined
        readonly
        class="bold-font"
      ></v-text-field>
      <v-text-field
        label="قیمت لیر در این لحظه"
        :value="getMultiplier"
        class="bold-font"
        outlined
        readonly
        suffix="تومان"
      ></v-text-field>
      <v-alert
        class="rounded-lg regular-font"
        text
        outlined
        color="deep-orange"
      >
        <div class="d-flex flex-column">
          <div class="d-flex flex-row justify-center">
            <p class="bold-font mx-2">مبلغ قابل پرداخت:</p>
            <p class="bold-font">{{ getRequiredTomanCredit }} تومان</p>
          </div>
          <v-progress-circular v-if="bankLoading" class="mx-auto" indeterminate color="primary"></v-progress-circular>
          <v-btn v-if="!getBank" color="primary" outlined class="bold-font" @click="fetchBanks">
            دریافت اطلاعات بانکی
          </v-btn>
          <div v-if="!bankLoading" class="d-flex flex-row justify-center">
            <p class="bold-font mx-2">شماره کارت:</p>
            <p class="bold-font">{{ getBankNumber }}</p>
          </div>
          <div v-if="!bankLoading" class="d-flex flex-row justify-center">
            <p class="bold-font mx-2">نام صاحب حساب:</p>
            <p class="bold-font">{{ getBank.ownerName }}</p>
          </div>
        </div>
      </v-alert>
      <p class="bold-font">اعتبار مقادیر فوق حداکثر دو ساعت می باشد</p>
      <v-text-field
        v-model="trackingNumber"
        label="شماره پیگیری فیش پرداختی"
        class="bold-font"
        outlined
        type="number"
      ></v-text-field>
      <v-file-input
        v-model="file"
        accept="image/*"
        label="آپلود فیش پرداختی"
        show-size
        class="medium-font"
      ></v-file-input>
      <v-btn @click="submit" :disabled="disableSubmit" :loading="isLoading" block color="primary" class="bold-font mt-3"> ثبت </v-btn>
    </v-expansion-panel-content>
    <v-snackbar
      app
      top
      v-model="snackbar"
      :timeout="3000"
    >
      <span class="bold-font">
        {{ 'ورودی های خود را مجدد چک کنید' }}
      </span>
    </v-snackbar>
  </v-expansion-panel>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PaymentPanel",
  emits: ['click:submit'],
  props: {
    loading: {

    }
  },
  data() {
    return {
      snackbar: false,
      trackingNumber: '',
      file: null
    }
  },
  methods: {
    ...mapActions('bank', ['fetchBanks']),
    ...mapActions('price', ['fetchMultiplier']),
    ...mapActions('credit', ['fetchCredit']),
    submit() {
      if (this.file && this.trackingNumber) {
        this.$emit('click:submit', {
          trackingNumber: this.trackingNumber,
          file: this.file
        })
      } else {
        this.snackbar = true
      }
    }
  },
  computed: {
    ...mapGetters('bank', ['getBank', 'bankLoading']),
    ...mapGetters('price', ['getMultiplier']),
    ...mapGetters('credit', ['getCredit', 'hasCredit', 'getRequiredCredit', 'getRequiredTomanCredit']),
    ...mapGetters('cart', ['getCartItemsTotalPrice']),
    ...mapGetters('order', ['orderLoading']),
    ...mapGetters('deposit', ['depositLoading']),
    disableSubmit() {
      return !this.file || !this.trackingNumber || this.isLoading
    },
    isLoading() {
      return this.orderLoading || this.depositLoading
    },
    getBankNumber() {
      if (!this.getBank) {
        return ''
      }
      return (this.getBank.number.includes('-')) ? this.getBank.number : this.getBank.number.match(new RegExp('.{1,4}', 'g')).join("-")
    }
  },
  mounted() {
    this.fetchBanks()
    this.fetchMultiplier()
    this.fetchCredit()
  }
};
</script>

<style lang="scss" scoped>
</style>