<template>
  <div class="product__container h-100">
    <div v-if="productLoading" class="d-flex flex-row justify-center my-3">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-if="!productLoading" class="product__close d-block d-sm-none">
      <v-btn icon @click="back" outlined>
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </div>

    <div
      v-if="!productLoading"
      class="d-none d-sm-block"
      style="background-color: var(--accent-color); height: 100vh"
    >
      <div class="d-flex flew-row justify-end pa-6">
        <v-btn icon @click="back" outlined>
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-container class="product-container">
        <v-row>
          <v-col cols="7">
            <v-sheet elevation="2" class="pa-6 rounded-lg">
              <ProductImages gallery contain :images="getImages" />
            </v-sheet>
          </v-col>
          <v-col cols="5" class="flex-grow-1 flex-shrink-0">
            <v-sheet elevation="2" class="rounded-lg pa-6">
              <p
                class="text-h5 line-clamp"
                :dir="hasOriginalName ? 'rtl' : 'ltr'"
              >
                <span class="opensans-bold">{{ getTitle }}</span>
                <span class="thin-font mx-2" style="font-size: 1rem">{{
                  `(${getBrand})`
                }}</span>
              </p>

              <div class="d-flex flex-row justify-space-between mt-n3">
                <div class="d-flex flex-row">
                  <v-rating
                    v-model="getRating"
                    background-color="white"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    size="18"
                    readonly
                    class="my-auto"
                  ></v-rating>
                  <span class="text-caption mr-2 my-auto">
                    ({{ getRating }})
                  </span>
                </div>
                <div class="d-flex flex-row">
                  <v-btn icon @click="onShareClick">
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                  <v-btn icon @click="onBookmarkClick">
                    <v-icon :color="getBookmarkIconColor">mdi-heart</v-icon>
                  </v-btn>
                </div>
              </div>

              <v-select
                v-model="variant"
                :items="getVariants"
                item-text="attributeValue"
                label="سایز"
                :placeholder="getVariants.length == 0 ? 'تک سایز' : 'سایز را انتخاب کنید'"
                persistent-placeholder
                class="regular-font mt-3"
                outlined
                return-object
                @click="updateVariants"
                :disabled="getVariants.length == 0"
              >
              
       
                <template #item="{ item }">
                  <div  v-if="sizeLoading" class="d-flex flex-row justify-center my-3">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                  <div v-else>
             
            <p v-if="item.exists">{{ item.attributeValue }}</p>
            <div v-else class="d-flex flex-row" style="gap: 0.5rem">
              <span>{{ item.attributeValue }}</span>
              <span class="regular-font">(تمام شده است)</span>
            </div>
            </div>
                </template>
              </v-select>

              <div class="d-flex flex-row justify-space-between">
                <Price :price="getPrice" />
                <div>
                  <v-btn

                    v-if="getProductCountInCart == 0 && getVariants.length>0"
                    @click="onAddToCartClick"
                    color="primary"
                    class="my-auto regular-font"
                  >
                    افزودن به سبد خرید
                  </v-btn>
                     <v-btn

                    v-if=" getVariants.length==0"
                   
                    color="grey"
                    class="my-auto regular-font"
                  >
                    اتمام موجودی
                  </v-btn>

                  <v-chip
                    v-if="getProductCountInCart != 0"
                    outlined
                    class="my-auto py-4"
                  >
                    <div class="d-flex flex-row">
                      <v-btn icon @click="incrementHandler">
                        <v-icon class="my-auto" color="primary"
                          >mdi-plus</v-icon
                        >
                      </v-btn>
                      <span class="mx-1 my-auto">{{
                        getProductCountInCart
                      }}</span>
                      <v-btn icon @click="decrementHandler">
                        <v-icon class="my-auto" color="error">{{
                          getProductCountInCart == 1
                            ? "mdi-delete"
                            : "mdi-minus"
                        }}</v-icon>
                      </v-btn>
                    </div>
                  </v-chip>
                </div>
              </div>

              <!-- <v-select
                v-model="color"
                :items="getColors"
                item-text="title"
                label="رنگ"
                placeholder="رنگ را انتخاب کنید"
                persistent-placeholder
                reverse
                class="regular-font"
                outlined
                return-object
              ></v-select> -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div v-if="!productLoading" class="d-sm-none d-flex flex-column">
      <ProductImages aspect-ratio="1" contain :images="getImages" />

      <div class="mt-3 mx-3">
        <p class="text-h5 line-clamp" :dir="hasOriginalName ? 'rtl' : 'ltr'">
          <span class="opensans-bold">{{ getTitle }}</span>
          <span class="thin-font mx-2" style="font-size: 1rem">{{
            `(${getBrand})`
          }}</span>
        </p>

        <div class="d-flex flex-row justify-space-between mt-n3">
          <div class="d-flex flex-row">
            <v-rating
              v-model="getRating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="18"
              readonly
              class="my-auto"
            ></v-rating>
            <span class="text-caption mr-2 my-auto"> ({{ getRating }}) </span>
          </div>
          <div class="d-flex flex-row">
            <v-btn icon @click="onShareClick">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn icon @click="onBookmarkClick">
              <v-icon :color="getBookmarkIconColor">mdi-heart</v-icon>
            </v-btn>
          </div>
        </div>

        <Price class="mt-3" :price="getPrice" block />

        <v-select
          v-model="variant"
          :items="getVariants"
          item-text="attributeValue"
          label="سایز"
          :placeholder="getVariants.length == 0 ? 'تک سایز' : 'سایز را انتخاب کنید'"
          persistent-placeholder
          class="regular-font mt-3"
          outlined
          @click="updateVariants"
          return-object
          :disabled="getVariants.length == 0"
        >
        
          <template #item="{ item }">
            <div  v-if="sizeLoading" class="d-flex flex-row justify-center my-3">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
                  <div v-else>
             
            <p v-if="item.exists">{{ item.attributeValue }}</p>
            <div v-else class="d-flex flex-row" style="gap: 0.5rem">
              <span>{{ item.attributeValue }}</span>
              <span class="regular-font">(تمام شده است)</span>
            </div>
            </div>
           
          </template>
        </v-select>

        <!-- <v-select
          v-model="color"
          :items="getColors"
          item-text="title"
          label="رنگ"
          placeholder="رنگ را انتخاب کنید"
          persistent-placeholder
          reverse
          class="regular-font"
          outlined
          return-object
        ></v-select> -->
      </div>
    </div>

    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      class="bold-font pa-3"
      dir="rtl"
      top
    >
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-if="snackbarButton"
          class="mx-3"
          color="primary"
          @click="viewCart"
          v-bind="attrs"
        >
          برو به سبد
        </v-btn>
      </template>
    </v-snackbar>

    <v-card
      v-if="!productLoading"
      class="product__cart w-100 pa-3 d-block d-sm-none"
      elevation="4"
    >
      <div class="d-flex flex-row justify-center">
        <v-btn
          v-if="getProductCountInCart == 0  && getVariants.length>0"
          @click="onAddToCartClick"
          color="primary"
          class="my-auto regular-font"
        >
          افزودن به سبد خرید
        </v-btn>
                <v-btn

        v-if=" getProductCountInCart == 0 && getVariants.length==0"

        color="grey"
        class="my-auto regular-font"
        >
        اتمام موجودی
        </v-btn>
        <v-chip v-if="getProductCountInCart != 0" outlined class="my-auto py-4">
          <div class="d-flex flex-row">
            <v-btn icon @click="incrementHandler">
              <v-icon class="my-auto" color="primary">mdi-plus</v-icon>
            </v-btn>
            <span class="mx-1 my-auto">{{ getProductCountInCart }}</span>
            <v-btn icon @click="decrementHandler">
              <v-icon class="my-auto" color="error">{{
                getProductCountInCart == 1 ? "mdi-delete" : "mdi-minus"
              }}</v-icon>
            </v-btn>
          </div>
        </v-chip>
      </div>
    </v-card>
  </div>
