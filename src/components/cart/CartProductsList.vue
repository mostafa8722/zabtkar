<template>
  <div>

    <div v-if="isRefreshingCart" class="d-flex flex-column align-center mt-3">
      <p class="bold-font" style="color: var(--primary-color)">در حال بروزرسانی</p>
      <v-progress-linear
        class="mx-auto"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </div>

    <div v-if="orderLoading" class="d-flex flex-row">
      <v-progress-linear
        class="mx-auto"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </div>

    <v-expansion-panels v-model="panel" class="px-3 mb-16 d-block d-sm-none" style="z-index: 1">
      <v-expansion-panel class="mt-3">
        <v-expansion-panel-header>
          <span class="bold-font">محصولات</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <CartProductItem v-for="(item, index) in getItems" :key="index" :item="item"/>
          <CartDetails @click:submit="onAcceptPolicies(1)" class="my-6 mx-3"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <SelectAddressPanel v-if="showAddressPanel" v-model="address" :loading="orderLoading" class="mt-3" @click:submit="onAddressSubmit(2)"/>
      <PaymentPanel v-if="showPaymentPanel" class="mt-3" @click:submit="onPaymentSubmit"/>
    </v-expansion-panels>

    <v-container
      class="d-none d-sm-block"
      fluid
      :class="$vuetify.breakpoint.lgAndUp ? 'trimmed-container' : ''"
    >
      <v-row>
        <v-col class="mb-sm-0 mt-2">
          <v-row dense>
            <v-col v-for="(item, index) in getItems" :key="index" cols="12">
              <CartProductItem :item="item" />
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="5" class="mt-2">
          <v-card class="pa-6">
            <CartDetails @click:submit="onAcceptPolicies(0)"/>
          </v-card>
          <v-expansion-panels v-model="panel">
            <SelectAddressPanel v-show="showAddressPanel" v-model="address" :loading="orderLoading" class="mt-3" @click:submit="onAddressSubmit(1)"/>
            <PaymentPanel v-show="showPaymentPanel" class="mt-3" @click:submit="onPaymentSubmit"/>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>


    <v-snackbar
      app
      top
      v-model="snackbar"
      :timeout="3000"
    >
      <span class="bold-font">
        {{ snackbarMessage }}
      </span>
    </v-snackbar>

    <v-snackbar
      v-model="refreshSnackbar"
      :timeout="10000"
      class="bold-font pa-3"
      dir="rtl"
      top
    >
      {{ 'موجودی یا قیمت برخی از آیتم های سبد خرید تغییر کرده است' }}

      <template v-slot:action="{ attrs }">
        <v-btn
          class="mx-3"
          color="primary"
          @click="onUpdateCartClick"
          v-bind="attrs"
        >
          بروزرسانی سبد خرید
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartDetails from "./CartDetails.vue";
import SelectAddressPanel from "./panels/SelectAddressPanel.vue";
import PaymentPanel from "./panels/PaymentPanel.vue";
import CartProductItem from "./CartProductItem";
import Price from "../base/Price";

export default {
  name: "CartProductsList",
  components: {
    CartDetails,
    SelectAddressPanel,
    PaymentPanel,
    CartProductItem,
    Price,
  },
  data() {
    return {
      refreshSnackbar: false,
      snackbar: false,
      snackbarMessage: '',
      panel: 0,
      address: null,
      showAddressPanel: false,
      showPaymentPanel: false,
      refreshResult: null,
    };
  },
  methods: {
    ...mapActions("price", ["fetchMultiplier"]),
    ...mapActions("address", ["fetchAddresses"]),
    ...mapActions("credit", ["fetchCredit"]),
    ...mapActions('order', ['createOrder']),
    ...mapActions('cart', ['clearCart', 'refreshCart', 'updateCart']),
    ...mapActions('deposit', ['submitDeposit']),
    async onAcceptPolicies(panel) {
      if (this.isLoggedIn) {
        const refreshResult = await this.refreshCartVariants()
        if (!refreshResult) {
          return;
        }
      }
      this.showAddressPanel = true; 
      this.panel = panel; 
      this.fetchMultiplier();
    },
    async onAddressSubmit(panel) {
      const refreshResult = await this.refreshCartVariants()
      if (!refreshResult) {
        return;
      }
      this.fetchMultiplier();
      if (!this.hasCredit) {
        this.fetchCredit();
        return;
      }
      if (this.hasEnoughCredit) {
        this.createOrder({
          addressId: this.address.id
        }).then(() => {
          this.$store.commit('profile/updateSelectedMenuItem', 7)
          this.clearCart()
        }).catch(() => {
          this.snackbar = true;
        })
      } else {
        this.panel = panel;
        this.showPaymentPanel = true;
      }
    },
    async onPaymentSubmit(paymentData) {
      const refreshResult = await this.refreshCartVariants()
      if (!refreshResult) {
        return;
      }
      this.fetchMultiplier();
      try {
        const payload = {
          amount: this.getRequiredTomanCredit,
          trackingNumber: paymentData.trackingNumber,
          billImage: paymentData.file
        }
        const result = await this.submitDeposit(payload)
        if (result) {
          this.createOrder({
            addressId: this.address.id
          }).then(() => {
            this.$store.commit('profile/updateSelectedMenuItem', 7)
            this.clearCart()
          }).catch(() => {
            this.snackbar = true;
          })
        }
      } catch (error) {
        this.snackbar = true;
      }
    },
    async refreshCartVariants() {
      const result = await this.refreshCart()
      if (!result) {
        this.showSnackbar('خطا در بروزرسانی سبد خرید!')
        return false;
      };
      this.refreshSnackbar = result.refresh
      this.refreshResult = result;
      return true
    },
    async onUpdateCartClick() {
      this.refreshSnackbar = false;
      this.updateCart(this.refreshResult)
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    }
  },
  computed: {
    ...mapGetters("auth", ['isLoggedIn']),
    ...mapGetters("cart", [
      "getItems",
      "getCartItemsCount",
      "getCartItemsTotalPrice",
      "isRefreshingCart"
    ]),
    ...mapGetters("address", ["getAddresses"]),
    ...mapGetters('order', ['orderLoading']),
    ...mapGetters('credit', ['hasCredit', 'hasEnoughCredit', 'getRequiredTomanCredit']),
  },
  mounted() {
    this.fetchCredit();
    this.fetchMultiplier();
    this.fetchAddresses();
    this.updateCart();
  },
};
</script>

<style scoped>
.information-card {
  position: sticky;
  top: 77px;
  z-index: 3;
}

.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 5px !important;
}
</style>