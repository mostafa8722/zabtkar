<template>
 
  <v-card
  v-if="item.external"
    class="mx-auto py-2 pa-sm-5 my-3 my-sm-0"
    max-width="400"
    outlined
    :color="$vuetify.breakpoint.width > 600 ? 'white' : '#f0f0f0'"
  >

    <div class="d-flex flex-row justify-end px-2">
      <p class="line-clamp" dir="ltr" style="line-height: 20px;">
        <span class="cart-product-item__title opensans-regular">کالا با لینک خارجی </span>
        <span class="cart-product-item__brand bold-font mx-2">{{  `(${item.color})`}}</span>
      </p>
      <v-list-item-avatar
        class="rounded-lg"
        color="grey"
        :width="$vuetify.breakpoint.xsOnly ? 40 : 80"
        :height="$vuetify.breakpoint.xsOnly ? 60 : 100"
        tile
      >
        <v-img contain src="/img/paloot-logo.5169ef60.png" ></v-img>
      </v-list-item-avatar>
    </div>
    

    <div class="d-flex flex-row flex-nowrap align-center justify-space-around mt-sm-3">
      <CartProductSizePicker  :item="item" :variant="item.variant" @update:variant="onVariantUpdate"/>

      <Price :price="parseInt(item.price)"/>
      <v-chip outlined>
        <div class="d-flex flex-row">
          <v-btn icon @click="rightButtonHandler()">
            <v-icon class="my-auto" color="primary">mdi-plus</v-icon>
          </v-btn>
          <span class="mx-1 my-auto">{{ getCount }}</span>
          <v-btn icon @click="leftButtonHandler()">
            <v-icon class="my-auto" color="error">{{
              getCount == 1 ? "mdi-delete" : "mdi-minus"}}
            </v-icon>
          </v-btn>
        </div>
      </v-chip>
    </div>
  </v-card>

  <v-card
  v-else
    class="mx-auto py-2 pa-sm-5 my-3 my-sm-0"
    max-width="400"
    outlined
    :color="$vuetify.breakpoint.width > 600 ? 'white' : '#f0f0f0'"
  >

    <div class="d-flex flex-row justify-end px-2">
      <p class="line-clamp" dir="ltr" style="line-height: 20px;">
        <span class="cart-product-item__title opensans-regular">{{ getProductTitle }}</span>
        <span class="cart-product-item__brand bold-font mx-2">{{ `(${getBrandName})` }}</span>
      </p>
      <v-list-item-avatar
        class="rounded-lg"
        color="grey"
        :width="$vuetify.breakpoint.xsOnly ? 40 : 80"
        :height="$vuetify.breakpoint.xsOnly ? 60 : 100"
        tile
      >
        <v-img contain :src="getImage" :lazy-src="getThumbnailImage"></v-img>
      </v-list-item-avatar>
    </div>
    

    <div class="d-flex flex-row flex-nowrap align-center justify-space-around mt-sm-3">
      <CartProductSizePicker :item="item" :variants="item.product.variants" :variant="item.variant" @update:variant="onVariantUpdate"/>
      <Price :price="getLirPrice"/>
      <v-chip outlined>
        <div class="d-flex flex-row">
          <v-btn icon @click="rightButtonHandler()">
            <v-icon class="my-auto" color="primary">mdi-plus</v-icon>
          </v-btn>
          <span class="mx-1 my-auto">{{ getCount }}</span>
          <v-btn icon @click="leftButtonHandler()">
            <v-icon class="my-auto" color="error">{{
              getCount == 1 ? "mdi-delete" : "mdi-minus"}}
            </v-icon>
          </v-btn>
        </div>
      </v-chip>
    </div>
  </v-card>
</template>

<script>
import CartProductSizePicker from "./CartProductSizePicker";
import CartProductColorPicker from "./CartProductColorPicker";
import Price from '../base/Price'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CartProductItem",
  components: {
    CartProductSizePicker,
    CartProductColorPicker,
    Price
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showLirPrice: true,
      count: 1,
    };
  },
  methods: {
    ...mapActions('cart', ['updateVariant', 'incrementItemCount', 'decrementItemCount', 'removeItemFromCart']),
    leftButtonHandler() {
      if (this.getCount > 1) {
        this.decrementItemCount({
          product: this.item.product,
          variant: this.item.variant
        })
      } else {
        this.removeItemFromCart({
          product: this.item.product,
          variant: this.item.variant
        })
      }
    },
    rightButtonHandler() {
     

      this.incrementItemCount({
        item:this.item,
        product: this.item.external?null:this.item.product,
        variant: this.item.variant
      })
    },
    onVariantUpdate(variant) {
      this.updateVariant({
        product: this.item.product,
        oldVariant: this.item.variant,
        newVariant: variant
      })
    }
  },
  computed: {
    ...mapGetters('price', ['getMultiplier']),
    getImage() {
      if (this.item && this.item.product.images.length) {
        return `http://zabtkar.tooska-co.ir/${this.item.product.images[0].image}`
      }
    },

    getThumbnailImage() {
      if (this.item && this.item.product.images.length) {
        return `http://zabtkar.tooska-co.ir/${this.item.product.images[0].thumbnail}`
      }
    },

    getProductTitle() {
      return (this.item) ? this.item.product.name : ''
    },

    getBrandName() {
      return (this.item) ? this.item.product.brand.name : ''
    },

    getCount() {
      return (this.item) ? this.item.count : 0
    },

    getLirPrice() {
      return (this.item) ? this.item.variant.sellingPrice : 0
    },

    getTomanPrice() {
      if (this.getMultiplier) {
        return (
          (
            this.getLirPrice * this.getMultiplier
          ).toLocaleString()
        );
      }
      return this.getMultiplier;
    },

    getAvatarWidth() {

    },

    getAvatarHeight() {

    }
  }
};
</script>

<style lang="scss" scoped>
.price {
  font-size: 1.1rem;
}

.cart-product-item {
  &__title {
    font-size: 15px;
  }

  &__brand {
    font-size: 15px;
  }
}
</style>