</template>

<script>
import ProductImages from "../components/product/ProductImages";
import Price from "@/components/base/Price.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductView",
  components: {
    ProductImages,
    Price,
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      snackbarButton: false,
      snackbarTimeout: 2000,
      price: 1000,
      variant: null,
      color: null,
      colors: [
        { title: "مشکی" },
        { title: "قرمز" },
        { title: "سبز" },
        { title: "آبی" },
      ],
    };
  },
  methods: {
    ...mapActions("product", ["fetchProduct",'refreshVariants',"setSizeLoading"]),
    ...mapActions(["setBottomNavigationSelectedItem"]),
    ...mapActions("price", ["fetchMultiplier"]),
    ...mapActions("cart", [
      "addToCart",
      "incrementItemCount",
      "decrementItemCount",
      "removeItemFromCart",
    ]),
    ...mapActions("bookmark", ["addBookmark", "deleteBookmark"]),
    onAddToCartClick() {
      if (!this.variant) {
        this.snackbar = true;
        this.snackbarMessage = "سایز را انتخاب کنید";
        this.snackbarTimeout = 3000;
        this.snackbarButton = false;
        return;
      }

      // if (!this.color) {
      //   this.snackbar = true;
      //   this.snackbarMessage = 'رنگ را انتخاب کنید'
      //   this.snackbarTimeout = 3000;
      //   this.snackbarButton = false;
      //   return
      // }
      this.addToCart({
        product: this.getProduct,
        variant: this.variant,
      });
      this.snackbar = true;
      this.snackbarMessage = "محصول به سبد خرید اضافه شد";
      this.snackbarTimeout = 15000;
      this.snackbarButton = true;
    },
    back(){
      //
      this.$router.go(-1);
     // $router.replace({ name: 'Main' })
    },
    decrementHandler() {
      let count = this.getProductCountInCart;
      if (count > 1) {
        this.decrementItemCount({
          product: this.getProduct,
          variant: this.variant,
        });
      } else {
        this.removeItemFromCart({
          product: this.getProduct,
          variant: this.variant,
        });
      }
    },
    incrementHandler() {
      this.incrementItemCount({
        product: this.getProduct,
        variant: this.variant,
      });
    },

    viewCart() {
      let  query = {
          cart : "add"
        };
      this.$router.push({
        path: "/",
        query 
      });

    },
    updateVariants(){
   
     
      this.refreshVariants(this.$route.query.id)
    },

    onBookmarkClick() {
      if (this.isBookmarked(this.getProduct)) {
        this.deleteBookmark(this.getProduct);
      } else {
        this.addBookmark(this.getProduct);
      }
    },

    async onShareClick() {
      try {
        await navigator.share({
          title: this.getTitle,
          url: window.location.href,
        });
      } catch (error) {
        console.log("error sharing url", error);
      }
    },
  },
  computed: {
    ...mapGetters("product", ["getProduct", "productLoading","sizeLoading","updatedVariants"]),
    ...mapGetters("price", ["getMultiplier"]),
    ...mapGetters("cart", ["getCartItem"]),
    ...mapGetters("bookmark", ["isBookmarked"]),
    getImages() {
      return this.getProduct ? this.getProduct.images : [];
    },
    getLirPrice() {
      return `${this.getPrice} لیر`;
    },
    getTomanPrice() {
      return (this.getPrice * this.getMultiplier).toLocaleString() + " تومان ";
    },
    getTitle() {
      return this.getProduct
        ? this.getProduct.originalName
          ? this.getProduct.originalName
          : this.getProduct.name
        : "عنوان محصول";
    },
    getBrand() {
      return this.getProduct ? this.getProduct.brand.name : "برند محصول";
    },
    getRating() {
      return this.getProduct && this.getProduct.ratingAverage
        ? Math.round(this.getProduct.ratingAverage * 10) / 10
        : 4.3;
    },
    getVariant() {
      return this.variant
        ? this.variant
        : this.getVariants.length > 0
        ? this.getVariants[0]
        : null;
    },
    getVariants() {
      //const variants = this.updatedVariants.length? this.updatedVariants:this.getProduct ? this.getProduct.variants : [];
      const variants =  this.updatedVariants;
     
      console.log("Ttt",variants)
      return variants.map((variant) => {
        return {
          ...variant,
          disabled: !variant.exists,
        };
      });
    },
    getColors() {
      return this.colors;
    },
    getPrice() {
      return this.getVariant ? this.getVariant.sellingPrice : 0;
    },
    getProductCountInCart() {
      if (!this.variant) return 0;
    
      let item = this.getCartItem(this.getProduct.id, this.getVariant.id);
      return item ? item.count : 0;
    },
    hasOriginalName() {
      return this.getProduct ? !!this.getProduct.originalName : false;
    },
    getBookmarkIconColor() {
      return this.isBookmarked(this.getProduct) ? "red" : "grey";
    },
  },
  mounted() {
   
    this.fetchMultiplier();
    if (this.$route.query.id) {
      this.fetchProduct({
        id: this.$route.query.id,
      });
     this.refreshVariants(this.$route.query.id)
    }
    // if (this.getProduct && this.getProduct.variants.length > 0) {
    //   this.variant = this.getProduct.variants[0];
    // }
  },
 
};
</script>

<style lang="scss" scoped>
.product {
  &__container {
    background-color: white;

    @media (min-width: 600px) {
      background-color: var(--accent-color);
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
  }

  &__cart {
    position: fixed;
    bottom: 0;
  }

  &__price {
    cursor: pointer;
    &-discount {
      text-decoration: line-through;
      cursor: pointer;
    }
  }
}
</style>