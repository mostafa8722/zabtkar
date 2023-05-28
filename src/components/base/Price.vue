<template>
  <v-btn
    elevation="0"
    @click.stop="showLirPrice = (noToggle) ? showLirPrice : !showLirPrice"
    :outlined="!showLirPrice && outlined"
    :color="color"
    :block="block"
    class="d-flex flex-row justify-space-between rounded-xl"
    style="width: auto"
  >
    
    <p class="bold-font my-auto text-body-1" :style="{color: (showLirPrice) ? 'black' : '#ff4401'}">
      {{ showLirPrice ? getLirPrice : getTomanPrice }}
    </p>
    <div class="my-auto d-flex flex-row">
      <v-divider
      vertical
      :color="showLirPrice ? 'black' : '#ff4401'"
      class="mx-3"
      ></v-divider>
      <p class="bold-font my-auto" :style="{color: (showLirPrice) ? 'black' : '#ff4401'}">{{ showLirPrice ? "لیر" : "تومان" }}</p>
    </div>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Price",
  props: {
    minWidth: {
      type: String,
      default: "auto",
    },
    maxWidth: {
      type: String,
      default: "auto",
    },
    outlined: {
      type: Boolean,
      default: true
    },
    block: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#F9D1B4'
    },
    noToggle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLirPrice: true
    }
  },
  computed: {
    ...mapGetters('price', ['getMultiplier']),
    getLirPrice() {
      return this.price.toFixed(2);
    },

    getTomanPrice() {
      if (this.price == 0) return this.price;
      if (this.getMultiplier) {
        return (this.price * this.getMultiplier).toLocaleString();
      }
      return this.getMultiplier;
    },
  }
};
</script>

<style lang="scss" scoped>
.fb-btn.v-btn--outlined {
  border: thin solid #ff4401;
}
</style>